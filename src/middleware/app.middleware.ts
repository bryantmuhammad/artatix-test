import express from "express";
import ApiError from "../errors/api";
import { getUser } from "../utils/db/user";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError("Unauthorized", 401);
    }

    const decodedToken = jwt.verify(token, "verylongandsecurpassword");

    const { email, exp } = decodedToken as { email: string; exp: number };

    if (exp < Date.now() / 1000) {
      throw new ApiError("Unauthorized", 401);
    }

    const user = await getUser(email);

    if (!user) {
      throw new ApiError("Invalid Credential", 404);
    }

    next();
  } catch (err) {
    next(err);
  }
};
