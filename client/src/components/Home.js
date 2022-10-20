import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import LocationDetails from "./LocationDetails";
import ReactMapGL, {
  FlyToInterpolator,
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
  useControl,
} from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import marker from "./marker.png";
import NewLocationForm from "./NewLocationForm";

function Home({ locations, setLocations }) {
  let [user, setUser] = useContext(UserContext);

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

  function onSubmitNewLocation(newLocation) {
    setLocations([...locations, newLocation]);
  }

  // function geocoder() {
  //   const ctrl = new MapboxGeocoder({
  //     accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  //     marker: false,
  //     collapsed: false,
  //   });
  // useControl(() => ctrl);
  // ctrl.on("result", (e) => {
  //   const coords = e.result.geometry.coordinates;
  // });
  // }

  // map.addControl(
  //   new MapboxGeocoder({
  //     accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  //     mapboxgl: mapboxgl,
  //   })
  // );

  return (
    <div>
      <h1>Welcome to Travel-On</h1>
      <p>Map a place you visited</p>
      <NewLocationForm onSubmitNewLocation={onSubmitNewLocation} />
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
        <div className="sidebarStyle">
          Latitude: {viewport.latitude.toFixed(4)} | Longitude:{" "}
          {viewport.longitude.toFixed(4)} | Zoom: {viewport.zoom.toFixed(0)}
        </div>
        <div>
          <div style={{ padding: "5px" }}>
            <GeolocateControl positionOptions={{ enableHighAccuracy: true }} />
          </div>
          <div style={{ padding: "5px" }}>
            <NavigationControl />
          </div>
        </div>
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
              {selectedPin.uniq_user ? (
                <p>
                  Added by:{" "}
                  <img
                    style={{ borderRadius: "50%", width: "2rem" }}
                    src={selectedPin.uniq_user.profile_image}
                  />{" "}
                  {selectedPin.uniq_user.username}
                </p>
              ) : (
                <p>
                  Added by:{" "}
                  <img
                    style={{ borderRadius: "50%", width: "2rem" }}
                    src={user.profile_image}
                  />{" "}
                  {user.username}
                </p>
              )}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Home;
