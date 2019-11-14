import * as mocha from 'mocha';
import * as chai from 'chai';
import * as crypto from 'crypto';
import * as bases from 'bases';

import CouponNumberGenerator from '../../domain/CouponNumberGenerator';

let expect = chai.expect;
var assert = require("assert");

describe('쿠폰번호생성', function() {
    let generator = new CouponNumberGenerator();

    it('생성된 번호가 16자리인가', () => {
        let couponNumber:string = generator.generate();
        expect(couponNumber.length).equal(16);
    });

    it('생성된 번호가 정상적인 alphanumeric일 때', () => {
        let randomAlphanumeric:string = generator.getRandomAlphanumeric(CouponNumberGenerator.DEFAULT_SIZE);
        console.log('generated ' + randomAlphanumeric);
        expect(true).equals(generator.isAlphanumeric(randomAlphanumeric));
    });

    it('생성된 번호가 숫자만 있을 때', () => {
        let randomAlphanumeric:string = "1234567890123456";
        expect(false).equals(generator.isAlphanumeric(randomAlphanumeric));
    });

    it('생성된 번호가 문자만 있을 때', () => {
        let randomAlphanumeric:string = "ABCEDFGhijklmnop";
        expect(false).equals(generator.isAlphanumeric(randomAlphanumeric));
    });

    it('생성된 번호가 숫자, 소문자만 있을 때', () => {
        let randomAlphanumeric:string = "1j2d113k2c1z4732";
        expect(false).equals(generator.isAlphanumeric(randomAlphanumeric));
    });

    it('생성된 번호가 숫자, 대문자만 있을 때', () => {
        let randomAlphanumeric:string = "1J2D113K2C1Z4732";
        expect(false).equals(generator.isAlphanumeric(randomAlphanumeric));
    });

    it('날짜', () => {
        let now = new Date();
        let expiredDate = new Date('November 12, 2019 23:15:30');
        
        console.log(now);
        console.log(expiredDate);
        console.log(expiredDate < now);
    })
});
