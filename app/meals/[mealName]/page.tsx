import Image from "next/image";
import { use } from "react";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

type MealPageProps = {
  params: Promise<{
    mealName: string;
  }>;
};

export const generateMetadata = async ({ params }: MealPageProps) => {
  const { mealName } = await params;

  const meal = getMeal(mealName);

  if (!meal) {
    notFound();
  }

  return {
    title: meal?.title,
    description: meal?.summary,
  };
};

const MealPage = ({ params }: MealPageProps) => {
  const { mealName } = use(params);

  const meal = getMeal(mealName);

  if (!meal) {
    notFound();
  }

  const { image, creator_email, title, creator, summary, instructions } = meal;

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={image} alt={title} />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealPage;
