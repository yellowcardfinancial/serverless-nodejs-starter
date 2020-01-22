import enverify from './libs/verify-env';
import { failure, success } from './libs/response-lib';
import * as  Item from './modules/Item';

export async function saveItemInt(event, context) {
    isWarm(event.source);

    try {
        const body = JSON.parse(event.body);

        // Example: '/DEV/1/YELLOWCARD-COMMUNICATIONS-API/AFRICASTALKING_USERNAME'
        await enverify('/[STAGE]/[VERSION]/[VARIABLE_NAME]', process.env.VARIABLE_NAME);

        await Item.saveItem(body);
        console.log('SUCCESS');
        return success(await Item.saveItem(body));
    } catch (error) {
        console.log('ERROR: ', error);
        if (error.name === 'ERR_NO_VAR' || error.name === 'ERR_VAR_INVALID') error.message = 'Internal server error';
        delete error.name;
        return failure(error);
    }
    // All console.log() are logged to cloudwatch, and can be made to trigger alerts or caught by metric filters
};