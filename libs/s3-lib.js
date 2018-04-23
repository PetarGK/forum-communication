import AWS from './xray-lib'

const s3 = new AWS.S3();

export function put(params) {
    return s3.putObject(params).promise();
}