import CouponNumberGenerator from "./CouponNumberGenerator";
import CouponDto from "./CouponDto";
import moment from "moment-timezone";


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

    isExpired(): boolean {
        let now:Date = new Date();
        // ISO format(UTC를 ISO8601 형태로 지정)
        // firestore에 저장될 때 ISO포맷으로 저장, 프론트에서 사용자의 timezone에 맞게 변환 출력
        let expiredDateWithOffset:Date = new Date(this.expiredDate);
        console.log("now: " + now + " expiredDateWithOffset : " + expiredDateWithOffset);
        if (expiredDateWithOffset < now) {
            return true;
        }
        return false;
    }
    use(): void { this.used = true };
    getEmail(): string { return this.email }
    getNumber(): string { return this.number }
    getCreatedDate(): Date { return this.createdDate }
    getExpiredDate(): Date { return this.expiredDate }
    isUsed(): boolean { return this.used }
    toDto(): CouponDto { return new CouponDto(this.number, this.expiredDate) }
    toString(): string { return this.email + "\n" + this.number + "\n" + this.createdDate + "\n" + this.expiredDate + "\n" + this.used }
}
