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