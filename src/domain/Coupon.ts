import CouponNumberGenerator from "./CouponNumberGenerator";
import CouponDto from "./CouponDto";

const DAY_MILLISECONDS = 86400000;
const DEFAULT_EXPIRE_DAY = 3 * DAY_MILLISECONDS;

export class Coupon {
    email: string;
    number: string;
    createdDate: Date;
    expiredDate: Date;
    used: boolean;

    constructor(email: string) {
        this.email = email;
        this.number = new CouponNumberGenerator().generate();
        this.createdDate = new Date(Date.now());
        this.expiredDate = new Date(this.createdDate.getTime() + DEFAULT_EXPIRE_DAY);
        this.used = false;
    }

    getEmail(): string { return this.email }
    getNumber(): string { return this.number }
    getCreatedDate(): Date { return this.createdDate }
    isUsed(): boolean { return this.used }
    toDto(): CouponDto { return new CouponDto(this.number, this.expiredDate) }
    toString(): string { return this.email + "\n" + this.number + "\n" + this.createdDate + "\n" + this.expiredDate + "\n" + this.used }
}
