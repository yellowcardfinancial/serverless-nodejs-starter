const AWS = require('aws-sdk');

export async function connect() { 
  const isTest = process.env.JEST_WORKER_ID;
  const config = {
    // convertEmptyValues: true,
    region: "us-east-1",
    ...(isTest && {
      endpoint: 'localhost:8000',
      sslEnabled: false,
      region: 'local-env',
    }),
  };
  return new AWS.DynamoDB.DocumentClient(config);
}

export async function call(action, table, options) {
  let dynamoDb = await connect();
  let params = buildParams(action, table, options);

  switch(action) {
    case 'put':
      return dynamoDb.put(params).promise().then(() => {
        return params.Item;
			});
      
    case 'get':
      return dynamoDb.get(params).promise();

    case 'update':
        return dynamoDb.update(params).promise().then((res) =>res.Attributes);
            
    case 'scan':
      return dynamoDb.scan(params).promise();
  
    default:
      throw 'No Action';
  }
}

//Generates valid Params for call to Dynamodb
export function buildParams(action, table, options) {
  switch(action) {

    case 'put':
      if(!options) { throw 'No Item' };
      return {
        TableName: table,
        Item: options
      }

    case 'get':
      if(!options.id) throw 'No ID';
      else return {
        TableName: table,
        Key: {
          id: options.id
        }
      }

    case 'scan':
      return {
        TableName: table,
      }
      
    case 'update':
      return {
        TableName: table,
        Key: options.key,
        UpdateExpression: options.updateExpression,
        ExpressionAttributeValues: options.expressionAttributeValues,
        ExpressionAttributeNames: options.expressionAttributeNames,
        ReturnValues:"UPDATED_NEW"
      }
    
    default:
        throw 'No Action';
  }
}

export function buildOptions(key, body){
	const entries = Object.entries(body);
	let expressionAttributeValues = {};
	let expressionAttributeNames = {};
	let updateExpression = "SET ";
	for (const [key, value] of entries) {
    if(key == 'id') continue;
    updateExpression += `#${key} = :${key}, `;
    expressionAttributeNames[`#` + key] = key;
		expressionAttributeValues[':' + key] = value;
	}
	updateExpression = updateExpression.slice(0, -2);

  let options = {key, updateExpression, expressionAttributeNames, expressionAttributeValues};
	return options;
}
