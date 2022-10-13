import { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/Navbar";
import { UserProvider } from "./Context/UserProvider";
import Home from "./components/Home";
import LocationDetails from "./components/LocationDetails";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div>
      <UserProvider>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home locations={locations} />
          </Route>
          <Route path="/locations/:id">
            <LocationDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
