import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    phone:{type:String,required:true},
    name:{type:String,required:false},
    avatar:{type:String,required:false},
    activated:{type:Boolean,required:false,default:false}
},{timestamps:true})

export default mongoose.model('UserModel',userSchema,'users');