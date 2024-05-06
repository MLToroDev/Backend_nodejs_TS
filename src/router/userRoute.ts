import express from 'express';
//import multiparty   from '../middleware/cosa';
import userController from '../controllers/useController';
/*const mdUserImg = multiparty({uploadDir: 'src/upload/users'})*/
const app = express.Router()

app.get('/users', userController.index)
app.post('/users/create', /*mdUserImg,*/ userController.store)


//Funciones a evaluar
app.post('/users/login', userController.login)

export default app;