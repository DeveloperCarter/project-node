process.env.NODE_ENG = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let testInvoice;
beforeEach(async () => {
  let result = await db.query(
    `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date) VALUES ('googl','2000', 't', '2021-09-07', '2021=09-08') RETURNING id, comp_code, amt, paid`
  );
  testInvoice = result.rows[0];
});

afterEach(async () => {
  let result2 = await db.query(`DELETE FROM invoices`);
});

afterAll(async () => {
  await db.end();
});
