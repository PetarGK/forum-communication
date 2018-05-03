import * as dynamoDbLib from '../../libs/dynamodb-lib'
import { success, failure } from '../../libs/response-lib'
import log from '../../libs/log' 
import middy from 'middy'
import sampleLogging from '../../middlewares/sample-logging'
import { builtinModules } from 'module';

const defaultRows = 3;

const main = middy(async (event, context, callback) => {

/*
  try {

    let adsRows = defaultRows;
    if(event.queryStringParameters && event.queryStringParameters.hasOwnProperty('adsRows')){
      adsRows = event["queryStringParameters"]['adsRows']
    }
  
    log.debug(`Number of ads requested ${adsRows}`)
  
    const adsCount = 4; // get from config
  
    if (adsRows <= 0) {
      adsRows = defaultRows
    }
  
    if (adsRows > adsCount) {
      adsRows = adsCount;
    }
  
    let numbers = []
    while(numbers.length < adsRows){
        var randomnumber = Math.floor(Math.random() * adsCount) + 1;
        if(numbers.indexOf(randomnumber) > -1) continue;
        numbers[numbers.length] = randomnumber;
    }
  
    let keys = [];
    var i;
    for (i = 0; i < numbers.length; i++) { 
      keys.push({ id: '1_42342342334_' + numbers[i] })
    }
  
    const params = {};
    params.RequestItems = {};
    params.RequestItems[process.env.ADVERTISEMENTS_TABLE_NAME] = {
      Keys: keys
    };

    const result = await dynamoDbLib.call("batchGet", params);

    if (result.Responses) {
      callback(null, success(result.Responses[process.env.ADVERTISEMENTS_TABLE_NAME]));
    }
    else {
      callback(null, failure({ status: false }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }*/


  try {
    var params = {
      TableName: process.env.ADVERTISEMENTS_TABLE_NAME,
      IndexName: process.env.ADVERTISEMENTS_INDEX_NAME,
      KeyConditions: {
        "parentId":{
          "ComparisonOperator":"EQ",
          "AttributeValueList":  [ "J1" ]
        },
        "counter":{
            "ComparisonOperator":"BETWEEN",
            "AttributeValueList": [ 1, 3 ]
        }        
      },
      ReturnConsumedCapacity: 'TOTAL'      
    };

    const result = await dynamoDbLib.call("query", params);


    log.info(result);

    callback(null, success(result));
  } catch (e) {
    log.error('Error while executing get advertisements', {}, e);
    callback(null, failure({ status: false }));
  }  

})

main.use(sampleLogging({ sampleRate: 0.01 }));

module.exports = { main }