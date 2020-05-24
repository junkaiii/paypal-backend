import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

const axios = require("axios").default;
const qs = require("querystring");

const backend = "/api"; //  TODO: Move to environment variables

interface PayButtonProps {
  amount: number;
}

interface PayButtonState {
  paid: boolean;
}

export default class PayButton extends Component<
  PayButtonProps,
  PayButtonState
> {
  readonly state = { paid: false };

  renderPayButton = (state: PayButtonState) => {
    console.log(this.state);

    let toggleState = () => {
      this.setState({ paid: true });
    };

    let createOrder = () => {
      return axios
        .post(
          backend + "/create-payment",
          qs.stringify({
            amount: this.props.amount,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function (response: any) {
          return response.data.id;
        })
        .catch(function (error: any) {
          console.log(error);
        });
    };

    let onApprove = (data: any) => {
      return axios
        .post(
          backend + "/capture-payment",
          qs.stringify({ order_id: data.orderID }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function (response: any) {
          alert(
            "Your payment is confirmed. An email will be sent to: " +
              response.data.payer.email_address
          );
          toggleState();
          return response;
        })
        .catch(function (error: any) {
          console.log(error);
        });
    };

    if (this.state.paid) {
      return (
        <Row className="show-grid">
          <h3>Thank You!</h3>
        </Row>
      );
    } else {
      return (
        <Row className="show-grid">
          <PayPalButton
            // Consolidate URLS to ENUM for easy changing
            // Create interfaces for react-paypal-button-v2
            createOrder={createOrder}
            onApprove={onApprove}
          ></PayPalButton>
        </Row>
      );
    }
  };

  render() {
    return this.renderPayButton(this.state);
  }
}
