"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const app = express_1.default.Router();
app.get('/messages', auth_1.default, messagesController_1.default.index);
app.post('/messages/create', auth_1.default, messagesController_1.default.store);
app.delete('/messages/:id', auth_1.default, messagesController_1.default.destroy);
exports.default = app;
