import TokenServices from "../Services/tokenServices";

async function authMiddleware(req,res,next){
     try {
        const {accessToken}=req.cookies;
        
        if(!accessToken){
            throw new Error();
        }
        const userData=await TokenServices.verifyAccessToken(accessToken);
       
          if(!userData){
            throw new Error();
          }
        req.user=userData;
        next();
     } catch (error) {
        res.status(401).json({message:'Invalid Token'})
     }
}
export default authMiddleware;