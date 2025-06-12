"use server";

import { Meal } from "@/types/meal";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const isInvalidText = (value: unknown) => {
  return !value || (typeof value === "string" && value.trim() === "");
};

export const shareMeal = async (
  _: FormData | { message: string },
  formData: FormData
) => {
  const title = formData.get("title");
  const summary = formData.get("summary");
  const instructions = formData.get("instructions");
  const creator = formData.get("name");
  const creator_email = formData.get("title");
  const image = formData.get("image");

  console.log({
    title,
    summary,
    instructions,
    creator,
    creator_email,
    image,
  });

  if (
    isInvalidText(title) ||
    isInvalidText(summary) ||
    isInvalidText(instructions) ||
    isInvalidText(creator) ||
    isInvalidText(creator_email) ||
    !image ||
    (image as File)?.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  const meal = {
    title,
    summary,
    instructions,
    image,
    creator,
    creator_email,
  } as Meal;

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
