import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import React, { useState, useContext } from "react";

function NavBar() {
  let history = useHistory();
  let [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    });
    setUser(null);
    history.push("/");
  };

  return (
    <nav>
      {!user ? (
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/login">
            Log in
          </NavLink>
          <NavLink exact to="/signup">
            Sign up
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/profile">
            My profile
          </NavLink>
          <NavLink onClick={handleLogout} exact to="/">
            Logout
          </NavLink>
        </div>
      )}
      {user ? (
        <div>
          <p>Signed in as: </p>
          <img
            src={user.profile_image}
            style={{ borderRadius: "50%", width: "3rem" }}
          ></img>
          <p>{user.username}</p>
        </div>
      ) : null}
    </nav>
  );
}

export default NavBar;
