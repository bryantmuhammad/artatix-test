import express from "express";
import multer from "multer";

import { storage, fileFilter } from "../config/upload";
import {
  getAllTalent,
  saveTalent,
  getOneTalent,
  updateTalent,
  deleteTalent,
} from "../controller/talent";
import { talentValidation } from "../utils/validation";
import { validationResult } from "express-validator";
import ApiError from "../errors/api";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const talents = await getAllTalent();

  res.send({
    talents,
  });
});

router.post(
  "/",
  multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }).single(
    "image"
  ),
  talentValidation,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const image = req.file;
    const name = req.body.name;

    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        throw new ApiError("Validation Error", 422, { errors: result.array() });
      }

      if (image) {
        const imagePath = `image/${image.filename}`;
        const talents = await saveTalent({
          name,
          image: imagePath,
        });

        res.send({
          message: "upload success",
          data: {
            id: talents,
            name,
            image: imagePath,
            isActive: 0,
          },
        });
      } else {
        throw new Error("Failed upload image");
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  const talentId = req.params.id;

  const talent = await getOneTalent(parseInt(talentId));

  if (talent.length) {
    res.send({
      message: "Success",
      data: talent[0],
    });
  } else {
    res.status(400).send({
      message: "Talent not found",
    });
  }
});

router.put(
  "/:id",
  multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }).single(
    "image"
  ),
  updateTalent
);

router.delete("/:id", deleteTalent);

export default router;
