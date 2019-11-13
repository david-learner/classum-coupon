import { Request, Response } from "express";
import { Coupon } from "../domain/Coupon";
import db from '../config/firebaseInit';

/**
 * POST /
 * Coupons page.
 */
export const createCoupon = (req: Request, res: Response) => {
    const coupon = new Coupon(req.body.email);

    // collection, document 정확하게 알고 데이터 저장하기
    // let data = {
    //     email: "test@gmail.com"
    // }
    // db.collection('coupons').doc(coupon.getNumber()).set(data);

    let couponData = JSON.stringify(coupon.toDto());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(couponData),
        'content-type' : 'application/json'
    }).end(couponData);
};

// export const 