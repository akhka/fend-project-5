import 'babel-polyfill';
const {app} = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);


describe('Endpoint test', () => {
    it('/test', async (done) => {
      const response = await request.get('/test');
      expect(response.status).toEqual(200);
      done();
    });
  });