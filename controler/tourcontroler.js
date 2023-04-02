const multer = require('multer');
const sharp = require('sharp');

const Tour = require('../models/tourmodel');
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

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeTourImages = async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  req.body.images = [];

  await Promise.all(
  req.files.images.map(async (file, i) => {
    const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

    await sharp(file.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${filename}`);
    req.body.images.push(filename);
  })
  )
  next();
};
exports.toptours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAvarage,price';
  req.query.fields = 'price,ratingsAverage,name,difficulty,summary';

  next();
};

exports.getalltours = Factory.getAll(Tour);
exports.getSingeltour = Factory.getOne(Tour, { path: 'reviews' });
exports.posttour = Factory.CreateOne(Tour);
exports.updatetour = Factory.updateOne(Tour);
exports.deletetour = Factory.deleteOne(Tour);

exports.tourstates = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTour: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: `${year}-01-01`,
            $lte: `${year}-12-31`,
          },
        },
      },
      {
        $group: {
          _id: {
            $month: {
              $dateFromString: {
                dateString: '$startDates',
              },
            },
          },
          newTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { newTourStarts: -1 },
      },
    ]);
    res.status(200).json({
      status: 'success',
      result: plan.length,
      data: {
        plan,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
//'/tours-within/:distance/center/:latlng/unit/:unit';
exports.getTourwithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(
      res.status(400).json({
        status: 'failed',
        message: 'please provide latitude and longtude in the format lat,lng.',
      })
    );
  }
  const tour = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    result: tour.length,
    data: {
      tour,
    },
  });
};

exports.getDistances = async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    return next(
      res.status(400).json({
        status: 'failed',
        message: 'please provide latitude and longtude in the format lat,lng.',
      })
    );
  }
  const distance = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      distance,
    },
  });
};
