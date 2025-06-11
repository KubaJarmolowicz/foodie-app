import { use } from "react";

type MealPageProps = {
  params: Promise<{
    mealName: string;
  }>;
};

const MealPage = ({ params }: MealPageProps) => {
  const { mealName } = use(params);
  return (
    <main>
      <h1>{mealName}</h1>
    </main>
  );
};

export default MealPage;
