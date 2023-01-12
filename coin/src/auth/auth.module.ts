import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from '../user/user.module';
import {AtStrategy} from './strategies/at.strategy';
import {RtStrategy} from './strategies/rt.strategy';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [UserModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {
}
