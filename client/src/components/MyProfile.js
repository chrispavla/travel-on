import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { Link, useHistory } from "react-router-dom";
import {
  Comment,
  Icon,
  Form,
  Button,
  Divider,
  Grid,
  Modal,
  Header,
  Container,
  Item,
} from "semantic-ui-react";

function MyProfile() {
  let [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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
    <Container>
      {user ? (
        <div>
          <Item.Group>
            <Item style={{ marginTop: "40px" }}>
              <Item.Image src={user.profile_image} size="small" />
              <Item.Content>
                <Item.Header as="a">
                  {user.first_name} {user.last_name}
                </Item.Header>
                <Item.Meta>{user.username}</Item.Meta>

                <Modal
                  closeIcon
                  size="small"
                  open={open}
                  trigger={
                    <Button
                      id="add-btn"
                      size="mini"
                      compact
                      onClick={() => handleUserEdit()}
                    >
                      Edit Profile
                    </Button>
                  }
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                >
                  <Header
                    icon="user circle"
                    content="Edit Profile Information"
                    style={{ backgroundColor: "#6877f3", color: "#ffff" }}
                  />
                  <Modal.Content>
                    <Form onSubmit={handleSubmitUpdateProfile}>
                      <Form.Group widths="equal">
                        <Form.Field>
                          <label>First name</label>
                          <input
                            type="text"
                            name="firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          ></input>
                        </Form.Field>
                        <Form.Field>
                          <label>Last name</label>
                          <input
                            type="text"
                            name="lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          ></input>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Field>
                          <label>Username</label>
                          <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          ></input>
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          ></input>
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <label>Profile Image</label>
                        <input
                          type="text"
                          name="profileimage"
                          value={profileImage}
                          onChange={(e) => setProfileImage(e.target.value)}
                        ></input>
                      </Form.Field>
                      <Button
                        type="Submit"
                        style={{ backgroundColor: "#98eb6b" }}
                      >
                        <Icon name="checkmark" /> Update
                      </Button>
                    </Form>
                  </Modal.Content>
                  {error
                    ? error.map((err) => (
                        <div className="errors">
                          <Icon name="warning circle"></Icon>
                          {err}
                        </div>
                      ))
                    : null}
                </Modal>
                <Button
                  size="mini"
                  style={{
                    backgroundColor: "#6877f3",
                    color: "#ffff",
                  }}
                  compact
                  onClick={() => handleUserDelete(user)}
                >
                  Delete Account
                </Button>
              </Item.Content>
            </Item>
          </Item.Group>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4}>
                <h4>Places you visited:</h4>
                {user.locations.map((location) => (
                  <div>
                    <Link key={location.id} to={`/locations/${location.id}`}>
                      <h4 style={{ color: "#6877f3", marginTop: "5px" }}>
                        <Icon style={{ color: "#98eb6b" }} name="point"></Icon>{" "}
                        {location.city}, {location.country}
                      </h4>
                    </Link>
                  </div>
                ))}
              </Grid.Column>
              <Grid.Column>
                <h4>Your activity:</h4>
                <Comment.Group>
                  {user.comments.map((comment) => (
                    <Comment>
                      <Comment.Avatar as="a" src={comment.user.profile_image} />
                      <Comment.Content>
                        <Comment.Author>
                          {comment.user.username} visited{" "}
                          <Link
                            to={`/locations/${comment.point_of_interest.location_id}`}
                          >
                            {comment.point_of_interest.name}
                          </Link>
                        </Comment.Author>
                        <Comment.Metadata>
                          {comment.created_at === comment.updated_at ? (
                            <div>left at: {comment.created_at}</div>
                          ) : (
                            <div>updated at: {comment.updated_at}</div>
                          )}
                        </Comment.Metadata>
                        <Comment.Text>
                          Rated: {"⭐️".repeat(comment.rating)}
                        </Comment.Text>
                        <Comment.Text>{comment.comment}</Comment.Text>
                      </Comment.Content>

                      <Divider />
                    </Comment>
                  ))}
                </Comment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) : null}
    </Container>
  );
}

export default MyProfile;
