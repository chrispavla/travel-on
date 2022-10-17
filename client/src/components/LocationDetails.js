import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NewPointInterestForm from "./NewPointInterestForm";
import PointOfInterestCard from "./PointOfInterestCard";
import { UserContext } from "../Context/UserProvider";

function LocationDetails() {
  let [user, setUser] = useContext(UserContext);
  let { id } = useParams();
  const [displayedLocation, setDisplayedLocation] = useState("");
  const [showNewPointInterestForm, setShowNewPointInterestForm] =
    useState(false);
  const [places, setPlaces] = useState("");

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

  // function filterHotel() {
  //   let showHotels = places.filter((place) => place.category === "Hotel");
  // }

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
        <button onClick={filterHotel}>Hotel and Lodging</button>
        <button>Food</button>
        <button>Cultural Attraction</button>
      </div>
      {displayedLocation !== "" ? (
        <h1>
          {displayedLocation.city}, {displayedLocation.country}
        </h1>
      ) : null}
      {displayedLocation !== "" ? (
        <PointOfInterestCard
          places={places}
          setPlaces={setPlaces}
          deletePointOfInterest={deletePointOfInterest}
        />
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default LocationDetails;
