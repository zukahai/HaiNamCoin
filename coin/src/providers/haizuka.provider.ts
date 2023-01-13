import { BignumProvider } from './bignum.provider';
import { PrimeProvider } from './prime.provider';
import { HashProvider } from './hash.provider';

export class HaiZuka {
    static a = [];

    static async haizuka(str: string) {
        return this.generateString(await HashProvider.hash256(str));
    }

    static generateString(str: string) {
        str = this.stringTostringAscii(str);
        let prime = PrimeProvider.prime;
        let group = this.mostAppearingCharacter(str).charCodeAt(0);

        while (str.length < 100000) {
            let newStr = '';
            for (let i = 1; i <= 4; i++) {
                for (let j = 0; j + i <= str.length; j++) {
                    newStr += this.getPrime(prime, +str.substring(j, j + i));
                }
            }
            str = this.reverseString(newStr);
        }
        let stringByLastColumn = '';
        for (let i = str.length - 1; i >= 0; i -= group) {
            stringByLastColumn += str[i];
        }
        let result = '';
        let quantity = Math.floor(str.length / 64);
        for (let i = 0; i <= 63; i++) {
            let substr = str.substring(i * quantity, (i + 1) * quantity);
            let sum = 0;
            for (let j = 0; j < substr.length; j++) {
                sum += +substr[j];
            }
            let number = this.getNumberHaveProductOfDigitsEqualN(sum);
            result += number;
        }
        let pow2_256 = BignumProvider.pow('2', '256');
        let result_mod_pow2_256 = BignumProvider.mod(result, pow2_256);
        let result_to_hex = BignumProvider.tohex(result_mod_pow2_256);
        while (result_to_hex.length < 64) {
            result_to_hex = '0' + result_to_hex;
        }
        return result_to_hex;
    }

    static stringTostringAscii(str: string) {
        let ascii = '';
        for (let i = 0; i < str.length; i++) {
            ascii += str[i].charCodeAt(0);
        }
        return ascii;
    }

    static getPrime(arr: boolean[], n: number) {
        while (arr[++n] == false && n < arr.length);
        return n;
    }

    static mostAppearingCharacter(str: string) {
        let charMap = {};
        let maxCharValue = 0;
        let maxChar = '';
        for (let char of str) {
            if (charMap[char]) {
                charMap[char]++;
            } else {
                charMap[char] = 1;
            }
        }
        for (let char in charMap) {
            if (charMap[char] > maxCharValue) {
                maxCharValue = charMap[char];
                maxChar = char;
            }
        }
        return maxChar;
    }

    static reverseString(str: string) {
        return str.split('').reverse().join('');
    }

    static getNumberHaveProductOfDigitsEqualN(n: number) {
        let n_backup = n;
        let result = '';
        for (let k = 9; k >= 2; k--) {
            while (n % k == 0) {
                result = k + result;
                n = n / k;
            }
        }
        return n == 1 ? +result : n_backup;
    }
}
