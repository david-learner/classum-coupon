import request from "supertest";
import nock from "nock";
import app from "../../app";
import { expect } from "chai";
import { Coupon } from "../../domain/Coupon";

describe("Index", () => {
    it("GET / return 200", function (done) {
        request(app).get("/")
            .expect(200).then(res => done()).catch(err => done(err));
    });
});

describe("Mokcing /api/coupons", () => {
    it("POST 신규 쿠폰 발행", (done) => {
        let email: string = "classum@gmail.com";
        let dummyCoupon = new Coupon(email);
        let dummyCouponDto = dummyCoupon.toDto();

        nock("http://localhost:3000")
            .post("/api/coupons", { email: email })
            .reply(200, { _number: dummyCouponDto.number, _expiredDate: dummyCouponDto.expiredDate })

        request("http://localhost:3000").post("/api/coupons")
            .send({ email: "classum@gmail.com" })
            .end(function (err, res) {
                expect(res.status).equal(200);
                expect(res.body._number).exist;
                expect(res.body._expiredDate).exist;
                done();
            });
    });
});

describe("/api/coupons", () => {
    it("GET 이미 발급받은 이메일", (done) => {
        request(app).get("/api/coupons")
            .query({ email: "classum@gmail.com" })
            .expect(200, function (err, res) {
                expect(res.body._number).exist;
                expect(res.body._expiredDate).exist;
                done();
            });
    });

    it("POST 이미 발급받은 이메일", () => {
        return request(app).post("/api/coupons")
            .send({ email: "classum@gmail.com" })
            .expect(404);
    });
});

describe("GET /notfound", () => {
    it("404 NOT_FOUND", () => {
        return request(app).get("/notfound")
            .expect(404);
    });
});
