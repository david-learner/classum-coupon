const DAY_MILLISECONDS = 86400000;
const DEFAULT_EXPIRE_DAY = 3 * DAY_MILLISECONDS;

export class Coupon {
    email: string;
    createdDate: Date;
    expiredDate: Date;
    used: boolean;

    constructor(email: string) {
        this.email = email;
        this.createdDate = new Date(Date.now());
        this.expiredDate = new Date(this.createdDate.getTime() + DEFAULT_EXPIRE_DAY);
        this.used = false;
    }

    getEmail(): string { return this.email }
    getCreatedDate(): Date { return this.createdDate }
    isUsed(): boolean { return this.used }
    toString(): string { return this.email + "\n" + this.createdDate + "\n" + this.expiredDate + "\n" + this.used }
}
