import { asyncHandler } from "../utils/response.js";
import { decodedtoken,tokentypeEnum } from "../utils/security/token.security.js";
export const authorization = ({tokentype = tokentypeEnum.Access}={})=>{
    return asyncHandler(async(req,res,next)=>{
         const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization token missing or invalid", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = decodedtoken({ token, tokentype });

    if (!decoded) {
      throw new AppError("Invalid or expired token", 401);
    }
    req.user = decoded;
    next();
  })
}