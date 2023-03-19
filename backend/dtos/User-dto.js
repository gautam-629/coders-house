class UserDto{
    id;
    phone;
    name;
    avatar;
    activated;
    createdAt;
constructor(user){
    this.id=user._id;
    this.name=user.name;
   this.avatar=user.avatar?`${process.env.BASE_URL}${user.avatar}`:null;
    this.phone=user.phone;
    this.activated=user.activated;
    this.createdAt=user.createdAt;
}

}

// module.exports=UserDto;
export default UserDto;