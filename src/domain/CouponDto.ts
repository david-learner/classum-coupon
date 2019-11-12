export default class CouponDto {
    number: string;
    expiredDate: Date;

    constructor(number: string, expiredDate: Date) {
        this.number = number;
        this.expiredDate = expiredDate;
    }
}