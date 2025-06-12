import classes from "./meals-loader.module.css";

export const MealsLoader = () => {
  return <p className={classes.loading}>Fetching meals...</p>;
};
