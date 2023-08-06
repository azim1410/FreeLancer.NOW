import express from "express"
// import {deleteuser} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/jwt.js"
import {createReview, getReviews, deleteReview} from "../controllers/review.controller.js"
const router = express.Router()

router.post('/', verifyToken , createReview ) 
router.get('/:gigid', getReviews ) 
router.delete('/:id', deleteReview ) 

export default router;