import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

import db from "./db/index";
import { usersTable } from "./db/schema";

import { getUser } from "./utils/db/user";
import ApiError from "./errors/api/index";

// Route
import mainRoute from "./routes/index";
import path from "path";
import rootPath from "get-root-path";
import multer from "multer";
import env from "./schema/env";

type userType = typeof usersTable.$inferInsert;
const app = express();
app.use(express.json());

app.use(cors());

const PORT = env.PORT || 8080;

app.use(mainRoute);
app.use("/image", express.static(path.join(rootPath, "image")));

app.get("/checktokenisvalid", async (req, res, next) => {
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

    res.send({ message: "Token is valid" });
  } catch (err) {
    next(err);
  }
});

app.use(
  (
    err: Error | ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(err);

    if (err instanceof ApiError) {
      res.status(err.statusCode).send({ message: err.message, ...err.data });
    } else if (err instanceof multer.MulterError) {
      res.status(422).send({
        message: err.message,
        errors: [
          {
            msg: err.message,
            path: err.field,
          },
        ],
      });
    } else {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

app.listen(PORT, async () => {
  const user: userType = {
    email: "user@gmail.com",
    password: "password",
  };

  const userExists: userType[] = await getUser(user.email);

  if (userExists.length === 0) {
    await db.insert(usersTable).values(user);
  }

  console.log(`Server is running on http://localhost:${PORT}`);
});
