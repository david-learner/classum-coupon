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
        // 0-9, a-z, A-Z를 하나 이상씩 포함하는 문자열
        // let alphanumericRegExp = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{16,16}");
        // return alphanumericRegExp.test(randomAlphanumeric);

        let digit:boolean = false;
        let lower:boolean = false;
        let upper:boolean = false;
        
        let characters:string[] = randomAlphanumeric.split("");
        characters.forEach(character => {
            // 0-9
            if (!digit && (character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57)) {
                digit = true;
            }
            // A-Z
            if (!lower && (character.charCodeAt(0) >= 65 && character.charCodeAt(0) <= 90)) {
                lower = true;
            }
            // a-z
            if (!upper && (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122)) {
                upper = true;
            }
        });
        if (digit && lower && upper) {
            return true;
        }
        return false;
    }
}  