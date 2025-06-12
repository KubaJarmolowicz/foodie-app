export type Meal = {
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export type MealRecord = Omit<Meal, "image"> & {
  id: string;
  slug: string;
  image: string;
};
