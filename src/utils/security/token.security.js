import jwt from 'jsonwebtoken'
export const createAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        type:'access'
    }
    return jwt.sign(payload, process.env.Access_token_signature, { expiresIn: process.env.Access_token_expiresIn })
}
export const signturelevel={
    Bearer:'Bearer',
    system:'system'
}
export const tokentypeEnum ={
    Access:'access',
    Refresh:'refresh'
}
export const createRefreshtoken = (user) =>{
    const payload ={
        id:user.id,
        email:user.email,
        type:'refresh'
    }
    return jwt.sign(payload, process.env.Refresh_token_signature, { expiresIn: process.env.Refresh_token_expiresIn })
}
export const verifytoken =(token,tokentype=tokentypeEnum.Access)=>{
   const secret = tokentype === tokentypeEnum.Access ? process.env.Access_token_signature : process.env.Refresh_token_signature
    return jwt.verify(token, secret)
}
export const gettingsignature = (payload,tokentypeEnum=tokentypeEnum.Access) =>{
    const secret = tokentypeEnum === tokentypeEnum.Access ? process.env.Access_token_signature:process.env.Refresh_token_signature
    return jwt.sign(payload,secret)
}
export const decodedtoken = ({ authorzation, tokentype, next, res }) => {
  try {
    const token = authorzation?.startsWith("Bearer ")
      ? authorzation.split(" ")[1]
      : null;

    if (!token) {
      throw new Error("No token provided");
    }

    const secret =
      tokentype === "access"
        ? process.env.Access_token_signature
        : process.env.Refresh_token_signature;

    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    console.error("Token decode error:", error.message);
    return null;
  }
};