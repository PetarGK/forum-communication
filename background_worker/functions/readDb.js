import * as snsLib from '../../libs/sns-lib'
import { success, failure } from '../../libs/response-lib'

export async function main(event, context, callback) {

    try {
        const message = event.Records[0].Sns.Message;
        console.log('From SNS: ', message);

        const message2 = { 
            name: 'read from db' 
        }
    
        await snsLib.publish(message2, process.env.UPDATE_CONFIG_ARN) 

        callback(null, success(message2));

    } catch (e) {
        callback(null, failure({ status: false }));
    }
}