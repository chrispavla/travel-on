import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import React, { useContext } from "react";
import logoname from "../assets/logoname.png";
import { Menu, Image } from "semantic-ui-react";

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
    <div>
      <Menu pointing secondary>
        <Menu.Item>
          <Image size="small" alt="logo" src={logoname} />
        </Menu.Item>
        <Menu.Item style={{ marginBottom: "0.35em" }} as={NavLink} exact to="/">
          Home
        </Menu.Item>
        <Menu.Item style={{ marginBottom: "0.35em" }} as={NavLink} to="/map">
          Map
        </Menu.Item>
        {user ? (
          <>
            <Menu.Item
              style={{ marginBottom: "0.35em" }}
              as={NavLink}
              to="/profile"
            >
              My Profile
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to={"/profile"}>
                Logged in as {user.username}
                <Image
                  style={{ marginLeft: "10px" }}
                  avatar
                  src={user.profile_image}
                />
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to="/login"
                onClick={handleLogout}
                style={{ marginBottom: "0.35em" }}
              >
                Log Out
              </Menu.Item>
            </Menu.Menu>
          </>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/login">
              Log In
            </Menu.Item>
            <Menu.Item as={NavLink} to="/signup">
              Sign up
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </div>
  );
}

export default NavBar;
