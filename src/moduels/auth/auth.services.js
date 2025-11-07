import { UserModel } from "../../DB/model/User.model.js";
import { successResponse} from "../../utils/response.js";
import { createHash,compareHash} from "../../utils/security/hash.security.js";
import { createAccessToken,createRefreshtoken } from "../../utils/security/token.security.js";
import asyncHandler from "express-async-handler"
export const signup = asyncHandler(async(req,res,next) =>{
       const {fullName,email,password} = req.body;
       if (!fullName || !email || !password) {
        return res.status(400).json({message:["all fields are required"]})
       }
    const hashedPassword = await createHash({plaintext:String(password)});
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({message:'email already exists'})
    }
       const user = await UserModel.create({fullName,email,password:hashedPassword})
       return successResponse({res,  data: { user }, message: "User created successfully", status: 201 })
});
export const login = asyncHandler(async(req,res,next)=>{
        const {email,password} = req.body;
        if (!email || !password) {
           return res.status(400).json({message:'all fields are required'})
        }
        const user = await UserModel.findOne({where:{email}})
        if (!user) {
            return res.status(404).json({message:'user not found'})
        }
       const isMatch = await compareHash({plaintext:String(password),hashValue:user.password})
       if (!isMatch) {
        return res.status(401).json({message:"invalid password"})
       }
      const accesstoken = createAccessToken({id:user._id}) 
      const refreshtoken = createRefreshtoken({id:user._id})
      return successResponse({res,  data: {accesstoken, refreshtoken}, message: "login successfully", status: 200 })
})