import { success, created, failure, badRequest, forbidden, notFound } from '../Res'

describe('Test Responses', () => {
  it('Success', () => {
    let res = success({'help me': 'pls'});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("{\"help me\":\"pls\"}");
  })
  it('Created', () => {
    let res = created({'help me': 'pls'});
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual("{\"help me\":\"pls\"}");
  })
 it('badRequest', () => {
    let res = badRequest({'help me': 'pls'});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("{\"help me\":\"pls\"}");
  })
  it('forbidden', () => {
    let res = forbidden({'help me': 'pls'});
    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual("{\"help me\":\"pls\"}");
  })
  it('notFound', () => {
    let res = notFound({'help me': 'pls'});
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual("{\"help me\":\"pls\"}");
  })
  it('Failure', () => {
    let res = failure({'help me': 'pls'});
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual("{\"help me\":\"pls\"}");
  })
})