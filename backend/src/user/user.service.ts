import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { HashProvider } from '../providers/hash.provider';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User, private hashProvider: HashProvider) {}

    async create(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.findByEmail(createUserDto.email);
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hash = await this.hashProvider.encryption(createUserDto.password);
        return await this.userModel.create({ ...createUserDto, password: hash });
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.findAll();
    }

    async findOne(id: number): Promise<User> {
        return await this.userModel.findByPk(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const userFind = await this.findOne(id);
        if (userFind) {
            if (updateUserDto.email && updateUserDto.email !== userFind.email) {
                const user = await this.findByEmail(updateUserDto.email);
                if (user) {
                    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
                }
            }
            if (updateUserDto.password) {
                const hash = await this.hashProvider.encryption(updateUserDto.password);
                return await userFind.update({ ...updateUserDto, password: hash });
            }
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: number): Promise<void> {
        if (await this.findOne(id)) {
            await this.userModel.destroy({ where: { id } });
        } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ where: { email } });
    }

    async register(registerDto: RegisterDto): Promise<string> {
        let createDto: CreateUserDto = {
            ...registerDto,
            role: 'user',
            isActivated: false,
        };
        const user = await this.create(createDto);
        if (user) {
            return 'User created';
        } else throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
    async checkLogin(loginDto: LoginDto): Promise<User> {
        const user = await this.findByEmail(loginDto.email);
        if (user) {
            const check = await this.hashProvider.compare(loginDto.password, user.password);
            if (check) {
                return user;
            } else throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
        } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ where: { email } });
    }

    async updateRefreshToken(id, refreshToken: string) {
        const user = await this.findOne(id);
        if (user) {
            return await user.update({ refreshToken });
        } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
}
