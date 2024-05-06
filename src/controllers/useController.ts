import UserModel from '../models/userModel';
import { getFilePath, unlinkFile } from '../utils/auth';
import { compare } from 'bcryptjs';
import { createAccessToken, createRefreshToken } from '../utils/jwt';
import { Request, Response } from 'express';
import { CustomRequest } from '../types/conec'


const UserController = {

    index({ req, res }: { req:Request ; res: Response }) {
        UserModel.get(req.con, (error: any, rows: any) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error listando los usuarios" });
            } else { res.status(200).send({ response: rows }); }
        });
    },
    store({ req, res }: { req: CustomRequest; res: Response }) {

        req.body.img = '';
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }

        UserModel.create(req.con, req.body, (error: any, row: any) => {
            if (error) {
                if (req.body.img) unlinkFile(req.body.img);
                res.status(500).send({ response: "Ha ocurrido un error creando los usuarios" });
            } else { res.status(200).send({ response: row }); }

        });
    },
    login: ({ req, res }: { req: Request; res: Response }) => {
       
        const { email, password } = req.body;

        UserModel.getByEmail(req.con, email, (error: any, row: any) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error obteniendo el usuario" });
            } else {
                console.log("toy aqui");
                const userData = row[0];
                
                if (!userData) return res.status(500).send({ response: "El usuario no existe" });
                compare(password, userData.password, (error: any, check: any) => {
                    if (error) {
                        return res.status(500).send({ response: "Error del servidor" });
                    }
                    if (!check) {
                        return res.status(400).send({ response: "Datos incorrectos" });
                    }
                    if (!userData.active) {
                        return res.status(401).send({ response: "Usuario inactivo" });
                    }
                    delete userData.password;
                    res.status(200).send({
                        response: {
                            token: createAccessToken(userData),
                            refresh: createRefreshToken(userData)
                        }
                    });
                });
            }
        });
    }
}
export default UserController
