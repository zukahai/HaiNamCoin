export class NamzProvider {
    static enCode(str: string) {
        let newStr = "";
        while(newStr.length < 64) {
            newStr += str;
        }

        str = newStr.substring(0, 64);
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let hex = ((str[i].charCodeAt(0) + i) % 16).toString(16);
            result += hex;
        }
        return result;
    }

    static deCode(str: string) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let number = parseInt(str[i], 16) - i;
            while(number <= 57) {
                if ((number >= 48 && number <= 57)) {
                    result += String.fromCharCode(number);
                    break;
                }
                number += 16;
                result += ((95 - number) % 16 == 0 && number > 57) ? '_' : '';
            }

        }
        return this.getInput(result);
    }

    static getInput(str: string) {
        for (let i = 1; i <= str.length; i++) {
            let temp = str.substring(0, i);
            let flag = true;
            for (let j = 0; j < str.length; j += i) {
                if (i + j < str.length && temp != str.substring(j, j + i)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return temp;
            }
        }
        return str;
    }

}
