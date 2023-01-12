import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dto/login.dto';
import { HashProvider } from '../provider/hash.provider';
import { RegisterDto } from '../auth/dto/register.dto';
import {ConnectUserDto} from "./dto/connect-user.dto";
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig} from "axios";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly  httpService: HttpService) {}

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
            relations: ['fonts', 'font_users'],
        });
    }

    async connectUserToHaiNamCoin(id: number, connectUserDto: ConnectUserDto) {
        const user = await this.findOne(id);
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${connectUserDto.access_token}`,
            },
            url:'http://localhost:3000/user/current-user',
            method: 'GET',
        }

        try {
            const response = await this.httpService.request(config).toPromise();
            user.access_token = connectUserDto.access_token;
            user.hainamcoin_id = response.data.user.id;
            await this.userRepository.save(user);
            if (response.data.user)
                return response.data;
        }
        catch (e: any) {
            return {
                message: 'error',
                error: e.message,
            }
        }
    }

    async checkConnectUserToHaiNamCoin(id: number) {
        const user = await this.findOne(id);
        console.log(user);
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
            },
            url:'http://localhost:3000/user/current-user',
            method: 'GET',
        }

        try {
            const response = await this.httpService.request(config).toPromise();
            if (response.data.user) {
                return {
                    message: 'ok',
                    user: response.data,
                }
            }
        }
        catch (e) {
            return {
                message: 'error',
                error: 'Connect user to HaiNamCoin failed',
            }
        }
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
        if (user) {
            if (await HashProvider.comparePassword(loginDto.password, user.password)) {
                return user;
            }
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
