import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <Container
      className="my-4"
      style={{
        backgroundColor: "white",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Row>
        <Col>
          <div className="heading">
            <h2>Why Choose Us</h2>
            <div className="d-flex justify-content-center ">
              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  backgroundColor: "#e3f6f5",
                  padding: "30px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <p>image</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  backgroundColor: "#e3f6f5",
                  padding: "30px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <p>image</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  backgroundColor: "#e3f6f5",
                  padding: "30px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <p>image</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center ">
              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  borderStyle: "solid",
                  padding: "30px",
                  borderRadius: "10px",

                  borderWidth: "2px",
                  borderTopWidth: "4px",
                  borderTopColor: "blue",
                }}
              >
                <div>
                  <p>Levels</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  borderStyle: "solid",
                  padding: "30px",
                  borderRadius: "10px",

                  borderWidth: "2px",
                  borderTopWidth: "4px",
                  borderTopColor: "blue",
                }}
              >
                <div>
                  <p>Duration</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  borderStyle: "solid",
                  padding: "30px",
                  borderRadius: "10px",

                  borderWidth: "2px",
                  borderTopWidth: "4px",
                  borderTopColor: "blue",
                }}
              >
                <div>
                  <p>Exams</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between m-5"
                style={{
                  borderStyle: "solid",
                  padding: "30px",
                  borderRadius: "10px",

                  borderWidth: "2px",
                  borderTopWidth: "4px",
                  borderTopColor: "blue",
                }}
              >
                <div>
                  <p>Exemptions</p>
                </div>
                <div>
                  <p>Expert faculty</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WhyChooseUs;
