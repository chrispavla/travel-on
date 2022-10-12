import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";

function Signup() {
  let [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    let user = {
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      username: username,
      password: password,
    };

    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        history.push("/");
      } else {
        r.json().then((data) => setError(Object.values(data).join()));
      }
    });
  }

  function handleShowPassword() {
    let x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>
              First name
              <input
                type="text"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </label>
          </div>
          <label>
            Last name
            <input
              type="text"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>
          <div>
            <label>
              Profile Image
              <input
                type="text"
                name="profileimage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
          </div>
        </div>
        <div>
          <label>
            Password
            <input
              id="myInput"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <div>
            <div>
              <input type="checkbox" onClick={handleShowPassword} />
              <label>Show Password</label>
            </div>
          </div>
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      </form>
      {error ? <div>{error}</div> : null}
      <div>
        <p>Already registered?</p>
        <a href="/login">Log in</a>
      </div>
    </div>
  );
}

export default Signup;
