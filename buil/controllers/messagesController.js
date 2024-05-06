"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageModel_1 = __importDefault(require("../models/messageModel"));
const MessageModel = {
    index: ({ req, res }) => {
        _getMessages(req, res);
    },
    store: ({ req, res }) => {
        messageModel_1.default.create(req.con, req.body, (error) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error creando el mensaje" });
            }
            else {
                _getMessages(req, res);
            }
        });
    }, destroy: ({ req, res }) => {
        const { id } = req.params;
        messageModel_1.default.destroy(req.con, id, (error) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error eliminado el mensaje" });
            }
            else {
                _getMessages(req, res);
            }
        });
    },
};
function _getMessages(req, res) {
    messageModel_1.default.get(req.con, (error, rows) => {
        if (error) {
            res.status(500).send({ response: "Ha ocurrido un error listando los mensajes" });
        }
        else {
            const { io } = req;
            console.log(rows);
            io.emit('message', rows);
            res.status(200).send({ response: rows });
        }
    });
}
exports.default = MessageModel;
