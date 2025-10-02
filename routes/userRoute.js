import express from 'express'
import { getUserByClerkId } from '../controller/userController.js'
const router = express.Router()

router.get('/:clerkId', getUserByClerkId)

export default router