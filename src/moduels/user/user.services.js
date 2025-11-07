import { UserModel } from "../../DB/model/User.model.js";
import { successResponse,errorhandling } from "../../utils/response.js";
export const saveuser = async(req,res,next)=>{
    try {
        const { fullName, email, password, role } = req.body;
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({message: ["fullName", "email", "password", "role"]})
        }
        const user = await UserModel.create({fullName,email,password,role})
        return successResponse({res,data:{user},message:"user created",status:201})
    } catch (error) {
        return errorhandling({res,error})
    }
}
export const getalluser = async(req,res,next) =>{
    try {
       const users = await UserModel.findAll()
       return successResponse({res,data:{users},status:200}) 
    } catch (error) {
       return errorhandling({res,error})
    }
}
export const getuserbyid = async(req,res,next) =>{
    try {
       const { id } = req.params;
       const user = await UserModel.findByPk(id);
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }
       return successResponse({ res, data: { user }, status: 200 });
    } catch (error) {
         return errorhandling({res,error})  
    }
}
export const updateuserbyid = async(req,res,next) =>{
    try {
       const { id } = req.params;
       const { fullName, email, password, role } = req.body;
       const user = await UserModel.findByPk(id);
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }
       await user.update({ fullName, email, password, role });
       return successResponse({ res, data: { user }, message: "User updated", status: 200 });
    } catch (error) {
        return errorhandling({res,error})
    }
}
export const deleteuserbyid = async(req,res,next) =>{
    try {
       const { id } = req.params;
       const user = await UserModel.findByPk(id);
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }
       await user.destroy();
       return successResponse({ res, message: "User deleted", status: 200 });
    } catch (error) {
        return errorhandling({res,error})
    }
}