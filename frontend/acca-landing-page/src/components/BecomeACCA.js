import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

const BecomeACCA = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    currentQualification: "", // New state for current qualification
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement any form validation or API call here
    handleShow();
  };

  return (
    <div
      style={{
        backgroundColor: "#e3f6f5",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "40px",
      }}
    >
      <Container
        className="my-4 m-5"
        style={{
          backgroundColor: "#e3f6f5",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "10px",
          width: "90%",
        }}
      >
        <Row>
          <Col md={8}>
            <h2>Become ACCA In 18 months</h2>
            <p>
              Learn about how you can become ACCA certified in just 18 months
              with our comprehensive courses.
            </p>
          </Col>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCurrentQualification">
                {" "}
                {/* New Form Group for Dropdown */}
                <Form.Label>Current Qualification</Form.Label>
                <Form.Control
                  as="select"
                  name="currentQualification"
                  value={formData.currentQualification}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  {/* Add more options as needed */}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Request Call Back
              </Button>
            </Form>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your request has been received. We will call you back soon!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default BecomeACCA;
