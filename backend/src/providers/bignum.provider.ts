export class BignumProvider {
    static sum(a: string, b: string) {
        while(a.length < b.length)
            a = '0' + a;
        while (b.length < a.length)
            b = '0' + b;
        let result = '';
        let carry = 0;
        for (let i = a.length - 1; i >= 0; i--) {
            let sum = +a[i] + +b[i] + carry;
            carry = Math.floor(sum / 10);
            result = sum % 10 + result;
        }
        if (carry > 0)
            result = carry + result;
        return result;
    }

    static sub(a: string, b: string) {
        while (a.length < b.length)
            a = '0' + a;
        while (b.length < a.length)
            b = '0' + b;
        let result = '';
        let carry = 0;
        for (let i = a.length - 1; i >= 0; i--) {
            let sub = +a[i] - +b[i] - carry;
            if (sub < 0) {
                carry = 1;
                sub += 10;
            } else {
                carry = 0;
            }
            result = sub + result;
        }
        while (result[0] == '0')
            result = result.substring(1);
        return result;
    }

    static mul(a: string, b: string) {
        let sum = [];
        sum[0] = '0';
        sum[1] = a;
        for (let i = 2; i <= 9; i++) {
            sum[i] = this.sum(sum[i - 1], a);
        }
        let result = '0';
        for (let i = b.length - 1; i >= 0; i--) {
            let mul = '';
            for (let j = 0; j < +b[i]; j++) {
                mul = this.sum(mul, sum[+b[i]]);
            }
            for (let j = 0; j < b.length - i - 1; j++) {
                mul += '0';
            }
            result = this.sum(result, mul);
        }
        return result;
    }

    static div(a: string, b: string) {
        let result = '';
        let sub = '';
        for (let i = 0; i < a.length; i++) {
            sub += a[i];
            let count = 0;
            while (this.compare(sub, b) >= 0) {
                sub = this.sub(sub, b);
                count++;
            }
            result += count;
        }
        while (result[0] == '0')
            result = result.substring(1);
        return result;
    }

    static compare(a: string, b: string) {
        while (a.length < b.length)
            a = '0' + a;
        while (b.length < a.length)
            b = '0' + b;
        for (let i = 0; i < a.length; i++) {
            if (+a[i] > +b[i])
                return 1;
            if (+a[i] < +b[i])
                return -1;
        }
        return 0;
    }

    static mod(a: string, b: string) {
        let sub = '';
        for (let i = 0; i < a.length; i++) {
            sub += a[i];
            while (this.compare(sub, b) >= 0) {
                sub = this.sub(sub, b);
            }
        }
        return sub;
    }

    static pow(a: string, b: string) {
        let result = '1';
        for (let i = 0; i < +b; i++) {
            result = this.mul(result, a);
        }
        return result;
    }

    static tohex(a: string) {
        let hex = '';
        while(this.compare(a, '0') > 0) {
            let result_mod = +this.mod(a, '16');
            hex += result_mod.toString(16);
            a = this.div(a, '16');
        }
        return hex;
    }
}
