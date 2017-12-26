import supertest = require("supertest");
import { app } from "./../../../app";

describe("/GET users", () => {
  it("it should GET all users", (done) => {
    supertest(app).get("/api/users")
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
    supertest(app).get("/api/users/1")
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

  describe("users auth section", () => {
    let token = "";
    beforeEach((done) => {
      supertest(app)
        .post("/api/login")
        .set("Content-Type", "application/json")
        .send({ username: "Antonette", email: "Shanna@melissa.tv" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("should get single user full info", (done) => {
      supertest(app).get("/api/users/1/info")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
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
});
