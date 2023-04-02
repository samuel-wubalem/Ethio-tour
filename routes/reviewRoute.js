const express = require('express');

const reviewsControler = require('../controler/reviewsControler');
const authControler = require('../controler/authControler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewsControler.getReviews)
  .post(
    authControler.protect,
    authControler.restrictTo('user'),
    reviewsControler.setTourUserId,
    reviewsControler.createReviews
  );

router
  .route('/:id')
  .get(reviewsControler.getReview)
  .patch(authControler.restrictTo('admin','user'),reviewsControler.updateReview)
  .delete(authControler.restrictTo('admin','user'),reviewsControler.deleteReview);

module.exports = router;
