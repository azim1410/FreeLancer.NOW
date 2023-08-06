import express from "express"
import { createMessage , getAllMessage } from "../controllers/message.controller.js"
import {verifyToken} from "../middleware/jwt.js"
const router = express.Router()

router.post("/" , verifyToken , createMessage)
router.get("/:id" , verifyToken , getAllMessage)

export default router;