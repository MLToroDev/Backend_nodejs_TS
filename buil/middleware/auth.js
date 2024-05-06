"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
function userAuthenticade({ req, res, next }) {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(500).send({ response: "El token es requerido" });
    const token = authorization.replace('Bearer ', '');
    const userData = (0, jwt_1.decodeToken)(token);
    try {
        const { exp } = userData;
        const currentTime = new Date().getTime();
        if (exp < currentTime)
            return res.status(400).send({ response: "El token ha expirado" });
        next();
    }
    catch (error) {
        res.status(400).send({ response: "El token no es válido" });
    }
}
exports.default = userAuthenticade;
