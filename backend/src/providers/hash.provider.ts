import * as bcrypt from 'bcrypt';
const crypto = require('crypto');
export class HashProvider {
    static hard = '000000';

    static async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    static hash256(text: string): string {
        return crypto.createHash('sha256').update(text).digest('hex');
    }

    static findNonce(text: string): number {
        let nonce = 0;
        while (true) {
            const hash = this.hash256(text + nonce);
            if (hash.startsWith(this.hard)) {
                return nonce;
            }
            nonce++;
        }
    }

    static randomPermutationNoce(nonce: number): number {
        let nonce_str = nonce.toString();
        let random = Math.floor(Math.random() * 10000);
        while (random--) {
            let index1 = Math.floor(Math.random() * nonce_str.length);
            let index2 = Math.floor(Math.random() * nonce_str.length);
            let temp = nonce_str[index1];
            nonce_str = nonce_str.replace(nonce_str[index1], nonce_str[index2]);
            nonce_str = nonce_str.replace(nonce_str[index2], temp);
        }
        return parseInt(nonce_str);
    }
}
