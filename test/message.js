const mongoose = require("mongoose");
const Message = require('../models/Message');
let chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Messages', () => {
  let accessToken = '';
  beforeEach((done) => { //Before each test we empty the database
    Message.deleteMany({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/POST Login', () => {
    it('it should login a user', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(
          {"phoneNumber":"0723255128",
        "password":"Amondi95!"})
        .end((err, res) => {
          res.should.have.status(200);
          accessToken = res.body.accessToken;
          done();
        });
    });
  });

  describe('/GET messages', () => {
    it('it should GET all the messages without creating', (done) => {
      chai.request(server)
        .get('/api/message').set("authorization", `Bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/GET messages', () => {
    it('it should GET all the messages without token', (done) => {
      chai.request(server)
        .get('/api/message')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Invalid token');
          done();
        });
    });
  });
});
