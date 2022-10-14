import { UserContext } from "../Context/UserProvider";
import { useEffect, useState, useContext } from "react";

function PointOfInterestCard({ displayedLocation }) {
  let [user, setUser] = useContext(UserContext);

  function handleDeletePointOfInterest() {
    console.log("hey");
  }

  const pointdisplay = displayedLocation.point_of_interests.map((point) => (
    <div style={{ border: "solid" }}>
      <img
        style={{ borderRadius: "50%", width: "4rem" }}
        src={point.user.profile_image}
      ></img>
      <h4>{point.user.username}</h4>
      <img src={point.image}></img>
      <h1>{point.name}</h1>
      <p>{point.note}</p>
      {point.user.username === user.username ? (
        <button onClick={handleDeletePointOfInterest}>Delete a place</button>
      ) : null}
    </div>
  ));

  return <div>{pointdisplay}</div>;
}

export default PointOfInterestCard;
