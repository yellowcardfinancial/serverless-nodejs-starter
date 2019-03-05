import * as api from '../API';

// test API endpoint

test('hello', async () => {
  const event = 'event';
  const context = 'context';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe("string");
  };

  await api.hello(event, context, callback);
});
