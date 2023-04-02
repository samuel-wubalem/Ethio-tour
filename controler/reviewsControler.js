const Reviews = require('../models/reviewmodel');
const Factory = require('./handlerFactory');



exports.setTourUserId = (req, res, next) => {
   
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}
exports.getReviews = Factory.getAll(Reviews);
exports.getReview = Factory.getOne(Reviews)
exports.createReviews = Factory.CreateOne(Reviews)
exports.deleteReview = Factory.deleteOne(Reviews);
exports.updateReview = Factory.updateOne(Reviews)