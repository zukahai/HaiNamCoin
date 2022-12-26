import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/user.entity';
import {RegisterDto} from '../auth/dto/register.dto';
import {LoginDto} from '../auth/dto/login.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HashProvider} from "../providers/hash.provider";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.findByEmail(createUserDto.email);
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hash = await HashProvider.hash(createUserDto.password);
        return await this.userRepository.save({...createUserDto, password: hash});
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({id});
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const userFind: User = await this.findOne(id);
        if (userFind) {
            if (updateUserDto.email && updateUserDto.email !== userFind.email) {
                const user = await this.findByEmail(updateUserDto.email);
                if (user) {
                    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
                }
            }
            if (updateUserDto.password) {
                userFind.password = await HashProvider.hash(updateUserDto.password);
                return await this.userRepository.save({...userFind, ...updateUserDto});
            }
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: number): Promise<void> {
        if (await this.findOne(id)) {
            await this.userRepository.delete(id);
        } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email});
    }

    async register(registerDto: RegisterDto): Promise<string> {
        const createDto: CreateUserDto = {
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
            const check = await HashProvider.compare(loginDto.password, user.password);
            if (check) {
                return user;
            } else throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
        } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email});
    }

    async updateRefreshToken(id, refreshToken: string) {
        const user = await this.findOne(id);
        if (user) {
            return await this.userRepository.save({...user, refreshToken});
        } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
}
