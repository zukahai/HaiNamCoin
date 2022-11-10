"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlockModule = void 0;
var common_1 = require("@nestjs/common");
var block_service_1 = require("./block.service");
var block_controller_1 = require("./block.controller");
var sequelize_1 = require("@nestjs/sequelize");
var block_entity_1 = require("./entities/block.entity");
var BlockModule = /** @class */ (function () {
    function BlockModule() {
    }
    BlockModule = __decorate([
        (0, common_1.Module)({
            imports: [sequelize_1.SequelizeModule.forFeature([block_entity_1.Block])],
            controllers: [block_controller_1.BlockController],
            providers: [block_service_1.BlockService]
        })
    ], BlockModule);
    return BlockModule;
}());
exports.BlockModule = BlockModule;
