import { body, check } from "express-validator";

export const loginValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .bail(),
];

export const talentValidation = [
  body("name").not().isEmpty().withMessage("Name cannot be empty"),
];
