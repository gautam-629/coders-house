import UserModel from '../models/UserModel'

class UserServices{
       static async findUser(filter){
           const user= await UserModel.findOne(filter)
           return user;
        }

        static async createUser(data){
            const user= await UserModel.create(data)
            return user;
         }
}

export default UserServices;