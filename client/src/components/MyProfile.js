import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { Link, useHistory } from "react-router-dom";

function MyProfile() {
  let [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
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
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setProfileImage(user.profile_image);
    setUsername(user.username);
  }

  return (
    <div>
      {user ? (
        <div>
          <img
            src={user.profile_image}
            style={{ borderRadius: "50%", width: "3rem" }}
          />
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <h4>{user.username}</h4>
          <div>
            <button onClick={() => handleUserEdit()}>Edit Profile</button>
            <button onClick={() => handleUserDelete(user)}>
              Delete Account
            </button>
          </div>
          {isEditing && user ? (
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
              {error ? error.map((err) => <div>{err}</div>) : null}
            </div>
          ) : null}
          <div>
            <p>Places you visited:</p>
            {user.locations.map((location) => (
              <div>
                <Link key={location.id} to={`/locations/${location.id}`}>
                  <p>
                    {location.city}, {location.country}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div>
            <p>Your activity:</p>
            {user.comments.map((comment) => (
              <div>
                {comment.created_at === comment.updated_at ? (
                  <p>left at: {comment.created_at}</p>
                ) : (
                  <p>updated at: {comment.updated_at}</p>
                )}
                <img
                  style={{ borderRadius: "50%", width: "3rem" }}
                  src={comment.user.profile_image}
                />
                <p>Rated: {"⭐️".repeat(comment.rating)}</p>
                <p>
                  {comment.user.username} said: {comment.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MyProfile;
