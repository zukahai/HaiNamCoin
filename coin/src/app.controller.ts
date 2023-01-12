import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/custom.decarator';
import { BlockService } from './block/block.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly blockService: BlockService) {}

    @Public()
    @Get()
    getHello(): string {
        this.blockService.dispersionData();
        return this.appService.getHello();
    }
}
