import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import * as fs from 'fs';
export class HashProvider {
    private readonly key: Buffer;
    private readonly iv: Buffer;
    constructor() {
        const data = fs.readFileSync('key.json');
        const key = JSON.parse(data.toString());
        this.key = Buffer.from(key.key, 'hex');
        this.iv = Buffer.from(key.iv, 'hex');
    }
    async encryption(password: string): Promise<string> {
        const cipher = createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    async decrypt(hash: string): Promise<string> {
        const decipher = createDecipheriv('aes-256-cbc', this.key, this.iv);
        let decrypted = decipher.update(hash, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const decrypted = await this.decrypt(hash);
        return password === decrypted;
    }
}
