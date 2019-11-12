import request from "supertest";
import app from "../../app";
import { expect } from "chai";

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/")
            .expect(200);
    });
});

describe("POST /coupons", () => {
    it("should return 200 OK with json data [number, expiredDate]", (done) => {
        request(app).post("/coupons")
            .field("email", "classum@gmail.com")
            .expect(200)
            .end(function(err, res) {
                expect(res.body.number).exist;
                expect(res.body.expiredDate).exist;
                done();
            });
    });
});

describe("GET /notexist", () => {
    it("should return 404 NOT_FOUND", () => {
        return request(app).get("/notfound")
            .expect(404);
    });
});
