const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      requested: req.reqtime,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      requested: req.reqtime,
      data: {
        doc,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};
exports.CreateOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'succuess',
      requested: req.reqtime,
      data: {
        doc,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;
    res.status(200).json({
      status: 'succuss',
      requested: req.reqtime,
      data: {
        doc,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getAll = (Model) => async (req, res) => {
    try {
        let filter = {};
        if(req.params.tourId) filter = {tour:req.params.tourId}
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .limitFileds()
      .paginate()
      .sort();

    const doc = await features.query;
    res.status(200).json({
      status: 'succuss',
      result: doc.length,
      requested: req.reqtime,
      data: {
        doc,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
