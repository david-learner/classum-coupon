import * as chai from 'chai';
import { Coupon } from '../../domain/Coupon';

let expect = chai.expect;

describe('쿠폰', function() {
    let email = "classum@gmail.com";
    let coupon;
    it('사용된 쿠폰', () => {
        coupon = new Coupon(email);
        coupon.use();
        expect(coupon.isUsed()).equal(true);
    });

    it('사용기한이 만료된 쿠폰', () => {
        coupon = new Coupon(email);
        coupon.createdDate = new Date('2019-11-10T10:15:21.903Z');
        coupon.expiredDate = new Date('2019-11-13T10:15:21.903Z');
        expect(coupon.isExpired()).equal(true);
    });

    it('쿠폰 사용 기간은 3일', () => {
        coupon = new Coupon(email);
        expect(coupon.expiredDate.getTime() - coupon.createdDate.getTime()).equal(259200000);
    });
});
