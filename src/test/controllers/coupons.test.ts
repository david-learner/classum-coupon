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
    it("GET 조회 - 이미 발급받은 이메일", (done) => {
        request(app).get("/api/coupons")
            .query({ email: "classum@gmail.com" })
            .expect(200, function (err, res) {
                expect(res.body._number).exist;
                expect(res.body._expiredDate).exist;
                done();
            });
    });

    it("POST 발급 - 이미 발급받은 이메일", () => {
        return request(app).post("/api/coupons")
            .send({ email: "classum@gmail.com" })
            .expect(404);
    });
});

describe("/api/coupons/use", () => {
    it("POST 정상적인 쿠폰 사용", () => {
        nock("http://localhost:3000")
            .post("/api/coupons/use", { couponNumber : "ABCD1234EFGH5678" })
            .reply(200);

        return request("http://localhost:3000").post("/api/coupons/use")
            .send({ couponNumber: "ABCD1234EFGH5678" })
            .expect(200);
    });

    it("POST 미발급된 쿠폰", (done) => {
        request(app).post("/api/coupons/use")
            .send({ couponNumber: "unCREATEDC0UP0N1" })
            .end(function(err, res) {
                expect(res.status).equal(404);
                let message = JSON.parse(res.text);
                expect(message.message).equal("발급되지 않은 쿠폰 번호입니다");
                done();
            });
    });

    it("POST 만료된 쿠폰 사용", (done) => {
        request(app).post("/api/coupons/use")
            .send({ couponNumber: "3Z2G2s1N3Qm1b221" })
            .end(function(err, res) {
                expect(res.status).equal(400);
                let message = JSON.parse(res.text);
                expect(message.message).equal("쿠폰 사용기한이 지났습니다");
                done();
            });
    });

    it("POST 이미 사용된 쿠폰", (done) => {
        request(app).post("/api/coupons/use")
            .send({ couponNumber: "2O3J2x3P3f1w2920" })
            .end(function(err, res) {
                expect(res.status).equal(400);
                let message = JSON.parse(res.text);
                expect(message.message).equal("이미 사용된 쿠폰입니다");
                done();
            });
    });
});

describe("GET /notfound", () => {
    it("404 NOT_FOUND", () => {
        return request(app).get("/notfound")
            .expect(404);
    });
});
