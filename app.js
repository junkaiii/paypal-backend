const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

const app = express();
const port = process.env.PORT;

const CLIENT = process.env.CLIENT;
const SECRET = process.env.SECRET;

const PAYPAL_API = "https://api.sandbox.paypal.com";

let getTokenConfig = {
  method: "post",
  url: PAYPAL_API + "/v1/oauth2/token",
  data: "grant_type=client_credentials",
  headers: {
    Accept: "application/json",
    "Accept-Language": "en_US",
    Authorization:
      "Basic " + Buffer.from(CLIENT + ":" + SECRET).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

// move to auth class

async function generateAccessToken() {
  try {
    response = await axios(getTokenConfig);
    token = await response["data"]["access_token"];
    return token;
  } catch (error) {
    throw error;
  }
}

// move to helpers/configs

function generateCreateOrderConfig(value, token) {
  return {
    method: "post",
    url: PAYPAL_API + "/v2/checkout/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: value,
          },
        },
      ],
      application_context: {
        return_url: "http://google.com",
        cancel_url: "http://yahoo.com",
      },
    },
  };
}
function generateCaptureConfig(orderId, token) {
  return {
    method: "post",
    url: PAYPAL_API + `/v2/checkout/orders/${orderId}/capture`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: {
      intent: "CAPTURE",
    },
  };
}

// split to order class

async function createOrder(value) {
  try {
    token = await generateAccessToken();
    response = await axios(generateCreateOrderConfig(value, token));
    order = await response["data"];
    return order;
  } catch (error) {
    throw error;
  }
}

async function captureOrder(orderId) {
  try {
    token = await generateAccessToken();
    response = await axios(generateCaptureConfig(orderId, token));
    order = await response;
    return order;
  } catch (error) {
    throw error;
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("OK!");
});

app.use(express.static(path.join(__dirname, "paypal-frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/index.html"));
});

app.post("/api/create-payment", cors(), async function (req, res) {
  amount = req.body.amount;
  try {
    order = await createOrder(amount);
    console.log("order creation succeeded");
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(error["response"]["status"]).json(error["response"]["data"]);
  }
});

app.post("/api/capture-payment", cors(), async function (req, res) {
  orderId = req.body.order_id;
  try {
    order = await captureOrder(orderId);
    console.log(order["data"]);
    res.send(order["data"]);
  } catch (error) {
    console.log(error);
    res.status(error["response"]["status"]).json(error["response"]["data"]);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
);
