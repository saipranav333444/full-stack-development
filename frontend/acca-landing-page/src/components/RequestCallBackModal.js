import React from "react";
import { Modal, Button } from "react-bootstrap";

const RequestCallBackModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
  );
};

export default RequestCallBackModal;
