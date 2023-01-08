import { Injectable } from '@nestjs/common';
import {HaiZuka} from "../providers/haizuka.provider";
import * as Big from 'big.js';
import {HashProvider} from "../providers/hash.provider";
import {BignumProvider} from "../providers/bignum.provider";

@Injectable()
export class EncryptionAlgorithmsService {

    haizuka(str: string) {
        return HaiZuka.haizuka(str);
    }

    testHaizuka(start: string) {
        let n = 0;
        while (true) {
            let hash = HaiZuka.haizuka(n + '');
            if (hash.startsWith(start)) {
                return {
                    n: n,
                    hash: hash
                }
            }
            n++;
        }
        //
        return n;
        // let x = '123';
        // let y = '30';
        //
        // return {
        //     x: x,
        //     y: y,
        //     x_pow_y: BignumProvider.pow(x, y),
        //     x_mul_y: BignumProvider.mul(x, y),
        //     x_sum_y: BignumProvider.sum(x, y),
        //     x_sub_y: BignumProvider.sub(x, y),
        //     x_mod_y: BignumProvider.mod(x, y),
        //     x_div_y: BignumProvider.div(x, y),
        //     toHex: BignumProvider.tohex(x)
        // }

    }

}
