import React, { Component } from "react";
// import Checkout from "./components/checkout/checkout";
import { Container, Row, Col, Form } from "react-bootstrap";
import Subtotal from "./components/Subtotal/Subtotal";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Form>
          <Form.Group>
            <Container fluid className="container">
              <Row>
                <Col></Col>
                <Col xs={8} className="purchase-card">
                  <Subtotal></Subtotal>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default App;
