import {asyncHandler} from '../utils/response.js'
import { decodedtoken,tokentypeEnum } from '../utils/security/token.security.js'
export const authentication = ({tokentype = tokentypeEnum.Access}={}) =>{
    return asyncHandler(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) return res.status(401).json({message: 'Unauthorized'})
        const decoded = decodedtoken(token)
        if(!decoded) return res.status(401).json({message: 'Unauthorized'})
        if(decoded.type !== tokentype) return res.status(403).json({message: 'Forbidden'})
        req.user = decoded
    })
}
