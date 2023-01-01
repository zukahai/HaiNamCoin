import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dto/login.dto';
import { HashProvider } from '../provider/hash.provider';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async validateUser(loginDto: LoginDto): Promise<User> {
        const user = await this.findOneByUserName(loginDto.username);
        if (await HashProvider.comparePassword(loginDto.password, user.password)) {
            return user;
        }
        return null;
    }

    async findOneByUserName(username: string) {
        return await this.userRepository.findOne({
            where: {
                username: username,
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async register(registerDto: RegisterDto): Promise<User> {
        let user = await this.findOneByEmail(registerDto.email);
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        user = await this.findOneByUserName(registerDto.username);

        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const newUser = await this.userRepository.save({
            username: registerDto.username,
            email: registerDto.email,
            name: registerDto.name,
            password: await HashProvider.hashPassword(registerDto.password),
        });
        return newUser;
    }
}
