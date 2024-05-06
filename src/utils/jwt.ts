import { User } from "../types/conec";

import * as jwt  from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env


function createAccessToken(user:User) {
    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);
    return jwt.sign(_tokenPayLoad(user, expiration), JWT_SECRET_KEY);
}
function createRefreshToken(user:User) {
    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1)
    return jwt.sign(_tokenPayLoad(user, expiration), JWT_SECRET_KEY)
}
function _tokenPayLoad(user:User, expiration: Date, tokenType = 'token') {
    return {

        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }

}

function decodeToken(token:  any) {
    return jwt.decode(token);
}


export {createAccessToken,createRefreshToken,decodeToken}