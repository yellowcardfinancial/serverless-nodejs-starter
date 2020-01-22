const AWS = require('aws-sdk');
import * as Item from '../../modules/Item';

let testConnection;

beforeAll(async () => {
  await sleep(1000);

  testConnection = new AWS.DynamoDB.DocumentClient({
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  });

  await testConnection.put({
      TableName: 'yellowcard-item-dev',
      Item: {
        id: 'r6798y7ty-98y7ty-098y7t6r',
        maintenance: false
      }
    })
    .promise();
});

describe('Item tests', () => {
  test('should get item', async () => {
    const id = 'r6798y7ty-98y7ty-098y7t6r';
    const item = await Item.getItem(id);
    expect(item).toBeTruthy();
    expect(item.id).toEqual(id);
  });
});

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}