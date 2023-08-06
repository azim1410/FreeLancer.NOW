import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"

export const register = async(req , res,next) =>{
    try{
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            
            ...req.body,
            password:hash,
        });

        await newUser.save();
        res.status(201).send("user has been created")

    }
    catch(err){
        // res.status(500).send({err})
        next(err)
    }

}

export const login = async(req , res, next) =>{
    try{
        const user = await User.findOne({username: req.body.username});
        
        if(!user) return next(createError(404, "user not found"));
        
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, "wrong username or password"))


        const token = jwt.sign({
            id: user._id,
            isSeller : user.isSeller,
        }, "azimjwtkeykeykeykey" );

        const {password, ...info} = user._doc

        res
        .cookie("accessToken", token, {
            httpOnly:true
        })
        .status(200).send(info)
    }
    catch(err){
        console.log("problon in authcontrioller")
        next(err)
    }
}

export const logout = async(req , res) =>{
    try{
        
        res
            .clearCookie("accessToken", {
                sameSite: "none",
                secure: true,
            })
            .status(200)
            .send("user has been logged out")

    }
    catch(err){
        res.status(500).send({err})
    }
}