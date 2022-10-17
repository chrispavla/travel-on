import { UserContext } from "../Context/UserProvider";
import { useEffect, useState, useContext } from "react";
import EditPointOfInterestForm from "./EditPointOfInterestForm";

function PointOfInterestCard({ places, setPlaces, deletePointOfInterest }) {
  let [user, setUser] = useContext(UserContext);
  const [isShown, setIsShown] = useState(false);

  function handleDeletePointOfInterest(deletedPoint) {
    fetch(`/point_of_interests/${deletedPoint.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(deletePointOfInterest(deletedPoint));
  }

  function handleEditPointOfInterest() {
    setIsShown((isShown) => !isShown);
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

  const pointdisplay = places.map((point) => (
    <div style={{ border: "solid" }}>
      <img
        style={{ borderRadius: "50%", width: "4rem" }}
        src={point.user.profile_image}
      ></img>
      {point.user.username ? <h4>{point.user.username}</h4> : null}
      <img src={point.image}></img>
      <h1>{point.name}</h1>
      <p>{point.note}</p>
      {point.user.username === user.username ? (
        <div>
          <button onClick={handleEditPointOfInterest}>Edit a place</button>
          <button onClick={() => handleDeletePointOfInterest(point)}>
            Delete a place
          </button>
          {isShown ? (
            <EditPointOfInterestForm
              point={point}
              editPlace={editPlace}
              setIsShown={setIsShown}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  ));

  return <div>{pointdisplay}</div>;
}

export default PointOfInterestCard;
