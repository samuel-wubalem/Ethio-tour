const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Tour = require('../models/tourmodel');
const Booking = require('../models/bookingmodel');
const Factory = require('./handlerFactory');

exports.getCheckoutSession = async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              'https://i.pinimg.com/236x/4a/d9/29/4ad9293aa89086b337df1267a4e8bb4e.jpg',
            ],
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.createBookingCheckout = async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
};

exports.createBooking = Factory.CreateOne(Booking);
exports.getBooking = Factory.getOne(Booking);
exports.updateBooking = Factory.updateOne(Booking);
exports.getAllBooking = Factory.getAll(Booking);
exports.deleteBooking = Factory.deleteOne(Booking);
