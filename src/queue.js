import enverify from './libs/verify-env';
import { failure, success } from './libs/response-lib';
import * as  Item from './modules/Item';

export const queue = async (event, context) => {
    let body = JSON.parse(event.Records[0].body || event);
    try {
        const { action } = body;

        switch (action) {
            case 'saveItem':
                // Example: '/DEV/1/YELLOWCARD-COMMUNICATIONS-API/AFRICASTALKING_USERNAME'
                await enverify('/[STAGE]/[VERSION]/[VARIABLE_NAME]', process.env.VARIABLE_NAME);

                await Item.saveItem(body);
                console.log('SUCCESS');
                return success(true);

            default:
                console.log('INVALID ACTION');
                break;
        }
    } 
    
    catch (error) {
        console.error('ERROR: ', error);
        return failure(error);
    }
    // All console.log() are logged to cloudwatch, and can be made to trigger alerts or caught by metric filters
};