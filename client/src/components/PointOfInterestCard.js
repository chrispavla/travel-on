import { UserContext } from "../Context/UserProvider";
import { useEffect, useState, useContext } from "react";
import EditPointOfInterestForm from "./EditPointOfInterestForm";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

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
        console.log(editedComment);
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
    <div style={{ border: "solid" }}>
      <img
        style={{ borderRadius: "50%", width: "4rem" }}
        src={place.user.profile_image}
      ></img>
      {place.user.username ? <h4>{place.user.username}</h4> : null}
      <img src={place.image} style={{ width: "8rem" }}></img>
      <h1>{place.name}</h1>
      {place.average_rating ? (
        <p>Average Rating: {"⭐️".repeat(place.average_rating)}</p>
      ) : null}
      <p>{place.note}</p>
      {place.user.username === user.username ? (
        <div>
          <button onClick={handleEditPointOfInterest}>Edit a place</button>
          <button onClick={() => handleDeletePointOfInterest(place)}>
            Delete a place
          </button>
          {isShown ? (
            <EditPointOfInterestForm
              place={place}
              editPlace={editPlace}
              setIsShown={setIsShown}
            />
          ) : null}
        </div>
      ) : null}
      <button onClick={() => handleToggleComments(place)}>Show comments</button>
      {showComments ? (
        <div>
          <CommentForm
            clickedCard={clickedCard}
            onSubmitComments={onSubmitComments}
          />
          <CommentList
            displayedComments={displayedComments}
            onDeleteComment={onDeleteComment}
            onUpdateComment={onUpdateComment}
          />
        </div>
      ) : null}
    </div>
  );
}

export default PointOfInterestCard;
