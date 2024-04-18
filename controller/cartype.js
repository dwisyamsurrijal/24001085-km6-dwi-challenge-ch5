const cartypeUsecase = require("../usecase/cartypes")

exports.getCartypes = async (req, res, next) => {
  try {
    const data = await cartypeUsecase.getCartypes();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCartype = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await cartypeUsecase.getCartype(id);
    if (!data) {
      return next({
        message: `Cartype with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCartype = async (req, res, next) => {
  try {
    const { type } = req.body;
    if (!type || type == "") {
      return next({
        message: "Type must be provided!",
        statusCode: 400,
      });
    }

    const data = await cartypeUsecase.createCartype({
      type,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCartype = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    if (!type || type == "") {
      return next({
        message: "Type must be provided!",
        statusCode: 400,
      });
    }

    const data = await cartypeUsecase.updateCartype(id, { type });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCartype = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await cartypeUsecase.deleteCartype(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
