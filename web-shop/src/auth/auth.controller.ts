import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from '../decorators/auth/auth.decorator';
@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Login' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('get-current-user')
    @ApiOperation({ summary: 'Get current user' })
    getCurrentUser(@GetCurrentUserId() userId: number) {
        return this.authService.getUserById(userId);
    }
}
