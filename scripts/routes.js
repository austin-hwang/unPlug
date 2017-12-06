var stripe = require("stripe")(
    "sk_test_AiPwVw7Y2qRBP17EZmRftVTK"
  );
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post("/charge", function(req, res){
    stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: "tok_visa", // obtained with Stripe.js
        description: "Charge for testing"
      }, function(err, charge) {
        // asynchronously called
      });
});

app.listen(1337, () => console.log('App listening on port 1337!'))