const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynObj = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.upload = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const eventType = record.eventName;
    const eventTime = record.eventTime;

    const params = {
      TableName: 'minibox',
      Item: {
        "id" : uuid.v1(),
        "fileName" : filename,
        "Type" : eventType,
        "Time" : eventTime
      }
    }

    dynObj.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("data uploaded")
    })

  });
};



