import { decodeToken } from "../utils/jwt";
import { NextFunction, Response } from 'express';
import { CustomRequest, UserTokenData } from '../types/conec';

function userAuthenticade({ req, res, next }: { req: CustomRequest; res: Response; next: NextFunction; }) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(500).send({ response: "El token es requerido" });

    const token = authorization.replace('Bearer ', '');
    const userData = decodeToken(token) as UserTokenData;

    try {
        const { exp } = userData;
        const currentTime = new Date().getTime();
        if (exp < currentTime) return res.status(400).send({ response: "El token ha expirado" });
        next();
    } catch (error) {
        res.status(400).send({ response: "El token no es válido" });
    }
}
export default userAuthenticade;

