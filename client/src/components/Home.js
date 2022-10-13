import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LocationDetails from "./LocationDetails";

function Home({ locations }) {
  const locationsToShow = locations.map((location) => (
    <Link to={`/locations/${location.id}`}>
      <h1>
        {location.city}, {location.country}
      </h1>
    </Link>
  ));

  return (
    <div>
      <h1>Welcome to Travel-On</h1>
      <p>Map a place you visited</p>
      {locationsToShow}
    </div>
  );
}

export default Home;
