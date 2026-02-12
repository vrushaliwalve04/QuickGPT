import express from 'express'
import { protect } from '../middlewares/auth.js'
import { ImageMessageController, textMessagecontroller } from '../controllers/messageControllers.js'

const messageRouter = express.Router()

messageRouter.post('/text',protect,textMessagecontroller)
messageRouter.post('/image',protect,ImageMessageController)

export default messageRouter