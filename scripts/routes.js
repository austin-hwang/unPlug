var stripe = require("stripe")(
    "sk_test_AiPwVw7Y2qRBP17EZmRftVTK"
  );
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

var imgur = require('imgur-node-api');
path = require('path');
 
imgur.setClientID("bfad3f46ce46366");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post("/image", function(req,res) {
  var path = req.body.image;
  imgur.upload(path.join(__dirname, path), function (err, res) {
   // Log the imgur url 
    var link = res.data.link;
    console.log(link);
  });
})

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