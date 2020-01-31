const request = require("supertest");
const server = require("./server");
const Users = require("../auth/auth-model");
const db = require("../database/dbConfig");
const { jwtSecret } = require("../auth/secret")
const jwt = require("jsonwebtoken")

describe("server", () => {
  test("testing lib working", () => {
    expect(true).toBe(true);
  });
  describe("get requests", () => {
    test("get to users receives 200", async () => {
      const res = await request(server).get("/api/auth/users");
      expect(res.status).toBe(200);
    });
    test("get to dad jokes should fail w/o token", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(401);
    });
    test.skip("get to dad jokes should pass w token", async () => {
        const requestOptions = {
            headers: { accept: 'application/json' },
          };
        const newUser = await Users.add({ username: "joshs", password: "pass"})
        const login = await request(server).post("/api/auth/login", newUser)
        signToken(newUser)
        const jokes = await request(server).get("/api/jokes", requestOptions);
        console.log("new user", newUser)
        console.log("login",login)
        expect(jokes.status).toBe(200);
      });
  });
  describe("post requests", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    test("users can register", async () => {
      await Users.add({ username: "newUser", password: "bat123" });
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
  });
});

function signToken(user){
    const payload = { user }
    const options = { expiresIn: "12h"}
    return jwt.sign(payload, jwtSecret, options)
  }