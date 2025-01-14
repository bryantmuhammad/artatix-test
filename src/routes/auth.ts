import express from "express";
import { validationResult } from "express-validator";
import ApiError from "../errors/api";
import { getUser } from "../utils/db/user";
import jwt from "jsonwebtoken";

import { loginValidation } from "../utils/validation";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        throw new ApiError("Validation Error", 422, { errors: result.array() });
      }

      const [user] = await getUser(req.body.email);

      if (!user) {
        throw new ApiError("Invalid Credential", 404);
      }

      if (user.password !== req.body.password) {
        throw new ApiError("Invalid Credential", 404);
      }

      const token = jwt.sign({ email: "test" }, "verylongandsecurpassword", {
        expiresIn: "10d",
      });

      res.send({ token });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
