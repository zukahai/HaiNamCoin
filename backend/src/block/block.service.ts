import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBlockDto} from './dto/create-block.dto';
import {UpdateBlockDto} from './dto/update-block.dto';
import {Block} from './entities/block.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";

// import crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(Block) private blockRepository: Repository<Block>,
        private readonly userService: UserService,
    ) {
    }

    async create(createBlockDto: CreateBlockDto) {
        const hash = (await this.findHashCode()).hashcode;
        console.log(await this.findHashCode());
        const text = createBlockDto.from + createBlockDto.to + createBlockDto.value + new Date().toTimeString() + hash;
        createBlockDto.preHashCode = hash;
        const userFrom = await this.userService.findOne(createBlockDto.from);
        if (!userFrom) {
            throw new HttpException('User from not found', HttpStatus.NOT_FOUND);
        }
        const userTo = await this.userService.findOne(createBlockDto.to);
        if (!userTo) {
            throw new HttpException('User to not found', HttpStatus.NOT_FOUND);
        }
        createBlockDto.hashCode = this.hash256(text);

        return await this.blockRepository.save({
            from: userFrom,
            to: userTo,
            preHashCode: createBlockDto.preHashCode,
            hashCode: createBlockDto.hashCode,
            value: createBlockDto.value,
        });
    }

    async findAll() {
        return await this.blockRepository.find();
    }

    // findAll order by createdAt DESC
    async findAllDESC() {
        return await this.blockRepository.find({
                order: {
                    id: "DESC"
                }
            }
        );
    }

    async checkCheat() {
        const blocks = await this.findAll();
        if (blocks.length == 0) return true;
        let preHash = blocks[0].preHashCode;
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const text = block.from.id + block.to.id + block.value + new Date(block.createdAt).toTimeString() + preHash;
            const hash = this.hash256(text);
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

    async findOne(id: number) {
        return await this.blockRepository.findOneBy({id: id});
    }

    update(id: number, updateBlockDto: UpdateBlockDto) {
        return `This action updates a #${id} block`;
    }

    remove(id: number) {
        return `This action removes a #${id} block`;
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
}
