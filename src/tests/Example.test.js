import * as Example from '../Example';
const yenv = require('yenv')

// If tests running locally
if(!process.env.APP_NAME) {
	process.env.APP_NAME = yenv('env.yml', { env: 'default' }).APP_NAME
}

// test API endpoint

test('message function', async () => {
	let data = { time: 1, copy: `Your function in ${process.env.APP_NAME} executed successfully!`};
	let res = await Example.message(data);
	console.log(res.message)
	expect(res.message).toBe(data.copy)
});
