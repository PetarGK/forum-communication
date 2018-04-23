var AWSXRay = require('aws-xray-sdk-core');
var rules = {
  "default": { "fixed_target": 1, "rate": 0.01 },
  "version": 1
  }

AWSXRay.middleware.setSamplingRules(rules);

var AWS = AWSXRay.captureAWS(require('aws-sdk'));

AWS.config.update({ region: process.env.AWS_REGION });

export default AWS