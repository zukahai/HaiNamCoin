import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ConnectUserDto} from "./dto/connect-user.dto";
import {GetCurrentUserId, Public} from "../decorators/auth/auth.decorator";

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
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

  @ApiOperation({summary: 'Connect user to HaiNamCoin'})
  @Post('connect-hainamcoin')
  connect(@Body() connectUserDto: ConnectUserDto, @GetCurrentUserId() id: number) {
    console.log("id333 ", id);
    return this.userService.connectUserToHaiNamCoin(id, connectUserDto);
  }

  @ApiOperation({summary: 'Check connect to HaiNamCoin'})
  @Get('check-connect-hainamcoin')
  checkConnect(@GetCurrentUserId() id: number) {
    return this.userService.checkConnectUserToHaiNamCoin(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
