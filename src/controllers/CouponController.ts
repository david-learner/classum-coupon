import { Request, Response } from "express";
import { Coupon } from "../domain/Coupon";
import db from '../config/firebaseInit';

/**
 * POST /
 * Coupons page.
 */
export const createCoupon = async (req: Request, res: Response) => {
    let email: string = req.body.email;
    let document = await db.collection("coupons").doc(email).get();
    // check already used email
    if (document.exists) {
        let errorMessage = {
            "message": "이미 발급받은 이메일입니다"
        }
        return res.writeHead(404).end(JSON.stringify(errorMessage));
    }

    // generate new coupon and save to firestore
    let coupon = new Coupon(email);
    console.log(coupon.toString());
    let jsonObject: object = JSON.parse(JSON.stringify(coupon));
    db.collection('coupons').doc(coupon.getEmail()).set(jsonObject);

    // build response
    let couponDto: string = JSON.stringify(coupon.toDto());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(couponDto),
        'content-type': 'application/json'
    }).end(couponDto);
};

export const readCoupon = async (req: Request, res: Response) => {
    let email: string = req.query.email;

    let document = await db.collection("coupons").doc(email).get();
    if (!document.exists) {
        let errorMessage = {
            "message": "해당 이메일로 발급받은 쿠폰이 없습니다"
        }
        return res.writeHead(404).end(JSON.stringify(errorMessage));
    }

    let savedCouponJson = JSON.parse(JSON.stringify(document.data()))
    let savedCoupon: Coupon = Object.assign(new Coupon(savedCouponJson.email), savedCouponJson);

    console.log(savedCoupon.toString());

    // build response
    let couponDto: string = JSON.stringify(savedCoupon.toDto());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(couponDto),
        'content-type': 'application/json'
    }).end(couponDto);
};

export const useCoupon = async (req: Request, res: Response) => {
    let couponNumber: string = req.body.couponNumber;

    let documents = await db.collection("coupons").where("number", "==", couponNumber).get();
    if (documents.empty) {
        return res.writeHead(404).end(JSON.stringify({"message": "발급되지 않은 쿠폰 번호입니다"}));
    }

    if (documents.size > 1) {
        return res.writeHead(400).end(JSON.stringify({"message": "중복된 쿠폰 번호가 존재합니다 관리자에게 문의하세요"}));
    }

    let document = documents.docs[0];
    let savedCouponJson = JSON.parse(JSON.stringify(document.data()))
    let savedCoupon: Coupon = Object.assign(new Coupon(savedCouponJson.email), savedCouponJson);
    if (savedCoupon.isExpired()) {
        return res.writeHead(400).end(JSON.stringify({"message": "쿠폰 사용기한이 지났습니다"}));
    }
    if (savedCoupon.isUsed()) {
        return res.writeHead(400).end(JSON.stringify({"message": "이미 사용된 쿠폰 번호입니다"}));
    }
    savedCoupon.use();

    let docRef = db.collection("coupons").doc(savedCoupon.getEmail());
    await docRef.get().then(function(document) {
        if (document.exists) {
            let updatedCouponJson = JSON.parse(JSON.stringify(savedCoupon));
            docRef.update(updatedCouponJson);
        }
    })
    
    let responseForUsedCoupon = { used : savedCoupon.isUsed() };
    res.status(200).send(JSON.stringify(responseForUsedCoupon));
    // let document = await db.collection("coupons").doc(email).get();
    // if (!document.exists) {
    //     let errorMessage = {
    //         "message": "해당 이메일로 발급받은 쿠폰이 없습니다"
    //     }
    //     return res.writeHead(404).end(JSON.stringify(errorMessage));
    // }

    // let savedCouponJson = JSON.parse(JSON.stringify(document.data()))
    // let savedCoupon: Coupon = Object.assign(new Coupon(savedCouponJson.email), savedCouponJson);

    // // build response
    // let couponDto: string = JSON.stringify(savedCoupon.toDto());
    // res.writeHead(200, {
    //     'Content-Length': Buffer.byteLength(couponDto),
    //     'content-type': 'application/json'
    // }).end(couponDto);
};