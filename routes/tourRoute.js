const express = require('express');
const tourcontroler = require('../controler/tourcontroler');
const authControler = require('../controler/authControler');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-tours')
  .get(tourcontroler.toptours, tourcontroler.getalltours);

router.route('/tours-status').get(tourcontroler.tourstates);

router
  .route('/monthly-plan/:year')
  .get(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourcontroler.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourcontroler.getTourwithin);

router
  .route('/distance/:latlng/unit/:unit')
  .get(tourcontroler.getDistances);
router
  .route('/')
  .get(tourcontroler.getalltours)
  .post(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourcontroler.posttour
  );

router
  .route('/:id')
  .get(tourcontroler.getSingeltour)
  .patch(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourcontroler.uploadTourImages,
    tourcontroler.resizeTourImages,
    tourcontroler.updatetour
  )
  .delete(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourcontroler.deletetour
  );

module.exports = router;
