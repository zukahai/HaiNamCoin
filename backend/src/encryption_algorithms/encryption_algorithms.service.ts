import { Injectable } from '@nestjs/common';
import {HaiZuka} from "../providers/haizuka.provider";

@Injectable()
export class EncryptionAlgorithmsService {

    haizuka(str: string) {
        return HaiZuka.haizuka(str);
    }

}
