import * as snsLib from '../../libs/sns-lib'
import { success, failure } from '../../libs/response-lib'

export async function main(event, context, callback) {

    try {
        const message = { 
            name: 'test message' 
        }
    
        await snsLib.publish(message, process.env.FEED2_ARN) 

        callback(null, success(message));

    } catch (e) {
        callback(null, failure({ status: false }));
    }
}