import {BignumProvider} from "./bignum.provider";
import * as crypto from "crypto";
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

// Verify the signature using the public key
        const verified = crypto.verify('sha256', Buffer.from(message), publicKey, Buffer.from(signature, 'hex'));
        console.log(signature);
        console.log(verified);  // true
        return {
            privateKey: privateKey,
            publicKey: publicKey
        }
    }
}
