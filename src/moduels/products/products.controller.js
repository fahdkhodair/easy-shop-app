import * as productservices from "./products.service.js"
import { Router } from "express"
import {auth} from "../../middleware/auth.middleware.js"
const router = Router()
router.post("/add",auth,productservices.saveProduct)
router.get("/all",auth(),productservices.getAllproducts)
router.get("/user/:id",auth,productservices.getAllproductsbyid)
router.put("/update/:id",auth,productservices.updateproduct)
router.delete("/delete/:id",productservices.deleteproduct)
export default router