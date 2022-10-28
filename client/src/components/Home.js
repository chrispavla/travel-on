// import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Container, Icon, List, Button } from "semantic-ui-react";

function Home() {
  return (
    <div className="outerHome">
      <div id="container">
        <Container textAlign="center">
          <h1 style={{ color: "#ffffff" }}>Welcome to Travel-On</h1>
        </Container>
        <Container textAlign="center">
          <h4 style={{ marginTop: "20px", lineHeight: "1.5" }}>
            Travel-On brings together a community of people who love to travel{" "}
            <br></br>Get inspiration for your trips and share your travel
            experiences
          </h4>
        </Container>
        <Container
          textAlign="left"
          style={{
            marginTop: "40px",
            border: "dotted white",
            borderRadius: "15px",
            padding: "10px",
            backgroundColor: "#98eb6b9a",
            width: "50%",
          }}
        >
          <List>
            <List.Item>
              <List.Icon style={{ color: "#ffffff" }} name="marker" />
              <List.Content>Map locations of your travels</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon style={{ color: "#ffffff" }} name="plane" />
              <List.Content>
                Discover new places through personal recommendations,
                interesting facts and local tips
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon style={{ color: "#ffffff" }} name="share alternate" />
              <List.Content>
                Share the best places around the world
              </List.Content>
            </List.Item>
          </List>
        </Container>
        <Container textAlign="center" style={{ marginTop: "50px" }}>
          <h4 style={{ color: "#ffffff" }}>
            Share the places you love, learn more about your favorite places and
            the places you’ve always wanted to visit
          </h4>
        </Container>
        <Container textAlign="center" style={{ marginTop: "20px" }}>
          <Button
            as={Link}
            to="/map"
            style={{ backgroundColor: "#98eb6b", color: "black" }}
          >
            Start Mapping
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default Home;
