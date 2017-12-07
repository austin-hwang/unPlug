// Require Node dependencies gotten using npm install

var express = require('express');
var router = express.Router();
var path = require('path');
var stripe = require("stripe")(
    "sk_test_AiPwVw7Y2qRBP17EZmRftVTK"
  );
var bodyParser = require('body-parser')
var fs = require('fs');

// GET home page.
router.get('/', function(req, res, next) {
     res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// GET how to page
router.get('/how', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'how.html'));
});

// Get about us page
router.get('/about', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'about.html'));
});

// Allows to parse req.body
router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

// Disable cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Charge transactions using stripe
router.post("/charge", function(req, res){
    stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: "tok_visa", // obtained with Stripe.js
        description: req.body.description
      }, function(err, charge) {
        // asynchronously called
      });
});
module.exports = router;
