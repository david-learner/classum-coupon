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
        let number: string[] = new Array(size);

        const digit: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const lower: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const upper: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        let digitStorage: string[] = new Array(5);
        let lowerStorage: string[] = new Array(5);
        let upperStorage: string[] = new Array(6);

        for (let i = 0; i < digitStorage.length; i++) {
            let digitRandom = Math.floor(Math.random() * digit.length);
            digitStorage[i] = digit[digitRandom];
        }

        for (let i = 0; i < lowerStorage.length; i++) {
            let digitRandom = Math.floor(Math.random() * lower.length);
            lowerStorage[i] = lower[digitRandom];
        }

        for (let i = 0; i < upperStorage.length; i++) {
            let digitRandom = Math.floor(Math.random() * upper.length);
            upperStorage[i] = upper[digitRandom];
        }

        let merged: string[] = digitStorage.concat(lowerStorage, upperStorage);

        let randomNumbers: number[] = Array.apply(null, new Array(size)).map(Number.prototype.valueOf, -1);

        while(this.isDuplicate(randomNumbers, -1)) {
            for(let i = 0; i < randomNumbers.length; i++) {
                let random:number;
                do {
                    random = Math.floor(Math.random() * size); // 0-15;
                }
                while(this.isDuplicate(randomNumbers, random));
                randomNumbers[i] = random;
            }
        }

        for(let i = 0; i < number.length; i++) {
            number[i] = merged[randomNumbers[i]];
        }
        
        return number.join("").substring(0, size);
    }

    private isDuplicate(pool:number[], target:number):boolean {
        for(let i = 0; i<pool.length; i++) {
            if (pool[i] == target) {
                return true;
            }
        }
        return false;
    }

    public isAlphanumeric(randomAlphanumeric: string): boolean {
        // 0-9, a-z, A-Z를 하나 이상씩 포함하는 문자열
        let alphanumericRegExp = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{16,16}");
        return alphanumericRegExp.test(randomAlphanumeric);
    }
}  