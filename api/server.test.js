const request = require("supertest");
const server = require("./server");
const Users = require("../auth/auth-model")
const db = require("../database/dbConfig")

describe("server", () => {
  test("testing lib working", () => {
    expect(true).toBe(true);
  });
  describe("get requests", () => {
    test("get to users", async () => {
      const res = await request(server).get("/api/auth/users");
      expect(res.status).toBe(200);
    });
    test("get to dad jokes should fail w/o token", async () => {
        const res = await request(server).get("/api/jokes");
        expect(res.status).toBe(401);
      });
  });
  describe("post requests", () => {
    test("users can register", async () => {
        await Users.add({ username: "newUser", password: "bat123" })
        const users = await db("users")
        expect(users).toHaveLength(100)
    })
  })
});
