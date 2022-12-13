import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockService } from './block/block.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject(forwardRef(() => BlockService)) private readonly blockService: BlockService,
    ) {}

    @Get()
    getHello(): string {
        this.blockService.dispersionData();
        return this.appService.getHello();
    }
}
