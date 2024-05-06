import { Connection } from "mysql";
import  {Server} from 'socket.io';
import * as express from "express";

 declare module 'express-serve-static-core' {
    interface Request {
    con: Connection;
    io:  Server;
   files:any
   
}}