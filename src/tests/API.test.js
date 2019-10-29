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

test('Update maintenance', async() => {
  
  const id = "d85f4dd0-fa46-11e9-846b-c312a9693160"
  
})