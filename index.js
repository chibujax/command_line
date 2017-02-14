  var prompt = require('prompt');
  var Client = require('node-rest-client').Client;

  //Schema for input
  var schema = {
    properties: {
    word: {
    description: 'Enter iso2 code to get country name',     
    type: 'string',                 
    pattern: /^\w+$/,                  // Regular expression that input must be valid against. 
    message: 'Must be letters', // Warning message to display if validation fails. 
 
    required: true                         
      }
    }
  };

function onErr(err) {
  console.log(err);
  return 1;
}

prompt.start(); 
prompt.get(schema, function (err, result) {
  if (err) { return onErr(err); }
  var client = new Client();
  var apiurl = "http://services.groupkt.com/country/get/iso2code/" + result.word;

  client.get(apiurl, function (data, response) { 
    if(!data.hasOwnProperty("RestResponse")){
      console.log("Something went wrong, contact admin");
    }
    else if (!data["RestResponse"].hasOwnProperty("result")) {
      console.log("No country found");
    }else{
      if (data["RestResponse"]["result"].hasOwnProperty("name")){
        console.log("Country Name : " + data["RestResponse"]["result"]["name"] );
      }
      if (data["RestResponse"]["result"].hasOwnProperty("alpha2_code")){
        console.log("Alpha2_code : " + data["RestResponse"]["result"]["alpha2_code"] );
      }
      if (data["RestResponse"]["result"].hasOwnProperty("alpha3_code")) {
        console.log("Alpha3_code : " + data["RestResponse"]["result"]["alpha3_code"] );
      }
    } 
  }).on('error', function (err) {
    console.log('something went wrong on the request', err.request.options);
  });

});