import AWS from './xray-lib'

const sns = new AWS.SNS();

export function publish(message, topicArn) {
  
  return sns.publish({
    Message: JSON.stringify(message),
    TopicArn: topicArn
  }).promise();
}