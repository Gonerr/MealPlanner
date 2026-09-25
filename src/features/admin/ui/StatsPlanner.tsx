import { selectAllIngredients } from "@/features/ingredients/ingredientsSlice";
import { selectAllDishes } from "@/features/menu/menuSlice";
import { CheckCircle2, CookingPot, Database, Star } from "lucide-react";
import { useSelector } from "react-redux";

export default function StatsPanel() {
    const dishes = useSelector(selectAllDishes);
    const ingredients = useSelector(selectAllIngredients);

  const stats = [
    { label: "Всего блюд", value: dishes.length, icon: CookingPot },
    {
      label: "Доступно",
      value: dishes.filter((dish) => dish.isAvailable).length,
      icon: CheckCircle2,
    },
    {
      label: "Особые",
      value: dishes.filter((dish) => dish.isChefSpecial).length,
      icon: Star,
    },
    { label: "Ингредиентов", value: ingredients.length, icon: Database },
  ];

  return (
    <section className="admin-panel admin-stats">
      <div className="admin-panel__header">
        <div>
          <span className="section-kicker">Состояние базы</span>
          <h2>Коротко о меню</h2>
        </div>
      </div>

      <div className="admin-stats__grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <div className="admin-stat" key={label}>
            <Icon size={19} aria-hidden="true" />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
