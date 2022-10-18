import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NewPointInterestForm from "./NewPointInterestForm";
import PointOfInterestCard from "./PointOfInterestCard";
import { UserContext } from "../Context/UserProvider";

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

  function handleShowForm() {
    setShowNewPointInterestForm(
      (showNewPointInterestForm) => !showNewPointInterestForm
    );
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
    <div>
      <p>Been here and have another cool place to share?</p>
      <button onClick={handleShowForm}>Share</button>
      {showNewPointInterestForm ? (
        <NewPointInterestForm
          addNewPlace={addNewPlace}
          places={places}
          setPlaces={setPlaces}
          displayedLocation={displayedLocation}
          setShowNewPointInterestForm={setShowNewPointInterestForm}
        />
      ) : null}
      <div>
        <h4>Filter by:</h4>
        <button onClick={() => setFilter("Hotel")} value={"Hotel"}>
          Hotel and Lodging
        </button>
        <button onClick={() => setFilter("Food")} value={"Food"}>
          Food
        </button>
        <button
          onClick={() => setFilter("Cultural attraction")}
          value={"Cultural attraction"}
        >
          Cultural Attraction
        </button>
        <button onClick={() => setFilter("All")} value={"All"}>
          Show all places
        </button>
      </div>
      {displayedLocation !== "" ? (
        <h1>
          {displayedLocation.city}, {displayedLocation.country}
        </h1>
      ) : null}
      {displayedLocation !== "" ? (
        filteredPlaces.map((place) => (
          <PointOfInterestCard
            place={place}
            editPlace={editPlace}
            deletePointOfInterest={deletePointOfInterest}
          />
        ))
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default LocationDetails;
