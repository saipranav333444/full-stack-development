import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./LearnACCA.css";

const LearnACCA = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="heading">
            <h2>What will you learn In ACCA?</h2>
          </div>

          <div className="d-flex justify-content-center ">
            <div className="d-flex flex-column justify-content-between m-5">
              <div
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                <p>image</p>
              </div>
              <div>
                <ol
                  style={{
                    listStyle: "initial",
                  }}
                >
                  <li>typing</li>
                  <li>HTML/CSS</li>
                </ol>
                <p
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "5px",
                  }}
                >
                  Expert faculty
                </p>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-between m-5">
              <div
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                <p>image</p>
              </div>
              <div>
                <ol
                  style={{
                    listStyle: "initial",
                  }}
                >
                  <li>typing</li>
                  <li>HTML/CSS</li>
                </ol>
                <p
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "5px",
                  }}
                >
                  Expert faculty
                </p>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-between m-5">
              <div
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                <p>image</p>
              </div>
              <div>
                <ol
                  style={{
                    listStyle: "initial",
                  }}
                >
                  <li>typing</li>
                  <li>HTML/CSS</li>
                </ol>
                <p
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "5px",
                  }}
                >
                  Expert faculty
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LearnACCA;
