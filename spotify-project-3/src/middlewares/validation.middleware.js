import {body, validationResult} from 'express-validator';

const validateRules = [
  body("userName")
  .notEmpty().withMessage("userName is required")
  .isString().withMessage("userName must be string")
  .isLength({min: 5}).withMessage("userName must be atlest 5 character long"),

  body("email")
  .notEmpty().withMessage("email is required")
  .isEmail().withMessage("Invalid email")
  .normalizeEmail(),

  body("password")
  .notEmpty().withMessage("email is required")
  .isLength({min: 5}).withMessage("password must be atleast 5 character long")

]

const validateResult = async (req, res, next)=>{
  const error = await validationResult(req);
  if(!error.isEmpty()){
    return res.status(401).json({
      message: "error exist",
      success: false,
      error: error.array()
    })
  }
  next();
}

export {validateRules, validationResult};