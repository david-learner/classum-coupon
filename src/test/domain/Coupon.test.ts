import * as mocha from 'mocha';
import * as chai from 'chai';
import CouponNumberGenerator from '../../domain/CouponNumberGenerator';

let expect = chai.expect;
var assert = require("assert");

describe('리턴값확인', function() {
    it('null인지', () => {
        let generator = new CouponNumberGenerator();
        let numbers = generator.generate("email");
        expect(numbers).equal("null");
    });
});
