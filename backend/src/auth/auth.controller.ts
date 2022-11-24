import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {Body, Controller, HttpCode, Post, Req, UseGuards} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, Public} from './decorators/custom.decarator';
import {RtGuard} from './guards/rt.guard';
import {JwtPayloadRefresh} from "./strategies/rt.strategy";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @Post('/local/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('/local/register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }


    @HttpCode(200)
    @Post('/local/logout')
    logout(@GetCurrentUserId() userId: number) {
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    refreshToken(@GetCurrentUser() user: JwtPayloadRefresh, @GetCurrentUserId() userId: number) {
        return this.authService.refresh(userId, user.refreshToken);
    }

    @Post('/local/check')
    check(@Req() request) {
        return request.user;
    }
}
