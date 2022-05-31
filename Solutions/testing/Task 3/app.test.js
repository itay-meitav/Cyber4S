const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

it("making a request to the server", () => {
  return request.get("/").then((res) => {
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello, world!");
  });
});
