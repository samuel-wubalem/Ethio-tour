const Tour = require('../models/tourmodel');
const User = require('../models/usermodel');
const Bookings = require('../models/bookingmodel');

exports.getOverview = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).render('overview', {
      title: 'All Tours',
      tours,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user',
    });
    if (!tour) {
      return next(
        res.status(404).render('error', {
          title: 'There is no tour with that name',
        })
      );
    }
    res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

exports.getLoginForm = async (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
exports.getSigninForm = async (req, res) => {
  res.status(200).render('Signin', {
    title: 'Sign into your account',
  });
};

exports.getAccount = async (req, res) => {
  res.status(200).render('account', {
    title: 'your account',
  });
};

exports.getMyTours = async (req, res, next) => {
  try {
    const bookings = await Bookings.find({ user: req.user.id });
    const tourIds = bookings.map((el) => el.tour);

    const tours = await Tour.find({ _id: { $in: tourIds } });

    res.status(200).render('bookings',{
      title: 'All Tours',
      tours
    })
  } catch (error) {}
};
