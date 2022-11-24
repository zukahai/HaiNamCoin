import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super({});
    }
}
