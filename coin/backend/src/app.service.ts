import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BlockService } from './block/block.service';

@Injectable()
export class AppService {
    constructor(@Inject(forwardRef(() => BlockService)) private readonly blockService: BlockService) {}

    getHello(): string {
        return 'Hello World!';
    }
}
