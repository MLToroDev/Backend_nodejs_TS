import Message from '../models/messageModel';
import { Response } from 'express';
import { CustomRequest } from '../types/conec'


const MessageController = {
    index: ({ req, res }: { req: CustomRequest; res: Response }) => {
        _getMessages(req, res)
    },
    store: ({ req, res }: { req: CustomRequest; res: Response }) => {

        Message.create(req.con, req.body, (error: any) => {

            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error creando el mensaje" })
            } else {

                _getMessages(req, res)
            }

        })
    }, destroy: ({ req, res }: { req: CustomRequest; res: Response }) => {
        const { id } = req.params
        Message.destroy(req.con, id, (error: any) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error eliminado el mensaje" })
            } else {
                _getMessages(req, res)
            }

        })
    },
}
function _getMessages(req: CustomRequest, res: Response) {
    Message.get(req.con, (error: any, rows: any) => {
        if (error) {
            res.status(500).send({ response: "Ha ocurrido un error listando los mensajes" })
        } else {
            const { io } = req;
            console.log(rows)
            io.emit('message', rows)
            res.status(200).send({ response: rows })
        }
    })
}
export default MessageController;