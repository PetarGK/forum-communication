import AWS from './xray-lib'

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function call(action, params) {
  return dynamoDb[action](params).promise();
}