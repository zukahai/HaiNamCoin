"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'John', description: 'User name' }),
        (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
        (0, class_validator_1.MinLength)(4, { message: 'Name is too short' }),
        (0, class_validator_1.MaxLength)(20, { message: 'Name is too long' })
    ], CreateUserDto.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'test@test.com', description: 'User email' }),
        (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
        (0, class_validator_1.IsEmail)({}, { message: 'Incorrect email' })
    ], CreateUserDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '123456', description: 'User password' }),
        (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
        (0, class_validator_1.MinLength)(8, { message: 'Password is too short' }),
        (0, class_validator_1.MaxLength)(20, { message: 'Password is too long' }),
        (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
            message: 'Password is too weak'
        })
    ], CreateUserDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '123456', description: 'User password' }),
        (0, class_validator_1.IsString)({ message: 'Confirm password must be a string' }),
        (0, class_validator_1.MinLength)(8, { message: 'Confirm password is too short' }),
        (0, class_validator_1.MaxLength)(20, { message: 'Confirm password is too long' }),
        (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
            message: 'Confirm password is too weak'
        })
    ], CreateUserDto.prototype, "confirmPassword");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'admin', description: 'User role' }),
        (0, class_validator_1.IsString)({ message: 'Role must be a string' }),
        (0, class_validator_1.Matches)(/^(admin|user)$/, { message: 'Role is incorrect' })
    ], CreateUserDto.prototype, "role");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
