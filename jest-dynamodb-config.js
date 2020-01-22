module.exports = {
    tables: [{
            TableName: `yellowcard-item-dev`,
            KeySchema: [{
                AttributeName: 'id',
                KeyType: 'HASH'
            }],
            AttributeDefinitions: [{
                AttributeName: 'id',
                AttributeType: 'S'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
        },
        // etc
    ],
    port: 8000
};