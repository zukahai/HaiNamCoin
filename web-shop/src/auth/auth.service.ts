import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './strategies/at.strategy';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}
    async login(LoginDto: LoginDto) {
        const user = await this.userService.validateUser(LoginDto);
        if (user) {
            const payload = { username: (await user).username, sub: user.id };
            return await this.getAccessToken(user);
        } else throw new ForbiddenException({ message: 'Invalid username or password' });
    }

    async getAccessToken(user: User) {
        const payload = { username: user.username, sub: user.id, email: user.email };
        return this.jwtService.sign({ payload }, { expiresIn: '1h', secret: 'hainamcoin' });
    }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.register(registerDto);
        if (user) {
            return {
                access_token: await this.getAccessToken(user),
            };
        } else {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
    }

    async validateUser(payload: JwtPayload) {
        return await this.userService.findOneByUserName(payload.username);
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userService.findOne(userId);
        delete user.password;
        return user;
    }
}
