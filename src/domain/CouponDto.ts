export default class CouponDto {
    private _number: string;
    private _expiredDate: Date;

    constructor(number: string, expiredDate: Date) {
        this._number = number;
        this._expiredDate = expiredDate;
    }

    public get number() {
        return this._number;
    }

    public get expiredDate() {
        return this._expiredDate;
    }
}