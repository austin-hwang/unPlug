var stripe = require("stripe")(
    "sk_test_AiPwVw7Y2qRBP17EZmRftVTK"
  );
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = Storage();
// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Creates a client
const vision = new Vision();

// Makes an authenticated API request.
storage
.getBuckets()
.then((results) => {
  const buckets = results[0];

  console.log('Buckets:');
  buckets.forEach((bucket) => {
  console.log(bucket.name);
  });
})
.catch((err) => {
  console.error('ERROR:', err);
});


const fileName = cameraInput.value;
console.log(fileName);
// Performs label detection on the local file
vision.labelDetection({ source: { filename: fileName } })
.then((results) => {
  const labels = results[0].labelAnnotations;
  console.log('Labels:');
  labels.forEach((label) => console.log(label));
})
.catch((err) => {
  console.error('ERROR:', err);
});

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

app.listen(1337, () => console.log('Example app listening on port 1337!'))
  