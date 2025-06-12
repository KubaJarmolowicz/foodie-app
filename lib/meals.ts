import fs from "node:fs";
import path from "node:path";
import { Meal, MealRecord } from "@/types/meal";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare<unknown[], MealRecord>("SELECT * FROM meals").all();
};

export const getMeal = (slug: string) => {
  return db
    .prepare<string, MealRecord>("SELECT * FROM meals WHERE slug = ?")
    .get(slug);
};

export const saveMeal = async ({
  title,
  instructions,
  image,
  ...rest
}: Meal) => {
  const slug = slugify(title, {
    lower: true,
  });

  const sanitised = xss(instructions);
  const extension = image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  const stream = fs.createWriteStream(path.join("public/images", fileName));
  const bufferedImage = await image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Saving image failed!");
    }
  });

  const record = {
    ...rest,
    title,
    slug,
    image: `/images/${fileName}`,
    instructions: sanitised,
  } satisfies Omit<MealRecord, "id">;

  db.prepare(
    `INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
         @title,
         @summary,
          @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
         )
    `
  ).run(record);
};
