import express, { Application, Request, Response, NextFunction } from 'express';
import './types/express';
import cors from 'cors';
import http from 'http';
import * as socketIO from 'socket.io';
import dbConnection from './config/db';
import userRoutes from './router/userRoute';
import messageRoutes from './router/messageRoute';




const PORT = process.env.PORT || 8080;
const { API_VERSION, API_NAME } = process.env;

const app: Application = express();

const httpServer: http.Server = http.createServer(app);

const io = new socketIO.Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200',
        credentials: true, //access-control-allow-credentials:true
        optionsSuccessStatus: 200
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src/upload'));



app.use((req: Request, _res: Response, next: NextFunction) => {

    req.io = io;
    req.con = dbConnection;
    next();
})
app.post('/api/v1/users/logi', (_req, _res) => {
    console.log(_req.body);
})
const basePath: string = `/${API_NAME}/${API_VERSION}`;

app.use(basePath, userRoutes);
app.use(basePath, messageRoutes);

io.on('connect', (socket: socketIO.Socket) => {
    socket.on('disconnect', () => {
        console.log('an user has disconnected');
    });
    socket.on('typing', (data: any) => {
        io.emit('listening', data);
    });
});


app.listen(PORT, () => console.log('listening on port', PORT));
export default httpServer;
