"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.BlockController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var BlockController = /** @class */ (function () {
    function BlockController(blockService) {
        this.blockService = blockService;
    }
    BlockController.prototype.create = function (createBlockDto) {
        return this.blockService.create(createBlockDto);
    };
    BlockController.prototype.findAll = function () {
        return this.blockService.findAll();
    };
    BlockController.prototype.findOne = function (id) {
        return this.blockService.findOne(+id);
    };
    BlockController.prototype.update = function (id, updateBlockDto) {
        return this.blockService.update(+id, updateBlockDto);
    };
    BlockController.prototype.remove = function (id) {
        return this.blockService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], BlockController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], BlockController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], BlockController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], BlockController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], BlockController.prototype, "remove");
    BlockController = __decorate([
        (0, swagger_1.ApiTags)('block'),
        (0, common_1.Controller)('block')
    ], BlockController);
    return BlockController;
}());
exports.BlockController = BlockController;
