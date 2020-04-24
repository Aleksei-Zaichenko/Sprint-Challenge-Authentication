const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("POST /api/auth", function () {
  describe("/register", function () {

    beforeEach(async () => {
      await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it("should return 201", function () {
      // make a POST request to /register endpoint on the server
      return request(server)
        .post("/api/auth/register")
        .send({username: 'Briana', password: 'No'})
        .then(res => {
          // assert that the HTTP status code is 201
          expect(res.status).toBe(201);
        });
    });

    it("should return 201", function () {
      // make a POST request to /register endpoint on the server
      return request(server)
        .post("/api/auth/register")
        .send({username: 'Briana', password: 'No'})
        .then(res => {
          // assert that the HTTP status code is 201
          expect(res.body.message).toBe('New user was added successfully');
        });
    });
  });

  describe("/login", function () {

    it("provided right credentials, should return status code: 200", function () {
      // make a POST request to /register endpoint on the server
      const user ={username: 'Briana', password: 'No'}

      return request(server)
        .post("/api/auth/login")
        .send(user)
        .then(res => {
          // assert that the HTTP status code is 201
          expect(res.status).toBe(200);
        });
    });

    it("provided wrong credentials, should return status code: 401", function () {
      // make a POST request to /register endpoint on the server
      return request(server)
        .post("/api/auth/login")
        .send({username: 'Briana', password: 'Yes'})
        .then(res => {
          // assert that the HTTP status code is 201
          expect(res.status).toBe(401);
        });
    });
  });
})