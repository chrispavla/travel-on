import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import logoname from "../assets/logoname.png";
import Typography from "@mui/material/Typography";

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink exact to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              sx={{ height: 44 }}
              style={{ marginRight: "20px" }}
              alt="Logo"
              src={logoname}
            />
          </NavLink>
          {!user ? (
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
              <NavLink exact to="/" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Home
                </Button>
              </NavLink>
              <NavLink to="/map" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Map
                </Button>
              </NavLink>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button
                  component="NavLink"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Sign up
                </Button>
              </NavLink>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
              <NavLink exact to="/" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Home
                </Button>
              </NavLink>
              <NavLink to="/map" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Map
                </Button>
              </NavLink>
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  My profile
                </Button>
              </NavLink>
              <NavLink
                onClick={handleLogout}
                exact
                to="/"
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Log out
                </Button>
              </NavLink>
            </Box>
          )}
          {user ? (
            <Box component="span" display="flex" m={1}>
              <p style={{ marginRight: "15px" }}>
                Signed in as: {user.username}
              </p>
              <Avatar alt="user image" src={user.profile_image} />
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
    // {/* {!user ? (
    //   <div>
    //     <NavLink exact to="/">
    //       Home
    //     </NavLink>
    //     <NavLink exact to="/map">
    //       Map
    //     </NavLink>
    //     <NavLink exact to="/login">
    //       Log in
    //     </NavLink>
    //     <NavLink exact to="/signup">
    //       Sign up
    //     </NavLink>
    //   </div>
    // ) : (
    //   <div>
    //     <NavLink exact to="/">
    //       Home
    //     </NavLink>
    //     <NavLink exact to="/map">
    //       Map
    //     </NavLink>
    //     <NavLink exact to="/profile">
    //       My profile
    //     </NavLink>
    //     <NavLink onClick={handleLogout} exact to="/">
    //       Logout
    //     </NavLink>
    //   </div>
    // )} */}
    // {/* {user ? (
    //   <div>
    //     <p>Signed in as: </p>
    //     <img
    //       src={user.profile_image}
    //       style={{ borderRadius: "50%", width: "3rem" }}
    //     ></img>
    //     <p>{user.username}</p>
    //   </div>
    // ) : null} */}
  );
}

export default NavBar;
