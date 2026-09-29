import { RootState } from "@/app/store";
import { addDish, fetchRecipes, removeDish, selectAllDishes, selectLoading } from "@/features/menu/menuSlice";
import { Dish, DishCategory } from "@/types/menu";
import { CakeSlice, Clock3, Coffee, Search, Soup, Sparkles, UtensilsCrossed } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecipeModal } from "./RecipeModal";

type Category = DishCategory | "all";
const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Все" }, { id: "main", label: "Основное" },
  { id: "soups", label: "Супы" }, { id: "salads", label: "Салаты" },
  { id: "desserts", label: "Десерты" }, { id: "snacks", label: "Перекусы" },
  { id: "drinks", label: "Напитки" }, { id: "specials", label: "Особое" },
];
const categoryIcon: Record<DishCategory, typeof Soup> = {
  main: UtensilsCrossed, soups: Soup, salads: Sparkles, desserts: CakeSlice,
  snacks: UtensilsCrossed, drinks: Coffee, specials: Sparkles,
};

export default function RecipesSection({ mealType }: { mealType: string | null }) {
  const dispatch = useDispatch<any>();
  const recipes = useSelector(selectAllDishes);
  const loading = useSelector(selectLoading);
  const selected = useSelector((state: RootState) => state.menu.selected);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<"name" | "time">("name");
  const [detail, setDetail] = useState<Dish | null>(null);

  useEffect(() => { void dispatch(fetchRecipes()); }, [dispatch]);

  const visible = useMemo(() => recipes.filter((dish) =>
    dish.isAvailable && !dish.isArchived &&
    (category === "all" || dish.category === category) &&
    `${dish.name} ${dish.description || ""}`.toLocaleLowerCase("ru").includes(query.trim().toLocaleLowerCase("ru"))
  ).sort((a, b) => sort === "time" ? a.preparationTime - b.preparationTime : a.name.localeCompare(b.name, "ru")), [recipes, category, query, sort]);

  return <div className="recipe-picker">
    <div className="recipe-picker__toolbar">
      <label className="recipe-picker__search"><Search size={18} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Найти блюдо или ингредиент" /></label>
      <select aria-label="Сортировать блюда" value={sort} onChange={(e) => setSort(e.target.value as "name" | "time")}>
        <option value="name">По названию</option><option value="time">Быстрее приготовить</option>
      </select>
    </div>
    <div className="recipe-picker__categories" aria-label="Категории блюд">{categories.map((item) =>
      <button key={item.id} type="button" className={category === item.id ? "is-active" : ""} onClick={() => setCategory(item.id)}>{item.label}</button>
    )}</div>
    <p className="recipe-picker__count">{loading ? "Загружаем рецепты…" : `${visible.length} блюд на выбор`}</p>
    <div className="recipe-picker__grid">{visible.map((dish) => {
      const picked = selected.some((item) => item.dish.id === dish.id);
      const Icon = categoryIcon[dish.category] || Soup;
      return <article className={`recipe-choice ${picked ? "is-selected" : ""}`} key={dish.id}>
        <div className={`recipe-choice__art recipe-choice__art--${dish.category}`}><Icon size={46} strokeWidth={1.4} /><span>{categories.find((item) => item.id === dish.category)?.label}</span></div>
        <div className="recipe-choice__body"><h3>{dish.name}</h3><p>{dish.description || "Вкусное блюдо для домашнего меню"}</p>
          <div className="recipe-choice__meta"><span><Clock3 size={15} /> {dish.preparationTime || 0} мин</span>{dish.calories != null && <span>{dish.calories} ккал</span>}</div>
          <div className="recipe-choice__actions"><button type="button" onClick={() => setDetail(dish)}>Рецепт</button>
            <button type="button" className={picked ? "is-selected" : ""} onClick={() => picked ? dispatch(removeDish(dish.id)) : dispatch(addDish({ dish, mealType, grams: 100 }))}>{picked ? "✓ Выбрано" : "+ Выбрать"}</button></div>
        </div>
      </article>;
    })}</div>
    {!loading && !visible.length && <div className="recipe-picker__empty">Ничего не нашлось. Попробуй другое название или категорию.</div>}
    {detail && <RecipeModal dish={detail} show={true} onHide={() => setDetail(null)} />}
  </div>;
}
