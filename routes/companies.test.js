process.env.NODE_ENG = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach(async () => {
  let result = await db.query(
    `INSERT INTO companies (code, name, description) VALUES ('googl', 'Google', 'Fortune 500 tech company') RETURNING code, name, description`
  );
  testCompany = result.rows[0];
});

afterEach(async () => {
  let result = await db.query(`DELETE FROM companies`);
});

describe("GET /companies", () => {
  test("returns all companies", async () => {
    const response = request(app).get("/companies");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ companies: [testCompany] });
  });
});

afterAll(async () => {
  await db.end();
});
