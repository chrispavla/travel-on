import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div>
      {userProfile ? (
        <div>
          <img
            src={userProfile.profile_image}
            style={{ borderRadius: "50%", width: "3rem" }}
          />
          <h2>
            {userProfile.first_name} {userProfile.last_name}
          </h2>
          <h4>{userProfile.username}</h4>
          <div>
            <p>Places {userProfile.first_name} visited:</p>
            {userProfile.locations.map((location) => (
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
            <p>{userProfile.first_name}'s activity:</p>
            {userProfile.comments.length > 0 ? (
              userProfile.comments.map((comment) => (
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
              ))
            ) : (
              <div>
                <p>No activity yet</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UsersProfile;
