import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as fs from 'fs';
import { writeFile } from 'fs/promises';
import { HaiZuka } from '../providers/haizuka.provider';

// import crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(Block) private blockRepository: Repository<Block>,
        private readonly userService: UserService,
    ) {}

    async create(createBlockDto: CreateBlockDto) {
        const hash = (await this.findHashCode()).hashcode;
        const text = createBlockDto.from + createBlockDto.to + createBlockDto.value + new Date().toTimeString() + hash;
        const userFrom = await this.userService.findOne(createBlockDto.from);
        if (!userFrom) {
            throw new HttpException('User from not found', HttpStatus.NOT_FOUND);
        }
        const userTo = await this.userService.findOne(createBlockDto.to);
        if (!userTo) {
            throw new HttpException('User to not found', HttpStatus.NOT_FOUND);
        }

        return await this.blockRepository.save({
            from: userFrom,
            to: userTo,
            preHashCode: hash,
            description: createBlockDto.description,
            hashCode: HaiZuka.haizuka(text),
            value: createBlockDto.value,
        });
    }

    async createByProperties(from: number, to: number, value: number, description: string) {
        let createBlockDto = new CreateBlockDto();
        createBlockDto.from = from;
        createBlockDto.to = to;
        createBlockDto.value = value;
        createBlockDto.description = description;
        return await this.create(createBlockDto);
    }

    async findAll() {
        const result = [];
        const blocks = await this.blockRepository.find({
            order: {
                id: 'DESC',
            },
        });
        for (let i = 0; i < blocks.length; i++) {
            const block = await this.findOne(blocks[i].id);
            result.push(block);
        }
        return result;
    }

    // findAll order by createdAt DESC
    async findAllDESC() {
        return await this.blockRepository.find({
            order: {
                id: 'DESC',
            },
            relations: { from: true, to: true },
            select: {
                from: { email: true, name: true, public_key: true },
                to: { email: true, name: true, public_key: true },
                description: true,
                value: true,
                preHashCode: true,
                hashCode: true,
                createdAt: true,
            },
        });
    }

    async findByFormOrTo(user_id: number) {
        const user = await this.userService.findOne(user_id);
        const blocks = await this.findAll();
        let result = [];
        for (let i = 0; i < blocks.length; i++) {
            const block = await this.findOne(blocks[i].id);
            if (block.from.id == user.id || block.to.id == user.id) {
                result.push(block);
            }
        }
        return result;
    }

    async checkCheat() {
        const blocks = await this.findAll();
        if (blocks.length == 0) return true;
        let preHash = blocks[0].preHashCode;
        for (let i = 0; i < blocks.length; i++) {
            const block = await this.findOne(blocks[i].id);
            const text = block.from.id + block.to.id + block.value + new Date(block.createdAt).toTimeString() + preHash;
            const hash = HaiZuka.haizuka(text);
            if (hash !== block.hashCode) {
                return {
                    message: 'Cheat',
                    blockCheat: block,
                    hash: hash,
                    text: text,
                };
            }
            preHash = hash;
        }
        return {
            message: 'No cheat',
        };
    }

    async checkCheatByHash() {
        const blocks = await this.findAll();
        for (let i = 1; i < blocks.length; i++) {
            if (blocks[i].preHashCode !== blocks[i - 1].hashCode) {
                return {
                    message: 'Cheat',
                    blockCheat: blocks[i],
                    preHash: blocks[i].preHashCode,
                    hash: blocks[i - 1].hashCode,
                };
            }
        }
        return {
            message: 'No cheat',
        };
    }

    hash256(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }

    async findOne(id: number): Promise<Block> {
        return await this.blockRepository.findOne({
            where: {
                id: id,
            },
            relations: { from: true, to: true },
        });
    }

    async findHashCode() {
        // find last block in database by createdAt DESC
        const block = await this.blockRepository.query('SELECT * FROM blocks ORDER BY id DESC LIMIT 1');

        // const lastBlock = await this.blockModel.sequelize.query(
        //     'SELECT * FROM blocks ' + 'WHERE createdAt = (SELECT max(createdAt) FROM blocks) LIMIT 1',
        //     {type: QueryTypes.SELECT},
        // );

        const hashcode = block.length ? block[0].hash_code : 'HaiNamCoin';
        const createdAt = block.length ? block[0].created_at : new Date();

        return {
            hashcode: hashcode,
            block: block,
            createdAt: createdAt,
        };
    }

    async dispersionData() {
        console.log('dispersionData');
        const blocks = await this.findAllDESC();

        const folderName = 'D:\\HaiNamCoin_Data';
        const fileName = 'transactions.json';
        const path = folderName + '\\' + fileName;
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err);
        }
        await writeFile(path, JSON.stringify(blocks));
    }
}
