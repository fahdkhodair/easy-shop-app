import * as authservice from './auth.services.js'
import { Router } from 'express'
const router = Router()
router.post("/signup",authservice.signup)
router.post("/login",authservice.login)
export default router;