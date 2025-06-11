import { MealRecord } from "@/types/meal";
import classes from "./meals-grid.module.css";
import { MealItem } from "./meal-item";

type MealsGridProps = {
  meals: MealRecord[];
};

export const MealsGrid = ({ meals }: MealsGridProps) => {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => {
        return (
          <li key={meal.id}>
            <MealItem {...meal} />
          </li>
        );
      })}
    </ul>
  );
};
