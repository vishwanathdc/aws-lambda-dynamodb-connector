/*
*Node.js Utility to fetch data from dynamodb for a given id to a lambda function.
*
*How to use:
*
*Create utils.js file and copy the contents of the file
*change table name and keyname as necessary
*
*go to file where you want to get dynamodb values and import utils.js
*const Utils = require('utils.js');
*let value = await Utils.readUserData(id);
*value contains dynamodb values for id 
*
*The dynamodb table should have trigger lambda function.
*/

const Utils = {}

/*Download promise and aws-sdk modules in node_modules.
* git bash to node_modules folder
* npm install --save promise
* npm install --save aws-sdk
*/
var Promise = require('promise');
var AWS = require('aws-sdk');

//The document client simplifies working with items in Amazon DynamoDB by abstracting away the notion of attribute values.
var docClient = new AWS.DynamoDB.DocumentClient();

//The Promise.resolve() method returns a Promise object that is resolved with a given value.
//pass id as a paramter to fetch values for the primary key (id) you are looking for in dynamodb.
Utils.readUserData = function (id){
    return new Promise((resolve, reject) => {
        loadUserData(id, (res) => {
            resolve(res);
      });
    });
  }

  /*
  * TableName : 'enter your table name from dynamodb'
  * Key : {
  *    'enter your key name from table within quotes' : id
  * }
  *use callback to send back data to promise
  */
  function loadUserData(id, callback) {
    let params = {
        TableName: 'yourtablename',
        Key: {
            'yourkeynameindynamodb': id
        }
    };
  
    docClient.get(params, function (error, data) {
        if (error) {
            return 'error occured';
        } 
        else { 
            callback(data.Item);
        }
    });
  }

  module.exports = Utils