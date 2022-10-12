import { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/Navbar";
import { UserProvider } from "./Context/UserProvider";

function App() {
  return (
    <div>
      <UserProvider>
        <NavBar />
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
