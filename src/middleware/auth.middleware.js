import { asyncHandler } from "../utils/response.js";
import { decodedtoken, tokentypeEnum } from "../utils/security/token.security.js";
export const auth = ({ tokentype = tokentypeEnum.Access, accessRoles = [] } = {}) => {
  return asyncHandler(async(req,res,next) => {
    const authorzation = req.headers['authorization'] || "";
    const decoded = await decodedtoken({next,authorzation,tokentype,req,res});
    if (!decoded) {
        return next(new Error("unauthorized"))
    }
    if (decoded.type !== tokentype) {
        return next(new Error("token type mismatch"))
    }
    if (accessRoles.length && !accessRoles.includes(decoded.role)) {
        return next(new Error("unauthorized access"))
    }
    return next();
  });
};

