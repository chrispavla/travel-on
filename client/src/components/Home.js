import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LocationDetails from "./LocationDetails";
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from "react-map-gl";
import marker from "./marker.png";

function Home({ locations }) {
  const [viewport, setViewport] = useState({
    latitude: 41.9028,
    longitude: 12.4964,
    width: "80vw",
    height: "80vh",
    zoom: 2,
  });
  const [selectedPin, setSelectedPin] = useState(null);

  let handleCenter = (location) => {
    setSelectedPin(location);

    let viewport = {
      width: "80%",
      height: "80vh",
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 8,
      transitionDuration: "auto",
    };

    setViewport(viewport);
  };

  // const locationsToShow = locations.map((location) => (
  //   <Link key={location.id} to={`/locations/${location.id}`}>
  //     <h1>
  //       {location.city}, {location.country}
  //     </h1>
  //   </Link>
  // ));

  return (
    <div>
      <h1>Welcome to Travel-On</h1>
      <p>Map a place you visited</p>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/chrispavla/cl9fv02ny000h14o0576ux3mj"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        transitionInterpolator={new FlyToInterpolator({ speed: 1.2 })}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                handleCenter(location);
              }}
            >
              <img src={marker} alt="place marker" />
            </button>
          </Marker>
        ))}
        {selectedPin ? (
          <Popup
            latitude={selectedPin.latitude}
            longitude={selectedPin.longitude}
            onClose={() => {
              setSelectedPin(null);
            }}
          >
            <div>
              <Link key={selectedPin.id} to={`/locations/${selectedPin.id}`}>
                <h4>
                  {selectedPin.city}, {selectedPin.country}
                </h4>
              </Link>
              <p>
                Added by:{" "}
                <img
                  style={{ borderRadius: "50%", width: "2rem" }}
                  src={selectedPin.uniq_user.profile_image}
                />{" "}
                {selectedPin.uniq_user.username}
              </p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      {/* {locationsToShow} */}
    </div>
  );
}

export default Home;
