import * as crypto from 'crypto';
import * as bases from 'bases';

export default class CouponNumberGenerator {
    static DEFAULT_SIZE: number = 16;
    /**
     * generate
     */
    public generate(): string {
        let randomAlphanumeric: string = "";
        do {
            randomAlphanumeric = this.getRandomAlphanumeric(CouponNumberGenerator.DEFAULT_SIZE);
        } while (!this.isAlphanumeric(randomAlphanumeric));
        return randomAlphanumeric;
    }

    public getRandomAlphanumeric(size: number): string {
        let bytes = crypto.randomBytes(size);
        let encoded: string[] = new Array(size);
        for (let i: number = 0; i < encoded.length; i++) {
            encoded[i] = bases.toBase(bytes[i], 62);
        }
        return encoded.join("").substring(0, size);
    }

    public isAlphanumeric(randomAlphanumeric: string): boolean {
        let alphanumericRegExp = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{16,16}");
        return alphanumericRegExp.test(randomAlphanumeric);
    }
}  