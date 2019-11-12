import { Request, Response } from "express";
import { Coupon } from "../domain/Coupon";

/**
 * POST /
 * Coupons page.
 */
export const createCoupon = (req: Request, res: Response) => {
    const coupon = new Coupon(req.body.email);
    let couponData = JSON.stringify(coupon.toDto());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(couponData),
        'content-type' : 'application/json'
    }).end(couponData);

};

// export const 