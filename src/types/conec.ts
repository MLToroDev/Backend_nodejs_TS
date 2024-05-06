import { Connection } from "mysql";
import  {Server} from 'socket.io';
import  {Request } from 'express';

export interface CustomRequest extends Request {
    con: Connection;
    io:  Server;
   files:any
}
export interface User {
    id:       number;
    firstName: string;
    lastName:  string;
    email:     string;
    password:  string;
    img?: string;
    role:      'admin' | 'user' | '';
    active:    boolean;
}
export interface UserTokenData {
    tokenType: 'refresh' | 'token' | '';
    iat:       number;
    exp:       number;
    user:      User;
  }

export type Conect = Connection;
