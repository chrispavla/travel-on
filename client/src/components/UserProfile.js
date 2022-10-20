import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserProvider";
import { useHistory } from "react-router-dom";

function UserProfile() {
  let [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [profileImage, setProfileImage] = useState(user.profile_image);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState();
  let history = useHistory();

  function handleUserDelete(user) {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`/users/${user.id}`, {
        method: "DELETE",
      }).then(() => {
        setUser(null);
        history.push("/");
      });
    }
  }

  function handleSubmitUpdateProfile(e) {
    e.preventDefault();

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        profile_image: profileImage,
        username: username,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        handleUserEdit();
      } else {
        r.json().then((data) => setError(Object.values(data).join()));
      }
    });
  }

  function handleUserEdit() {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <img
        src={user.profile_image}
        style={{ borderRadius: "50%", width: "3rem" }}
      />
      <div>
        <button onClick={() => handleUserEdit()}>Edit Profile</button>
        <button onClick={() => handleUserDelete(user)}>Delete Account</button>
      </div>
      {isEditing ? (
        <div>
          <button onClick={() => handleUserEdit()}>Cancel</button>
          <form onSubmit={handleSubmitUpdateProfile}>
            <div>
              <label>First name</label>
              <input
                type="text"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Last name</label>
              <input
                type="text"
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
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
              <label>Profile Image</label>
              <input
                type="text"
                name="profileimage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              ></input>
            </div>
            <button type="submit">Update</button>
          </form>
          {error ? <div>{error}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export default UserProfile;
