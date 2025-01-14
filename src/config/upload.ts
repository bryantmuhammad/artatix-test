import { Request } from "express";
import { FileFilterCallback } from "multer";
import multer from "multer";
import path from "path";
import { rootPath } from "get-root-path";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "image"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
  }
};
