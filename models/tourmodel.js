const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./usermodel')

const tourschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [40, 'Name have to be less than 40 characters'],
    },
    slug: String,
    difficulty: {
      type: String,
      required: [true, 'Dificulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must have values of : easy, midium, difficult',
      },
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Size fo group is require'],
    },
    duration: {
      type: Number,
      require: [true, 'Duration is required'],
    },
    ratingAvarage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating avarage must have greater or equal to 1'],
      max: [5, 'Rating avarage must have less or equal to 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    priceDiscoutn: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        messege:
          'The price discount ({value}) must have to be less than the current price',
      },
    },
    summary: {
      type: String,
      required: [true, 'Summary is require'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'discription is required'],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Please provide a cover image.'],
    },
    images: [{
      type: String,
      required: [true, 'Please image of the tour'],
    }],
    createdAt: {
      type: Date,
      default: Date.now(),
      selected: false,
    },
    secretTour: {
      type: Boolean,
      defalult: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number``,
      },
    ],
    startDate: [Date],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourschema.index({ price: 1, ratingAvarage: -1 })
tourschema.index({ slug: 1 })
tourschema.index({startLocation:'2dsphere'})
tourschema.virtual('durationweeks').get(function () {
  return this.duration / 7;
});

tourschema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField:'_id'
})
tourschema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
tourschema.pre(/^find/,function (next) {
  this.populate({
    path: 'guides',
    select: 'name photo',
  });
  next();
});
tourschema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourschema.post(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milisecond!`);
  next();
});

// tourschema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });
const Tour = mongoose.model('Tour', tourschema);

module.exports = Tour;
