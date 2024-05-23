import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PlacementAssistance.css";

const PlacementAssistance = () => {
  return (
    <Container
      className="my-4 "
      style={{
        backgroundColor: "#CEAEFA",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Row>
        <Col>
          <div className="heading">
            <h2>100% Placement Assistance</h2>
          </div>
          <h3>Resume Building</h3>
          <p>Create your resume</p>
          <h3>Career Counselling</h3>
          <p>Get counselling</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PlacementAssistance;
