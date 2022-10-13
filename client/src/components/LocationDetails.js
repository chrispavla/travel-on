import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PointOfInterestCard from "./PointOfInterestCard";

function LocationDetails() {
  let { id } = useParams();
  const [displayedLocation, setDisplayedLocation] = useState("");

  useEffect(() => {
    fetch(`/locations/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((oneLocation) => {
          setDisplayedLocation(oneLocation);
        });
      }
    });
  }, [id]);

  return (
    <div>
      <p>Share another cool place</p>
      <button>Share</button>
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
    </div>
  );
}

export default LocationDetails;
