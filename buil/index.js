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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socketIO = __importStar(require("socket.io"));
const db_1 = __importDefault(require("./config/db"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const messageRoute_1 = __importDefault(require("./router/messageRoute"));
const { API_VERSION, API_NAME } = process.env;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socketIO.Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200',
        credentials: true, //access-control-allow-credentials:true
        optionsSuccessStatus: 200
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static('src/upload'));
app.use((req, _res, next) => {
    req.io = io;
    req.con = db_1.default;
    next();
});
const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, userRoute_1.default);
app.use(basePath, messageRoute_1.default);
io.on('connect', (socket) => {
    socket.on('disconnect', () => {
        console.log('an user has disconnected');
    });
    socket.on('typing', (data) => {
        io.emit('listening', data);
    });
});
exports.default = httpServer;
