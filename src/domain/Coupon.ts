import CouponNumberGenerator from "./CouponNumberGenerator";
import CouponDto from "./CouponDto";
import moment from "moment-timezone";


const DAY_MILLISECONDS = 86400000;
const DEFAULT_EXPIRE_DAY = 3 * DAY_MILLISECONDS;

export class Coupon {
    private _email: string;
    private _number: string;
    private _createdDate: Date;
    private _expiredDate: Date;
    private _used: boolean;

    constructor(email: string) {
        this._email = email;
        this._number = new CouponNumberGenerator().generate();
        this._createdDate = new Date(Date.now());
        this._expiredDate = new Date(this._createdDate.getTime() + DEFAULT_EXPIRE_DAY);
        this._used = false;
    }

    
    public get email(): string { return this._email };
    public set email(email: string) { this._email = email };
    public get number(): string { return this._number };
    public set number(number: string) { this._number = number };
    public get createdDate(): Date { return this._createdDate };
    public set createdDate(createdDate: Date) { this._createdDate = createdDate };
    public get expiredDate(): Date { return this._expiredDate };
    public set expiredDate(expiredDate: Date) { this._expiredDate = expiredDate };

    isExpired(): boolean {
        // ISO format(UTC를 ISO8601 형태로 지정)
        // firestore에 저장될 때 ISO포맷으로 저장, 프론트에서 사용자의 timezone에 맞게 변환 출력
        let now:Date = new Date();
        let expiredDateWithOffset:Date = new Date(this._expiredDate);
        console.log("now: " + now + " expiredDateWithOffset : " + expiredDateWithOffset);
        if (expiredDateWithOffset < now) {
            return true;
        }
        return false;
    }
    use(): void { this._used = true };
    isUsed(): boolean { return this._used }
    toDto(): CouponDto { return new CouponDto(this._number, this._expiredDate) }
    toString(): string { return this._email + "\n" + this._number + "\n" + this._createdDate + "\n" + this._expiredDate + "\n" + this._used }
}
