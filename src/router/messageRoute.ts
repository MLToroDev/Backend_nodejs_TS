import express from 'express';
import MessageController  from '../controllers/messagesController';
import  userAuthenticade  from '../middleware/auth';
const app = express.Router()

app.get('/messages', userAuthenticade, MessageController.index)
app.post('/messages/create', userAuthenticade, MessageController.store)
app.delete('/messages/:id', userAuthenticade, MessageController.destroy)

export default app;