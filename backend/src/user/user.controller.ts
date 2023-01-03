import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {GetCurrentUserId, Public} from "../auth/decorators/custom.decarator";

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Get current user' })
    @Get('current-user')
    currentUser(@GetCurrentUserId() id: number) {
        return this.userService.infomationUser(+id);
    }

    @Public()
    @ApiOperation({ summary: 'InfomationUser user by id' })
    @Get(':id')
    infomationUser(@Param('id') id: string) {
        return this.userService.infomationUser(+id);
    }


}
