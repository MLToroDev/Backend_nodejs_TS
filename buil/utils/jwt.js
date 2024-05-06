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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const { JWT_SECRET_KEY } = process.env;
function createAccessToken(user) {
    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);
    return jwt.sign(_tokenPayLoad(user, expiration), JWT_SECRET_KEY);
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(user) {
    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);
    return jwt.sign(_tokenPayLoad(user, expiration), JWT_SECRET_KEY);
}
exports.createRefreshToken = createRefreshToken;
function _tokenPayLoad(user, expiration, tokenType = 'token') {
    return {
        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    };
}
function decodeToken(token) {
    return jwt.decode(token);
}
exports.decodeToken = decodeToken;
