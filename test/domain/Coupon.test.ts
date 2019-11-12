import * as mocha from 'mocha';
import * as chai from 'chai';
import CouponNumberGenerator from '../../src/domain/CouponNumberGenerator';

var assert = require("assert");

describe('리턴값확인', function() {
    it('null인지', () => {
        let generator = new CouponNumberGenerator();
        let numbers = generator.generate("email");
        chai.expect(numbers).equal("null");
    });
});