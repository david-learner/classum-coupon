import request from "supertest";
import nock from "nock";
import app from "../../app";
import { expect } from "chai";
import { Coupon } from "../../domain/Coupon";

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

    it("GET 이메일로 쿠폰 조회", (done) => {
        let email: string = "made@gmail.com";

        request(app).get("/api/coupons")
            .query({ email: email })
            .end(function (err, res) {
                expect(res.status).equal(200);
                expect(res.body._number).exist;
                expect(res.body._expiredDate).exist;
                done();
            });
    });

    it("GET 쿠폰번호로 쿠폰 조회", (done) => {
        let couponNumber: string = "P3o7jGB1F3y3Au2H";

        request(app).get("/api/coupons")
            .query({ couponNumber: couponNumber })
            .end(function (err, res) {
                expect(res.status).equal(200);
                expect(res.body._email).exist;
                expect(res.body._number).exist;
                expect(res.body._createdDate).exist;
                expect(res.body._expiredDate).exist;
                expect(res.body._used).exist;
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

    it("GET 조회 - 발급받지 않은 이메일", (done) => {
        request(app).get("/api/coupons")
            .query({ email: "unregistered@gmail.com" })
            .expect(404, function (err, res) {
                let message = JSON.parse(res.text);
                expect(message.message).equal("해당 이메일로 발급받은 쿠폰이 없습니다");
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
            .post("/api/coupons/use", { couponNumber: "ABCD1234EFGH5678" })
            .reply(200);

        return request("http://localhost:3000").post("/api/coupons/use")
            .send({ couponNumber: "ABCD1234EFGH5678" })
            .expect(200);
    });

    it("POST 미발급된 쿠폰", (done) => {
        request(app).post("/api/coupons/use")
            .send({ couponNumber: "unCREATEDC0UP0N1" })
            .end(function (err, res) {
                expect(res.status).equal(404);
                let message = JSON.parse(res.text);
                expect(message.message).equal("발급되지 않은 쿠폰 번호입니다");
                done();
            });
    });

    it("POST 만료된 쿠폰 사용", (done) => {
        request(app).post("/api/coupons/use")
            .send({ couponNumber: "462M30o447422a17" })
            .end(function (err, res) {
                expect(res.status).equal(400);
                let message = JSON.parse(res.text);
                expect(message.message).equal("쿠폰 사용기한이 지났습니다");
                done();
            });
    });

    it("POST 이미 사용된 쿠폰", (done) => {
        request(app).post("/api/coupons/use")
            .send({ couponNumber: "2w2Vg2Qj1D171K3v" })
            .end(function (err, res) {
                expect(res.status).equal(400);
                let message = JSON.parse(res.text);
                expect(message.message).equal("이미 사용된 쿠폰입니다");
                done();
            });
    });
});
