"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DAY_MILLISECONDS = 86400000;
const DEFAULT_EXPIRE_DAY = 3 * DAY_MILLISECONDS;
class Coupon {
    constructor(email) {
        this.email = email;
        this.createdDate = new Date(Date.now());
        this.expiredDate = new Date(this.createdDate.getTime() + DEFAULT_EXPIRE_DAY);
        this.used = false;
    }
    getEmail() { return this.email; }
    getCreatedDate() { return this.createdDate; }
    isUsed() { return this.used; }
    toString() { return this.email + "\n" + this.createdDate + "\n" + this.expiredDate + "\n" + this.used; }
}
exports.Coupon = Coupon;
