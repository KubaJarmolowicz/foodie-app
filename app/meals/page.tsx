import Link from "next/link";
import classes from "./page.module.css";
import { MealsGrid } from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import { MealsLoader } from "@/components/meals/meals-loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

const Meals = async () => {
  console.log("Fetching meals...");
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense fallback={<MealsLoader />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
