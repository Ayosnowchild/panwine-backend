const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().required,
  fullName: Joi.string().required,
  email: Joi.string().required,
  phone: Joi.string().required,
  password: Joi.string().min(8).required,
});

const validateSignupData = (data) => {
  let { error, value } = signupSchema.validate(data);
  return { error, value };
};

const validateSignUpMiddlewareData = (req, res, next) => {
  try {
    let { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues",
    });
  }
};

module.exports.validateSignupData = validateSignupData;
module.exports.validateSignUpMiddlewareData = validateSignUpMiddlewareData;
