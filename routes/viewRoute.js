const express = require('express');

const viewControler = require('../controler/viewControler');
const authControler = require('../controler/authControler');
const bookingControler = require('../controler/bookingControler');
const CSP = 'Content-Security-Policy';
const POLICY =
  "default-src 'self' https://*.mapbox.com ;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src http://localhost:8000 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
  "script-src-attr 'none';" +
  "frame-src *;" +
  " connect-src *;"+
  "style-src 'self' https: 'unsafe-inline';" +
  'upgrade-insecure-requests;';
const router = express.Router();

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});

router.get(
  '/',
  bookingControler.createBookingCheckout,
  authControler.isLoggedIn,
  viewControler.getOverview
);
router.get('/tours/:slug', authControler.isLoggedIn, viewControler.getTour);
router.get('/login', authControler.isLoggedIn, viewControler.getLoginForm);
router.get('/signin', authControler.isLoggedIn, viewControler.getSigninForm);
router.get('/me', authControler.protect, viewControler.getAccount);
router.get('/my-tours', authControler.protect, viewControler.getMyTours);
module.exports = router;
