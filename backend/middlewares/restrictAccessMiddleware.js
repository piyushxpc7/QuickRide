const User = require('../models/userModels');
const AppError = require('../utils/appError');
module.exports = async (req,res,next) =>{
    const {userId} = req;
    const user = await User.findById(userId);
    if(!user) {
        next(new AppError('User not found',404));
    }
    if(user.role !== 'admin'){
        next(new AppError('You do not have permission to perform this action',403));
    }
    next();
}