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
        let alphanumeric:string = generator.getRandomAlphanumeric(CouponNumberGenerator.DEFAULT_SIZE);
        expect(true).equals(generator.isAlphanumeric(alphanumeric));
    });

    it('생성된 번호가 숫자만 있을 때', () => {
        let alphanumeric:string = "1234567890123456";
        expect(false).equals(generator.isAlphanumeric(alphanumeric));
    });

    it('생성된 번호가 문자만 있을 때', () => {
        let alphanumeric:string = "ABCEDFGhijklmnop";
        expect(false).equals(generator.isAlphanumeric(alphanumeric));
    });
});
