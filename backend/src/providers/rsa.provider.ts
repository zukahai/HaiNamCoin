import {BignumProvider} from "./bignum.provider";
import * as crypto from "crypto";
export class RsaProvider {

    static minPrice = 3;
    static maxPrime = 10;

    static rsa() {
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

    static rsa2() {
        // return BignumProvider.mul('11', '13');
        let p = this.randomPrime() + '';
        let q = this.randomPrime() + '';
        let n = BignumProvider.mul(p, q);
        let fi = BignumProvider.mul(BignumProvider.sub(p, '1'), BignumProvider.sub(q, '1'));
        let e = this.randomPrime() + '';
        console.log('p = ' + p, 'q = ' + q, 'n = ' + n, 'fi = ' + fi, 'e = ' + e);
        let d = this.inverse2(e, fi);

        return {
            n: n,
            e: e,
            d: d
        }
    }

    static inverse2(a: string, b: string) {
        let k = 2;
        while (BignumProvider.compare(b, BignumProvider.sub(BignumProvider.mul(a, k + ''), '1')) !== 0) { // b % (a * k + 1) != 0
            k++;
        }
        return k + '';
    }


    static randomPrime() {
        let prime = Math.floor(Math.random() * (this.maxPrime - this.minPrice) + this.minPrice);
        while (!this.isPrime(prime)) {
            prime++;
        }
        return prime;
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
}
