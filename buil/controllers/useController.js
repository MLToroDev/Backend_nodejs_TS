"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.store = exports.index = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../utils/auth");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("../utils/jwt");
function index({ req, res }) {
    userModel_1.default.get(req.con, (error, rows) => {
        if (error) {
            res.status(500).send({ response: "Ha ocurrido un error listando los usuarios" });
        }
        else {
            res.status(200).send({ response: rows });
        }
    });
}
exports.index = index;
function store({ req, res }) {
    req.body.img = '';
    if (req.files.img) {
        req.body.img = (0, auth_1.getFilePath)(req.files.img);
    }
    userModel_1.default.create(req.con, req.body, (error, row) => {
        if (error) {
            if (req.body.img)
                (0, auth_1.unlinkFile)(req.body.img);
            res.status(500).send({ response: "Ha ocurrido un error creando los usuarios" });
        }
        else {
            res.status(200).send({ response: row });
        }
    });
}
exports.store = store;
function login({ req, res }) {
    const { email, password } = req.body;
    userModel_1.default.getByEmail(req.con, email, (error, row) => {
        if (error) {
            res.status(500).send({ response: "Ha ocurrido un error obteniedno el ususario" });
        }
        else {
            const userData = row[0];
            if (!userData)
                return res.status(500).send({ response: "El usuario no existe" });
            (0, bcryptjs_1.compare)(password, userData.password, (error, check) => {
                if (error) {
                    return res.status(500).send({ response: "error del servidor" });
                }
                if (!check) {
                    return res.status(400).send({ response: "Datos incorrectos" });
                }
                if (!userData.active) {
                    return res.status(401).send({
                        response: "Usuario inactivo"
                    });
                }
                delete userData.password;
                res.status(200).send({
                    response: {
                        token: (0, jwt_1.createAccessToken)(userData),
                        refresh: (0, jwt_1.createRefreshToken)(userData)
                    }
                });
            });
        }
    });
}
exports.login = login;
