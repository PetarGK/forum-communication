import * as dynamoDbLib from '../../libs/dynamodb-lib'
import { success, failure } from '../../libs/response-lib'

export async function main(event, context, callback) {

  const params = {};
  params.RequestItems = {};
  params.RequestItems[process.env.ADVERTISEMENTS_TABLE_NAME] = {
    Keys: [
      { id: '1_42342342334_4' },
      { id: '1_42342342334_1' }
    ]
  };

  console.log(params);

  try {
    const result = await dynamoDbLib.call("batchGet", params);

    callback(null, success(result));

  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}