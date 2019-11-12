import * as mocha from 'mocha';
import * as chai from 'chai';
import CouponNumberGenerator from '../../domain/CouponNumberGenerator';

let expect = chai.expect;
var assert = require("assert");

describe('쿠폰번호생성', function() {
    it('생성된 번호가 존재하는지', () => {
        let generator = new CouponNumberGenerator();
        let numbers = generator.generate("email");
        expect(numbers).equal("ABCD1234EFGH5678");
    });
});
