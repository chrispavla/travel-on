import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NewPointInterestForm from "./NewPointInterestForm";
import PointOfInterestCard from "./PointOfInterestCard";
import { UserContext } from "../Context/UserProvider";

function LocationDetails() {
  let [user, setUser] = useContext(UserContext);
  let { id } = useParams();
  const [newPlace, setNewPlace] = useState("");
  const [displayedLocation, setDisplayedLocation] = useState("");
  const [showNewPointInterestForm, setShowNewPointInterestForm] =
    useState(false);

  useEffect(() => {
    fetch(`/locations/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((oneLocation) => {
          setDisplayedLocation(oneLocation);
        });
      }
    });
  }, [id]);

  function handleShowForm() {
    setShowNewPointInterestForm(
      (showNewPointInterestForm) => !showNewPointInterestForm
    );
  }

  return (
    <div>
      <p>Been here and have another cool place to share?</p>
      <button onClick={handleShowForm}>Share</button>
      {showNewPointInterestForm ? (
        <NewPointInterestForm
          displayedLocation={displayedLocation}
          setNewPlace={setNewPlace}
          setShowNewPointInterestForm={setShowNewPointInterestForm}
        />
      ) : null}
      {displayedLocation !== "" ? (
        <h1>
          {displayedLocation.city}, {displayedLocation.country}
        </h1>
      ) : null}
      {displayedLocation !== "" ? (
        <PointOfInterestCard displayedLocation={displayedLocation} />
      ) : (
        <p>Loading..</p>
      )}
      {newPlace !== "" ? (
        <div>
          <img src={user.profile_image}></img>
          <h4>{user.username}</h4>
          <img src={newPlace.image}></img>
          <h1>{newPlace.name}</h1>
          <p>{newPlace.note}</p>
        </div>
      ) : null}
    </div>
  );
}

export default LocationDetails;
