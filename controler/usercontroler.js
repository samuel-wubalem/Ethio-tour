const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/usermodel');
const Factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUsersPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

const filterObj = (obj, ...allowedfiled) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedfiled.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      res.status(400).json({
        status: 'failed',
        message:
          'This route is not for password Update,pease use /updateMyPassword',
      })
    );
  }

  try {
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'succuss',
    message: 'account deleted',
    data: null,
  });
};

exports.getallusers = Factory.getAll(User);
exports.updateUser = Factory.updateOne(User);
exports.getUser = Factory.getOne(User);
exports.deleteUsers = Factory.deleteOne(User);
