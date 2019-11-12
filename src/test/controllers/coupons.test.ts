import request from "supertest";
import app from "../../app";
import { expect } from "chai";

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/")
            .expect(200);
    });
});

describe("GET /notexist", () => {
    it("should return 404 NOT_FOUND", () => {
        return request(app).get("/notexist")
            .expect(404);
    });
});