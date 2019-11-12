import { Request, Response } from "express";
import { Coupon } from "../domain/Coupon";

/**
 * POST /
 * Coupons page.
 */
export const createCoupon = (req: Request, res: Response) => {
    const coupon = new Coupon(req.body.email);
    // console.log(coupon.toString());
    let serialized = JSON.stringify(coupon);
    console.log(serialized);
    console.log(JSON.parse(serialized));
    res.send(req.body.email);
};
