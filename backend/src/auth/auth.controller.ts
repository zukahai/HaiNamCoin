import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {Body, Controller, HttpCode, Post, Req, UseGuards} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, Public} from './decorators/custom.decarator';
import {RtGuard} from './guards/rt.guard';
import {JwtPayloadRefresh} from "./strategies/rt.strategy";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @ApiOperation({summary: 'Login user'})
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Public()
    @ApiOperation({summary: 'Register user'})
    @Post('/register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }


    @HttpCode(200)
    @Post('/logout')
    @ApiOperation({summary: 'Logout user'})
    logout(@GetCurrentUserId() userId: number) {
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @ApiOperation({summary: 'Get Refresh Token'})
    @Post('/refresh')
    refreshToken(@GetCurrentUser() user: JwtPayloadRefresh, @GetCurrentUserId() userId: number) {
        return this.authService.refresh(userId, user.refreshToken);
    }

    @Post('/check')
    @ApiOperation({summary: 'Check user'})
    check(@Req() request) {
        return request.user;
    }
}
