const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LnVB5SCtcEEddXhyh8trEnYrDjqVWhBMvjdrUOjvvxPUQQUH7qTbtjezAsQHojxyGEJyLABZ7taY8cQkw8XcDmL006cuw7jUw"
);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("Hello From Florista"));

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Received for this amount >>>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "INR",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen Command
exports.api = functions.https.onRequest(app);
