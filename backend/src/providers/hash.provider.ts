import * as bcrypt from 'bcrypt';
const crypto = require('crypto');
export class HashProvider {

    static async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    static hash256(text: string): string {
        return crypto.createHash('sha256').update (text).digest('hex');
    }

}
