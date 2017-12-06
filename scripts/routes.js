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

function processImage(link) {
  // **********************************************
  // *** Update or verify the following values. ***
  // **********************************************

  // Replace the subscriptionKey string value with your valid subscription key.
  var subscriptionKey = "a20bbb45a4c745e9af453b51acb954b6";

  // Replace or verify the region.
  //
  // You must use the same region in your REST API call as you used to obtain your subscription keys.
  // For example, if you obtained your subscription keys from the westus region, replace
  // "westcentralus" in the URI below with "westus".
  //
  // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
  // a free trial subscription key, you should not need to change this region.
  var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

  // Request parameters.
  var params = {
    "visualFeatures": "Categories,Description,Color",
    "details": "",
    "language": "en",
  };

  // Display the image.
  var sourceImageUrl = link;
  // document.querySelector("#sourceImage").src = sourceImageUrl;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })

  .done(function(data) {
    console.log(data);
    // Show formatted JSON on webpage.
    $("#responseTextArea").val(JSON.stringify(data, null, 2));
  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    // Display error message.
    var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
    alert(errorString);
  });
};

app.listen(1337, () => console.log('App listening on port 1337!'))