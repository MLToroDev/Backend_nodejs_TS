"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST, DB_USER, PASSWORD, DB_NAME } = process.env;
const connection = mysql_1.default.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: PASSWORD
});
exports.default = connection;
