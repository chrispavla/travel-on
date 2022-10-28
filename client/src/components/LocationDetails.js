import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NewPointInterestForm from "./NewPointInterestForm";
import PointOfInterestCard from "./PointOfInterestCard";
import { UserContext } from "../Context/UserProvider";
import {
  Grid,
  Card,
  Container,
  Icon,
  Header,
  Modal,
  Dimmer,
  Loader,
  Segment,
  Image,
} from "semantic-ui-react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function LocationDetails() {
  let history = useHistory();
  let [user, setUser] = useContext(UserContext);
  let { id } = useParams();
  const [displayedLocation, setDisplayedLocation] = useState("");
  const [showNewPointInterestForm, setShowNewPointInterestForm] =
    useState(false);
  const [places, setPlaces] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`/locations/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((oneLocation) => {
          setDisplayedLocation(oneLocation);
          setPlaces(oneLocation.point_of_interests);
        });
      }
    });
  }, [id]);

  function deletePointOfInterest(deletedPoint) {
    setPlaces(places.filter((place) => place.id !== deletedPoint.id));
  }

  function addNewPlace(data) {
    setPlaces([...places, data]);
  }

  function editPlace(editedPlace) {
    let newPlaces = places.map((place) => {
      if (place.id === editedPlace.id) {
        return editedPlace;
      } else {
        return place;
      }
    });
    setPlaces(newPlaces);
  }

  let filteredPlaces;

  if (places !== "") {
    filteredPlaces = places.filter((place) => {
      if (filter === "Hotel") {
        return place.category === "Hotel";
      } else if (filter === "Food") {
        return place.category === "Food";
      } else if (filter === "Cultural attraction") {
        return place.category === "Cultural attraction";
      } else {
        return true;
      }
    });
  }

  return (
    <Container>
      <Container textAlign="center">
        {displayedLocation !== "" ? (
          <h1 style={{ marginTop: "20px" }}>
            <Icon color="red" name="map pin" /> {displayedLocation.city},{" "}
            {displayedLocation.country}
          </h1>
        ) : null}
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          direction="row"
          justifyContent="center"
          marginTop="30px"
        >
          <Button
            onClick={() => setFilter("Hotel")}
            value={"Hotel"}
            variant="contained"
          >
            Hotel and Lodging
          </Button>
          <Button
            onClick={() => setFilter("Food")}
            value={"Food"}
            variant="contained"
          >
            Food
          </Button>
          <Button
            onClick={() => setFilter("Cultural attraction")}
            value={"Cultural attraction"}
            variant="contained"
          >
            Cultural Attraction
          </Button>
          <Button
            onClick={() => setFilter("All")}
            value={"All"}
            variant="contained"
          >
            Show all
          </Button>
        </Stack>
        {user ? (
          <NewPointInterestForm
            addNewPlace={addNewPlace}
            places={places}
            setPlaces={setPlaces}
            displayedLocation={displayedLocation}
            setShowNewPointInterestForm={setShowNewPointInterestForm}
          />
        ) : (
          <p style={{ marginTop: "30px", marginBottom: "20px" }}>
            {" "}
            <a href="/login">Log in </a> to share a place
          </p>
        )}
      </Container>
      <Grid columns={4} padded>
        {displayedLocation !== "" ? (
          filteredPlaces.map((place) => (
            <PointOfInterestCard
              place={place}
              places={places}
              setPlaces={setPlaces}
              editPlace={editPlace}
              deletePointOfInterest={deletePointOfInterest}
            />
          ))
        ) : (
          <Loader active inline="centered" />
        )}
      </Grid>
    </Container>
  );
}

export default LocationDetails;
