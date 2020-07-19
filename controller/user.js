"use strict";
const model = require('../model');

exports.post = async (req, res) => {
    const { body } = req;
    const userModel = model.user;
    const userModelData = new userModel(body);
    try {
        userModelData.save((err, result) => {
            if (err) {
                res.status(500).send({ success: false, msg: "Something went wrong in User save Data", err: err });
            } else {
                res.send({ success: true, msg: "User data save successfully", results: result });
            }

        })
    } catch (ex) {
        res.status(500).send({ success: false, msg: "Something went wrong Add User Data", err: ex });
    }
}

exports.checkUserExits = (req, res, next) => {
    const { userId } =  req.body;
    if(userId) {
        const userModel = model.user;
        userModel.findById(userId,(err, data)=>{
            console.log(data);
            if(err ||  !data){
                res.status(404).send({success: false , message: 'user does not exit.'});
            }else {
                return next();
            }
        });
    }
}