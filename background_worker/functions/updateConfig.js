import { success, failure } from '../../libs/response-lib'
import * as s3Lib from '../../libs/s3-lib'

export async function main(event, context, callback) {

    try {
        const message = event.Records[0].Sns.Message;
        console.log('From SNS: ', message);

        const params = {
            Bucket: process.env.METADATA_BUCKET,
            Key: 'metadata.json',
            Body: 'Uploaded text using the promise-based method! ' + message             
        }

        await s3Lib.put(params)

        callback(null, success(message));

    } catch (e) {
        callback(null, failure({ status: false }));
    }
}