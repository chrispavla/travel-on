import { UserContext } from "../Context/UserProvider";
import { useState, useContext } from "react";
import EditPointOfInterestForm from "./EditPointOfInterestForm";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  Image,
  Icon,
  Comment,
  Header,
  Button,
  Divider,
} from "semantic-ui-react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function PointOfInterestCard({
  place,
  places,
  deletePointOfInterest,
  editPlace,
  setPlaces,
}) {
  let [user, setUser] = useContext(UserContext);
  const [isShown, setIsShown] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [clickedCard, setClickedCard] = useState("");

  function onSubmitComments(newComment) {
    setDisplayedComments([...displayedComments, newComment]);
    setPlaces(
      places.map((place) => {
        if (place.id === newComment.point_of_interest.id) {
          return newComment.point_of_interest;
        } else {
          return place;
        }
      })
    );
  }

  function onUpdateComment(editedComment) {
    let newComments = displayedComments.map((displayedComment) => {
      if (displayedComment.id === editedComment.id) {
        return editedComment;
      } else {
        return displayedComment;
      }
    });
    setDisplayedComments(newComments);
    setPlaces(
      places.map((place) => {
        if (place.id === editedComment.point_of_interest.id) {
          return editedComment.point_of_interest;
        } else {
          return place;
        }
      })
    );
  }

  function onDeleteComment(deletedComment) {
    setDisplayedComments(
      displayedComments.filter(
        (displayedComment) => displayedComment.id !== deletedComment.id
      )
    );
  }

  function handleToggleComments(place) {
    setClickedCard(place);
    setShowComments((showComments) => !showComments);
    fetch(`/comments/${place.id}`)
      .then((res) => res.json())
      .then((data) => setDisplayedComments(data));
  }

  function handleDeletePointOfInterest(deletedPoint) {
    fetch(`/point_of_interests/${deletedPoint.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(deletePointOfInterest(deletedPoint));
  }

  function handleEditPointOfInterest() {
    setIsShown((isShown) => !isShown);
  }

  return (
    <Grid.Column>
      <Card>
        {user ? (
          <>
            {place.user.username ? (
              <Card.Header>
                <Header as="h5">
                  <Image
                    as={Link}
                    to={`/users/${place.user.id}`}
                    avatar
                    src={place.user.profile_image}
                  />
                  {place.user.username}
                  {user && place.user.username === user.username ? (
                    <>
                      <EditPointOfInterestForm
                        place={place}
                        editPlace={editPlace}
                        setIsShown={setIsShown}
                      />
                      <Tooltip arrow title="Delete place" placement="top">
                        <IconButton
                          onClick={() => handleDeletePointOfInterest(place)}
                        >
                          <DeleteIcon color="primary" />
                        </IconButton>
                      </Tooltip>{" "}
                    </>
                  ) : null}
                </Header>
              </Card.Header>
            ) : null}
          </>
        ) : (
          <>
            {place.user.username ? (
              <Card.Header>
                <Header as="h5">
                  <Image avatar src={place.user.profile_image} />
                  {place.user.username}
                </Header>
              </Card.Header>
            ) : null}
          </>
        )}

        <img
          src={place.image}
          style={{
            height: "200px",
            width: "auto",
            objectFit: "cover",
          }}
        />
        <Card.Content
          style={{
            height: "200px",
          }}
        >
          <Card.Header>{place.name}</Card.Header>
          {place.average_rating ? (
            <Card.Meta>
              <Header
                size="tiny"
                style={{
                  marginTop: "10px",
                }}
              >
                Average Rating: {"⭐️".repeat(place.average_rating)}
              </Header>
            </Card.Meta>
          ) : null}
          <Card.Description>{place.note}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Button
            id="commentButton"
            fluid
            animated="vertical"
            onClick={() => handleToggleComments(place)}
          >
            <Button.Content hidden>Comments</Button.Content>
            <Button.Content visible>
              <Icon name="comments" />
            </Button.Content>
          </Button>
          {showComments ? (
            <div>
              <Comment.Action
                onClick={() => setShowAddCommentForm(!showAddCommentForm)}
                style={{
                  color: "#6877f3",
                }}
              >
                <Icon
                  name="edit"
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    color: "#6877f3",
                  }}
                />
                Add comment
              </Comment.Action>
              {showAddCommentForm ? (
                <>
                  {" "}
                  <CommentForm
                    clickedCard={clickedCard}
                    onSubmitComments={onSubmitComments}
                    setShowAddCommentForm={setShowAddCommentForm}
                  />
                  <Divider />{" "}
                </>
              ) : null}
              <CommentList
                displayedComments={displayedComments}
                onDeleteComment={onDeleteComment}
                onUpdateComment={onUpdateComment}
              />
            </div>
          ) : null}
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

export default PointOfInterestCard;
