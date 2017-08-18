import supertest = require("supertest");
import { server } from "./../../../server";

describe("/GET users", () => {
  it("it should GET all users", (done) => {
    supertest(server).get("/api/users")
    .set("Content-Type", "application/json")
    .expect(200)
    .end((err, res) => {
      expect(err).toEqual(null);
      expect(res.body.error).toBe(undefined);
      expect(res.body.users).toBeDefined();
      done();
    });
  });

  it("should get single user", (done) => {
    supertest(server).get("/api/users/1")
    .set("Content-Type", "application/json")
    .expect(200)
    .end((err, res) => {
      expect(err).toEqual(null);
      expect(res.body.error).toBe(undefined);
      expect(res.body).toBeDefined();
      expect(res.body.id).toBe(1);
      done();
    });
  });

  it("should get single user via url", (done) => {
    supertest("http://localhost:8080").get("/api/users/1")
    .set("Content-Type", "application/json")
    .expect(200)
    .end((err, res) => {
      expect(err).toEqual(null);
      expect(res.body.error).toBe(undefined);
      expect(res.body).toBeDefined();
      expect(res.body.id).toBe(1);
      done();
    });
  });
});
