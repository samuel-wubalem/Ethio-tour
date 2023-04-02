const express = require('express');

const usercontroler = require('../controler/usercontroler');
const authControler = require('../controler/authControler');

const router = express.Router();

router.post('/signup', authControler.signup);
router.post('/login', authControler.login);
router.get('/logout', authControler.logout);
router.post('/forgotpassword', authControler.forgotPassword);
router.patch('/resetpassword/:token', authControler.resetPassword);

router.patch(
  '/updatemypassword',
  authControler.protect,
  authControler.updatePassword
);
router.use(authControler.protect);
router.get('/me', usercontroler.getMe, usercontroler.getUser);
router.patch(
  '/updateMe',
  usercontroler.uploadUsersPhoto,
  usercontroler.resizeUserPhoto,
  usercontroler.updateMe
);
router.delete('/deleteMe', usercontroler.deleteMe);

router.use(authControler.restrictTo('admin'));
router.route('/').get(usercontroler.getallusers);
router
  .route('/:id')
  .delete(usercontroler.deleteUsers)
  .get(usercontroler.getUser)
  .patch(usercontroler.updateUser);
module.exports = router;
