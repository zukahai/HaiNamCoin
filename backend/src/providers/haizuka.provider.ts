export class HaiZuka {
    static haizuka(str: string) {
        return {
            text: str,
            text_to_asscii: this.stringTostringAscii(str),
            mostAppearingCharacter: this.mostAppearingCharacter(str),
            abc: this.generateString(str),
        }
    }

    static generateString(str: string) {
        str = this.stringTostringAscii(str);
        let charCode = this.charCode();
        let prime = this.sievePrime();
        let group = this.mostAppearingCharacter(str).charCodeAt(0);

        while (str.length < 100000) {
            let newStr = "";
            for (let i = 1; i <= 4; i++) {
                for (let j = 0; j + i <= str.length; j++) {
                    newStr += this.getPrime(prime, +str.substring(j, j + i));
                }
            }
            str = this.reverseString(newStr);
        }
        let stringByLastColumn = "";
        for (let i = str.length - 1; i >= 0; i -= group) {
            stringByLastColumn += str[i];
        }
        let result = "";
        let quantity = Math.floor(str.length / 64);
        for (let i = 0; i <= 63; i++) {
            let substr = str.substring(i * quantity, (i + 1) * quantity)
            let sum = 0;
            for (let j = 0; j < substr.length; j++) {
                sum += +substr[j];
            }
            let number = this.getNumberHaveProductOfDigitsEqualN(sum);
            result += charCode[number % charCode.length];
        }
        return result;
    }

    static stringTostringAscii(str: string) {
        let ascii = "";
        for (let i = 0; i < str.length; i++) {
            ascii += str[i].charCodeAt(0);
        }
        return ascii;
    }

    static charCode() {
        return "abcdefghijklmnopqrstuvwxyz0123456789";
    }

    static getPrime(arr: boolean[], n: number) {
        while(arr[++n] == false && n < arr.length);
        return n;
    }

    static sievePrime() {
        let a = [];
        let n = 11111;
        for (let i = 0; i <= n; i++)
            a[i] = true;
        for (let i = 2; i * i <= n; i++) {
            if (a[i] == true) {
                for (let j = i * i; j <= n; j += i)
                    a[j] = false;
            }
        }
        return a;
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
        let result = "";
        for (let k = 9; k >= 2; k--) {
            while (n % k == 0) {
                result = k + result;
                n = n / k;
            }
        }
        return (n == 1) ? +result : n_backup;
    }
}
