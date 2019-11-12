"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = require("../domain/Coupon");
/**
 * POST /
 * Coupons page.
 */
exports.createCoupon = (req, res) => {
    const coupon = new Coupon_1.Coupon(req.body.email);
    // console.log(coupon.toString());
    let serialized = JSON.stringify(coupon);
    console.log(serialized);
    console.log(JSON.parse(serialized));
    res.send(req.body.email);
};
