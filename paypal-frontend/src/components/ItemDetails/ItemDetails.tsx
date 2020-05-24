import React, { Component } from "react";
import { Media, Row, Col, Form } from "react-bootstrap";

interface ItemDetailsState {
  key: string;
  sku: string;
  price: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

interface ItemDetailsProps {
  key: string;
  sku: string;
  price: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  onUpdateQuantity: Function;
}

const initialState = {
  key: "123",
  sku: "123",
  price: 15.99,
  name: "Item Name",
  description: "Description",
  imageUrl: "https://via.placeholder.com/400x400.png",
  quantity: 1,
};

export default class ItemDetails extends Component<ItemDetailsProps> {
  readonly state: ItemDetailsState = initialState;

  onChangeQuantity = (event: { target: { value: string } }) => {
    this.props.onUpdateQuantity(parseInt(event.target.value), this.props.sku);
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <Media>
              <Media.Body>
                <h5>{this.props.name}</h5>
                <p>{this.props.description}</p>
                <Row className="show-grid">
                  <Col md={6}>
                    <strong>Price: </strong> ${this.props.price}
                  </Col>
                  <Col md={6}>
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      defaultValue={this.props.quantity}
                      onChange={this.onChangeQuantity}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Media.Body>
              <img
                width={100}
                height={100}
                src={this.props.imageUrl}
                alt="product"
              ></img>
            </Media>
          </Col>
        </Row>
        <br></br>
        <br></br>
      </>
    );
  }
}
