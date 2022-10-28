import { useState } from "react";
import { Modal, Button, Header, Form, Icon } from "semantic-ui-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

function EditPointOfInterestForm({ place, editPlace, setIsShown }) {
  const [name, setName] = useState(place.name);
  const [photo, setPhoto] = useState(place.image);
  const [note, setNote] = useState(place.note);
  const [category, setCategory] = useState(place.category);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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
          setOpen(false);
        });
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });
  }

  return (
    <Modal
      closeIcon
      open={open}
      size="small"
      trigger={
        <Tooltip
          arrow
          title="Edit Place"
          placement="top"
          style={{ marginLeft: "60px" }}
        >
          <IconButton>
            <EditIcon id="tooltip" />
          </IconButton>
        </Tooltip>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header
        icon="map"
        content="Edit a Place"
        style={{ backgroundColor: "#6877f3", color: "#ffff" }}
      />
      <Modal.Content>
        <Form onSubmit={handleSubmitEditPointOfInterest}>
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

export default EditPointOfInterestForm;
