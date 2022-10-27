import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

function UsersProfile() {
  let { id } = useParams();
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    fetch(`/users/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUserProfile(data);
        });
      }
    });
  }, [id]);

  return (
    <Container>
      {userProfile ? (
        <div>
          <Item.Group>
            <Item style={{ marginTop: "40px" }}>
              <Item.Image src={userProfile.profile_image} size="small" />
              <Item.Content>
                <Item.Header as="a">
                  {" "}
                  {userProfile.first_name} {userProfile.last_name}{" "}
                </Item.Header>
                <Item.Meta>{userProfile.username}</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4}>
                <h4>Places {userProfile.first_name} visited:</h4>
                {userProfile.locations.map((location) => (
                  <div>
                    <Link key={location.id} to={`/locations/${location.id}`}>
                      <p>
                        {location.city}, {location.country}
                      </p>
                    </Link>
                  </div>
                ))}
              </Grid.Column>

              <Grid.Column>
                <h4>{userProfile.first_name}'s activity:</h4>
                <Comment.Group>
                  {userProfile.comments.length > 0 ? (
                    userProfile.comments.map((comment) => (
                      <Comment>
                        <Comment.Avatar
                          as="a"
                          src={comment.user.profile_image}
                        />
                        <Comment.Content>
                          <Comment.Author>
                            {comment.user.username}
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
                          <Comment.Text> {comment.comment}</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    ))
                  ) : (
                    <div>
                      <p>No activity yet</p>
                    </div>
                  )}
                </Comment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) : null}
    </Container>
  );
}

export default UsersProfile;
