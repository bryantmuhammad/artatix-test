import express from "express";
import fs from "fs";
import { eq } from "drizzle-orm";
import db from "../db";
import { talentTable } from "../db/schema";
import rootPath from "get-root-path";
import path from "path";

type talentType = typeof talentTable.$inferInsert;

export const getAllTalent = async () => {
  const talent = await db.select().from(talentTable);

  return talent;
};

export const saveTalent = async (
  talent: talentType
): Promise<number | void> => {
  const newTalent = await db.insert(talentTable).values(talent).returning({
    id: talentTable.id,
  });

  return newTalent[0].id;
};

export const getOneTalent = async (id: number) => {
  return await db.select().from(talentTable).where(eq(talentTable.id, id));
};

export const updateTalent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // return await db.update(talentTable).set();

  const talentId = req.params.id;

  const image = req.file;
  const name = req.body.name;
  const isActive = req.body.isActive;

  const talent = await getOneTalent(parseInt(talentId));

  if (talent.length) {
    let data: {
      name: string;
      image?: string;
      isActive: number | undefined;
    } = {
      name: name || talent[0].name,
      isActive: isActive || talent[0].isActive,
    };

    let imagePath: string;
    if (image) {
      imagePath = `image/${image.filename}`;
      data.image = imagePath;

      fs.unlink(path.join(rootPath, talent[0].image), (err) => {
        if (err) {
          console.log("error delete file");
        }
      });
    }

    await db
      .update(talentTable)
      .set({
        ...data,
      })
      .where(eq(talentTable.id, parseInt(talentId)));

    res.send({
      message: "Talent has been updated",
      data: {
        ...talent[0],
        ...data,
      },
    });
  } else {
    res.status(400).send({
      message: "Talent not found",
    });
  }
};

export const deleteTalent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const talentId = req.params.id;

  try {
    const talent = await getOneTalent(parseInt(talentId));

    fs.unlink(path.join(rootPath, talent[0].image), (err) => {
      if (err) {
        console.log("error delete file");
      }
    });

    await db.delete(talentTable).where(eq(talentTable.id, parseInt(talentId)));

    res.send({
      message: "Talent has been deleted",
    });
  } catch (err) {
    next(err);
  }
};
