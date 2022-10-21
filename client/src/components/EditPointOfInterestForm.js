import { useState } from "react";

function EditPointOfInterestForm({ place, editPlace, setIsShown }) {
  const [name, setName] = useState(place.name);
  const [photo, setPhoto] = useState(place.image);
  const [note, setNote] = useState(place.note);
  const [category, setCategory] = useState(place.category);
  const [error, setError] = useState();

  function handleSubmitEditPointOfInterest(e) {
    e.preventDefault();

    fetch(`/point_of_interests/${place.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: photo,
        note: note,
        category: category,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          editPlace(data);
          setIsShown(false);
        });
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmitEditPointOfInterest}>
        <div>
          <label>
            Name
            <input
              type="text"
              placeholder="Royal Plaza Hotel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Photo
            <input
              type="text"
              placeholder="Paste you photo link"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Note
            <input
              type="text"
              placeholder="Amazing hotel with the best view"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Category
            <select onChange={(e) => setCategory(e.target.value)}>
              <option></option>
              <option>Food</option>
              <option>Hotel</option>
              <option>Cultural attraction</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
        {error ? error.map((err) => <div>{err}</div>) : null}
      </form>
    </div>
  );
}

export default EditPointOfInterestForm;
