import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/Navbar";
import { UserProvider } from "./Context/UserProvider";
import Map from "./components/Map";
import LocationDetails from "./components/LocationDetails";
import MyProfile from "./components/MyProfile.js";
import Home from "./components/Home";
import UsersProfile from "./components/UsersProfile.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#6877f3",
      },
      secondary: {
        main: "#98eb6b",
      },
      background: {
        default: "#fff",
        paper: "#fff",
      },
      text: {
        secondary: "rgba(0,0,0,0)",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/map">
            <Map locations={locations} setLocations={setLocations} />
          </Route>
          <Route path="/profile">
            <MyProfile />
          </Route>
          <Route path="/locations/:id">
            <LocationDetails />
          </Route>
          <Route path="/users/:id">
            <UsersProfile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
