import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import ReactMapGL, {
  FlyToInterpolator,
  Marker,
  Popup,
  NavigationControl,
} from "react-map-gl";
import marker from "../assets/marker.png";
import NewLocationForm from "./NewLocationForm";
import "mapbox-gl/dist/mapbox-gl.css";
import { Container } from "semantic-ui-react";

function Map({ locations, setLocations }) {
  let [user, setUser] = useContext(UserContext);

  const [viewport, setViewport] = useState({
    latitude: 50.5821,
    longitude: 7.0216,
    width: "80vw",
    height: "80vh",
    zoom: 3,
  });
  const [selectedPin, setSelectedPin] = useState(null);

  let handleCenter = (location) => {
    setSelectedPin(location);

    let viewport = {
      width: "80%",
      height: "80vh",
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 6,
      transitionDuration: "auto",
    };

    setViewport(viewport);
  };

  function onSubmitNewLocation(newLocation) {
    setLocations([...locations, newLocation]);
  }

  return (
    <Container>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h3>Explore locations on the map</h3>
      </div>
      {user ? (
        <NewLocationForm onSubmitNewLocation={onSubmitNewLocation} />
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          <p>Want to add a new location?</p>
          <a href="/login">Log in</a>
        </div>
      )}

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/chrispavla/cl9fv02ny000h14o0576ux3mj"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        transitionInterpolator={new FlyToInterpolator({ speed: 5 })}
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
            <NavigationControl position="bottom-right" />
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
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
}

export default Map;
