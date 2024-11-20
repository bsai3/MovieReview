import ReviewsDAO from './dao/reviewsDAO.js'

export default class ReviewsController{
    static async apiPostReviews(req,res,next){
        try{
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name : req.body.name,
                _id  : req.body.user_id
            }
            const date = new Date()

            const ReviewsResponse = await ReviewsDAO.addReview(movieId,userInfo,review,date)
            res.json({status : "success"})
        }catch(e){
            res.status(500).json({error : e.message});
        }
    }

    static async apiUpdateReviews(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();
    
            const ReviewsResponse = await ReviewsDAO.updateReview(reviewId, req.body.user_id, review, date);
    
            var { error } = ReviewsResponse;
    
            if (error) {
                return res.status(400).json({ error });  
            }
    
            if (ReviewsResponse.modifiedCount === 0) {
                throw new Error("unable to update review. User may not be the original poster");
            }
    
            return res.json({ status: "success" });  
    
        } catch (e) {
            return res.status(500).json({ error: e.message });  
            
        }
    }
    

    static async apiDeleteReviews(req,res,next){
        try{
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewsResponse = await ReviewsDAO.deleteReview(reviewId,userId)
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    } 
}