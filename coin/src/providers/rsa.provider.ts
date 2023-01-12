import {BignumProvider} from "./bignum.provider";
import * as crypto from "crypto";
import {NamzProvider} from "./namz.provider";
export class RsaProvider {

    static minPrice = 3;
    static maxPrime = 10000;

    static rsa() {
        let p = this.randomPrime();
        let q = this.randomPrime();
        let n = p * q;
        let phi = (p - 1) * (q - 1);
        let e = 2;
        while (true) {
            while(this.gcd(e, phi) != 1) {
                e++;
            }
            let d = 1;
            while((d * e) % phi != 1) {
                d++;
                if (d > n) {
                    e++;
                    break;
                }
            }
            return {
                n: n,
                e: e,
                d: d,
                publicKey: e + '_' + n,
                privateKey: d + '_' + n
            }
        }
    }




    static randomPrime() {
        let prime = Math.floor(Math.random() * (this.maxPrime - this.minPrice) + this.minPrice);
        while (!this.isPrime(prime)) {
            prime++;
        }
        return prime;
    }

    static gcd(a: number, b: number) {
        let d = a % b;
        while (d > 0) {
            a = b;
            b = d;
            d = a % b;
        }
        return b;
    }

    static isPrime(n: number) {
        if (n < 2)
            return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0)
                return false;
        }
        return true;
    }

    static rsa2() {
        let { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        });

        const message = 'Hello, World!';
        const signature = crypto.sign('sha256', Buffer.from(message), privateKey).toString('hex');

        const verified = crypto.verify('sha256', Buffer.from(message), publicKey, Buffer.from(signature, 'hex'));
        console.log(signature);
        console.log(verified);  // true
        return {
            privateKey: privateKey,
            publicKey: publicKey
        }
    }

    static modPow(base: number, exponent: number, modulus: number) {
        let result = 1;
        while (exponent > 0) {
            if (exponent % 2 == 1)
                result = (result * base) % modulus;
            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
        }
        return result;
    }

    static encrypt(message: string, privateKey: string) {
        let private_key = NamzProvider.deCode(privateKey);
        let [e, n] = private_key.split('_').map(x => +x);
        let result = '';
        for (let i = 0; i < message.length; i++) {
            let code = this.modPow(message.charCodeAt(i), e, n);
            result += code;
            result += '-';
        }
        result = result.substring(0, result.length - 1);
        return result;
    }

    static decrypt(message: string, publicKey: string) {
        let public_key = NamzProvider.deCode(publicKey);
        let [d, n] = public_key.split('_').map(x => +x);
        let result = '';
        let codes = message.split('-').map(x => +x);
        for (let i = 0; i < codes.length; i++) {
            let code = this.modPow(codes[i], d, n);
            result += String.fromCharCode(code);
        }
        return result;
    }
}
