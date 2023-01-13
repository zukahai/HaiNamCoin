import { Injectable } from '@nestjs/common';
import { HaiZuka } from '../providers/haizuka.provider';
import { RsaProvider } from '../providers/rsa.provider';
import { NamzProvider } from '../providers/namz.provider';

@Injectable()
export class EncryptionAlgorithmsService {
    haizuka(str: string) {
        return HaiZuka.haizuka(str);
    }

    async testHaizuka(start: string) {
        let n = 0;
        while (true) {
            let hash = await HaiZuka.haizuka(n + '');
            if (hash.startsWith(start)) {
                return {
                    n: n,
                    hash: hash,
                };
            }
            n++;
        }
        //
        return n;
    }

    enCodeNamZ(str: string) {
        return NamzProvider.enCode(str);
    }

    deCodeNamZ(str: string) {
        return NamzProvider.deCode(str);
    }

    rsa(str: string) {
        return RsaProvider.rsa();
    }
}
