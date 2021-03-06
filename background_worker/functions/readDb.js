import * as snsLib from '../../libs/sns-lib'
import * as dynamoDbLib from '../../libs/dynamodb-lib'
import { success, failure } from '../../libs/response-lib'

export async function main(event, context, callback) {

    try {
        const message = event.Records[0].Sns.Message;
        console.log('From SNS: ', message);


        var params = {
            Item: {
             "id":  "2", 
             "name":  "Petar", 
             "description": "Korudzhiev",
             "expire": Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1 // expire after 1 day 
            }, 
            TableName: process.env.ADVERTISEMENTS_TABLE_NAME
        };

        await dynamoDbLib.call("put", params)   

        const message2 = { 
            name: 'read from db' 
        }
    
        await snsLib.publish(message2, process.env.UPDATE_CONFIG_ARN) 

        callback(null, success(message2));

    } catch (e) {
        callback(null, failure({ status: false }));
    }
}