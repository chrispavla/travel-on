import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";

function NewLocationForm({ onSubmitNewLocation }) {
  let [user, setUser] = useContext(UserContext);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState();

  function handleNewLocationSubmit(e) {
    e.preventDefault();

    let newLocation = {
      city: city,
      country: country,
      latitude: latitude,
      longitude: longitude,
    };

    fetch("/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          onSubmitNewLocation(data);
        });
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });

    setCity("");
    setCountry("");
    setLatitude("");
    setLongitude("");
  }

  return (
    <div>
      <form onSubmit={handleNewLocationSubmit}>
        <label>City</label>
        <input
          type="text"
          placeholder="Rome"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <label>Country</label>
        <input
          type="text"
          placeholder="Italy"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></input>
        <label>Latitude</label>
        <input
          type="text"
          placeholder="41.9028"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        ></input>
        <label>Longitude</label>
        <input
          type="text"
          placeholder="12.4964"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        ></input>
        <button type="submit">Add new location</button>
        {error ? <div>{error}</div> : null}
      </form>
    </div>
  );
}

export default NewLocationForm;
