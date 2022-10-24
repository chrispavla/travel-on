import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";

function Login() {
  let [user, setUser] = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: username,
      password: password,
    };

    setIsLoading(true);

    fetch("/login", {
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
        r.json().then((error) => setError(error.error));
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
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
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
            <input type="checkbox" onClick={handleShowPassword} />
            <label>Show Password</label>
          </div>
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>
      {error ? error.map((err) => <div>{err}</div>) : null}
      <div>
        <p>Don't have an account?</p>
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}

export default Login;
