import { useState } from "react";
import { Modal, Button, Header, Form, Icon, Grid } from "semantic-ui-react";

function NewLocationForm({ onSubmitNewLocation }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  function handleNewLocationSubmit(e) {
    e.preventDefault();

    let newLocation = {
      city: city,
      country: country,
      latitude: latitude,
      longitude: longitude,
    };

    fetch("/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          onSubmitNewLocation(data);
          setOpen(false);
          setCity("");
          setCountry("");
          setLatitude("");
          setLongitude("");
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
      trigger={
        <Grid>
          <Grid.Column textAlign="center">
            <Button id="btn" style={{ textAlign: "center", marginTop: "30px" }}>
              Pin a New Location
            </Button>
          </Grid.Column>
        </Grid>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header
        icon="map"
        content="Add new location"
        style={{ backgroundColor: "#6877f3", color: "#ffff" }}
      />
      <Modal.Content>
        <Form onSubmit={handleNewLocationSubmit}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>City</label>
              <input
                type="text"
                placeholder="Rome"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <input
                type="text"
                placeholder="Italy"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Latitude</label>
              <input
                type="text"
                placeholder="41.9028"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              ></input>
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <input
                type="text"
                placeholder="12.4964"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              ></input>
            </Form.Field>
          </Form.Group>
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

export default NewLocationForm;
