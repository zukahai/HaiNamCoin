import {registerAs} from "@nestjs/config";
import {Block} from "../../block/entities/block.entity";
import {User} from "../../user/entities/user.entity";

const model = [Block, User]
export default registerAs('database', () => ({
    // / Dialect needs to be explicitly supplied as of v4.0.0
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    models: model,
    autoLoadModels: true,
    logging: false,
}));