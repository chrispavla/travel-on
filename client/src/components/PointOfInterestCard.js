import { UserContext } from "../Context/UserProvider";
import { useEffect, useState, useContext } from "react";

function PointOfInterestCard({ places, deletePointOfInterest }) {
  let [user, setUser] = useContext(UserContext);

  function handleDeletePointOfInterest(deletedPoint) {
    fetch(`/point_of_interests/${deletedPoint.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(deletePointOfInterest(deletedPoint));
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
        <button onClick={() => handleDeletePointOfInterest(point)}>
          Delete a place
        </button>
      ) : null}
    </div>
  ));

  return <div>{pointdisplay}</div>;
}

export default PointOfInterestCard;
