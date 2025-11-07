import * as userservices from "./user.services.js"
import {Router} from "express";
import { authentication } from "../../middleware/authencation.middleware.js";
import {auth} from "../../middleware/auth.middleware.js"
const router = Router()
router.post("/add",userservices.saveuser)
router.get("/all-users",auth(),userservices.getalluser)
router.get("/:id",userservices.getuserbyid)
router.put("/:id",userservices.updateuserbyid)
router.delete("/:id",userservices.deleteuserbyid)
export default router