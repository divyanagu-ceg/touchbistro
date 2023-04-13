const request = require("supertest");
const app = require('../index');

describe("test all endpoints", () => {
    afterEach(async () => {
        app.close();
      });
    it("test get median from primes below 10", async() => {
        const res = await request(app).get('/api/10');
        expect(res.status).toBe(200);
        const result = res.body.message;
        console.log(result);
        expect(result.length).toBe(2);
    });

    it("test get median from primes below 18", async() => {
        const res = await request(app).get('/api/18');
        expect(res.status).toBe(200);
        const result = res.body.message;
        expect(result.length).toBe(1);
        expect(result[0]).toBe(7);
    });

    it("test get median for invalid input", async() => {
        const res = await request(app).get('/api/abcd');
        expect(res.status).toBe(400);
        const result = res.body.message;
        expect(result).toBe('Not a number!');
    });
});