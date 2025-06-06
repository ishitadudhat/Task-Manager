const userModel = require('../Models/user.model');

module.exports.createUser = async ({
    fullname,email,password
})=>{
    if(!fullname || !email || !password){
        throw new Error('please fill all the fields');
    }
    const user=await userModel.create({
        fullname,
        email,
        password
    })
    return user;
}