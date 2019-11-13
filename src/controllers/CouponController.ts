import { Request, Response } from "express";
import { Coupon } from "../domain/Coupon";
import db from "../model/Database";

/**
 * POST /
 * Coupons page.
 */
export const createCoupon = (req: Request, res: Response) => {
    const coupon = new Coupon(req.body.email);
    
    // 이미 쿠폰이 발급된 이메일인지 확인
    if (db.isExist(coupon.getEmail()) != null) {
        let errorMessage = {
            "message" : "이미 발급받은 사용자입니다"
        }
        return res.writeHead(404).end(JSON.stringify(errorMessage));
    }

    // 쿠폰 저장
    let jsonObject:object = JSON.parse(JSON.stringify(coupon));
    db.setData(coupon.getEmail(), jsonObject);

    let couponDto:string = JSON.stringify(coupon.toDto());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(couponDto),
        'content-type' : 'application/json'
    }).end(couponDto);
};
