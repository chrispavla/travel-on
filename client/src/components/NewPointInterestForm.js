import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { Modal, Button, Header, Form, Icon } from "semantic-ui-react";

function NewPointInterestForm({ displayedLocation, addNewPlace }) {
  let [user, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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
          setOpen(!open);
          setName("");
          setPhoto("");
          setNote("");
          setCategory("");
        });
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });
  }

  return (
    <Modal
      closeIcon
      size="small"
      open={open}
      trigger={<Button id="add-btn">Share a place</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header
        icon="map"
        content="Add a Place"
        style={{ backgroundColor: "#6877f3", color: "#ffff" }}
      />
      <Modal.Content>
        <Form onSubmit={handleSubmitNewPointOfInterest}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Name</label>
              <input
                type="text"
                placeholder="Royal Plaza Hotel"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option></option>
                <option>Food</option>
                <option>Hotel</option>
                <option>Cultural attraction</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Photo</label>
            <input
              type="text"
              placeholder="Paste you photo link"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            ></input>
          </Form.Field>
          <Form.Field>
            <label>Note</label>
            <input
              type="text"
              placeholder="Amazing hotel with the best view"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></input>
          </Form.Field>
          <Button type="Submit" style={{ backgroundColor: "#98eb6b" }}>
            <Icon name="checkmark" /> Submit
          </Button>
          {error
            ? error.map((err) => (
                <div className="errors">
                  <Icon name="warning circle"></Icon>
                  {err}
                </div>
              ))
            : null}
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default NewPointInterestForm;
