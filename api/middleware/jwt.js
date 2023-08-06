import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401, "not authorized"))

    jwt.verify(token , "azimjwtkeykeykeykey" , async(err , payload) => {
        if(err) return next(createError(401, "not authorized"))
        req.userId = payload.id;
        req.isSeller = payload.isSeller
        next()
    })
}