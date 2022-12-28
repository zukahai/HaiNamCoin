import {ForbiddenException, Injectable} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import {HashProvider} from "../providers/hash.provider";

export class JwtPayload {
    email: string;
    sub: number;
}
export interface JwtResponse {
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.checkLogin(loginDto);
        if (!user) {
            return 'Invalid credentials';
        }
        return {

            ...await this.getTokens(user),
            message: 'Logged in',
        }
    }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.register(registerDto);
        if (user) {
           return {
                ...await this.getTokens(user),
                message: 'Registered',
           }
        }
    }

    async logout(id: number) {
        await this.userService.updateRefreshToken(id, null);
        return 'Logged out';
    }

    async refresh(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        console.log(user, refreshToken);
        if (user.refreshToken === refreshToken) {
            return await this.getTokens(user);
        }
        return new ForbiddenException({ message: 'Invalid token' });
    }

    async validateUser(payload: JwtPayload) {
        return this.userService.findOneByEmail(payload.email);
    }

    async getAccessToken(user): Promise<string> {
        return this.jwtService.sign({ email: user.email, sub: user.id }, { secret: 'at-secret', expiresIn: 60 * 60 });
    }

    async getRefreshToken(user): Promise<string> {
        const refreshToken = this.jwtService.sign(
            { email: user.email, sub: user.id },
            { secret: 'rt-secret', expiresIn: '1d' },
        );
        await this.userService.updateRefreshToken(user.id, refreshToken);
        return refreshToken;
    }

    async getTokens(user): Promise<JwtResponse> {
        const accessToken = await this.getAccessToken(user);
        const refreshToken = await this.getRefreshToken(user);
        return { accessToken, refreshToken };
    }
}
