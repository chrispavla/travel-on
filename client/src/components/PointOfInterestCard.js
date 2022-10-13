function PointOfInterestCard({ displayedLocation }) {
  const pointdisplay = displayedLocation.point_of_interests.map((point) => (
    <div>
      <img src={point.user.profile_image}></img>
      <h4>{point.user.username}</h4>
      <img src={point.image}></img>
      <h1>{point.name}</h1>
      <p>{point.note}</p>
    </div>
  ));

  return (
    <div>
      <h1>{pointdisplay}</h1>
    </div>
  );
}

export default PointOfInterestCard;
