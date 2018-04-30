import * as dynamoDbLib from '../../libs/dynamodb-lib'
import { success, failure } from '../../libs/response-lib'

const defaultRows = 3;

export async function main(event, context, callback) {
  let adsRows = defaultRows;
  if(event.queryStringParameters && event.queryStringParameters.hasOwnProperty('adsRows')){
    adsRows = event["queryStringParameters"]['adsRows']
  }

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

  try {
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
  }
}