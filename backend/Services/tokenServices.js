import jwt from 'jsonwebtoken';
import {accessTokenSecret,refreshTokenSecret} from '../Config';
import RefreshModel from '../models/RefreshModel';
class TokenServices{
    static generateAccessToken(payload){
        return jwt.sign(payload,accessTokenSecret,{ expiresIn:'1m'});
      }
        
        static generateRefressToken(payload){
        return  jwt.sign(payload,refreshTokenSecret,{ expiresIn:'1h'})
       }

       static async storeRefreshToken(token,userId){
            try {
                await RefreshModel.create({
                  token,
                  userId
                })  
            } catch (error) {
              console.log(error)
            }
       }

       static async verifyAccessToken(token){
             return jwt.verify(token,accessTokenSecret);
       }
     static  async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret);
    }
  static  async findRefreshToken(userId, refreshToken) {
      return await RefreshModel.findOne({
          userId: userId,
          token: refreshToken,
      });
  }

 static async updateRefreshToken(userId, refreshToken) {
    return await RefreshModel.updateOne(
        { userId: userId },
        { token: refreshToken }
    );
}

static async removeToken(refreshToken) {
  return await RefreshModel.deleteOne({ token: refreshToken });
}
}

export default TokenServices;