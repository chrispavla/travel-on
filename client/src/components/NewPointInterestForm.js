import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";

function NewPointInterestForm({ displayedLocation, addNewPlace }) {
  let [user, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState();

  function handleSubmitNewPointOfInterest(e) {
    e.preventDefault();

    let newPointOfInterest = {
      name: name,
      image: photo,
      note: note,
      category: category,
      user_id: user.id,
      location_id: displayedLocation.id,
    };

    fetch("/point_of_interests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPointOfInterest),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          addNewPlace(data);
        });
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });

    setName("");
    setPhoto("");
    setNote("");
    setCategory("");
  }

  return (
    <div>
      <form onSubmit={handleSubmitNewPointOfInterest}>
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

export default NewPointInterestForm;
