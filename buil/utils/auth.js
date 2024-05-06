"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkFile = exports.getFilePath = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs = __importStar(require("fs"));
function hashPassword(password) {
    const salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
}
exports.hashPassword = hashPassword;
function getFilePath(file) {
    const path = file.path.split('\\');
    const filename = path.pop();
    const folder = path.pop();
    return `${folder}/${filename}`;
}
exports.getFilePath = getFilePath;
function unlinkFile(path) {
    try {
        if (!path)
            throw new Error('No hay imagen');
        fs.unlinkSync('src/upload/' + path);
    }
    catch (error) {
        console.log(error);
    }
}
exports.unlinkFile = unlinkFile;
