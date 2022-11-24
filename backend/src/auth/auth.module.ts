import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { HashProvider } from '../providers/hash.provider';
import { UserModule } from '../user/user.module';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UserModule, SequelizeModule.forFeature([User]), JwtModule.register({})],

    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
