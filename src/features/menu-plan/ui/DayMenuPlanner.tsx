import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { FiActivity, FiBox, FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import SelectRecipeModal from "../../recipes/ui/SelectRecipeModal";

const MEALS = [
  { key: "breakfast", label: "Завтрак", color: "warning" },
  { key: "lunch", label: "Обед", color: "success" },
  { key: "dinner", label: "Ужин", color: "dark" },
  { key: "snack", label: "Перекус", color: "info" },
] as const;

const DayMenuPlanner: React.FC<{ date: string }> = ({ date }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, [date]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getMenuPlan(date);
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  const getByMeal = (meal: string) => {
    return items.filter((i) => i.meal_type === meal);
  };

  const getStats = (list: any[]) => {
    return {
      calories: list.reduce((s, i) => s + (i.calories || 0), 0),
      grams: list.reduce((s, i) => s + (i.grams || 0), 0),
      time: list.reduce((s, i) => s + (i.preparationTime || 0), 0),
    };
  };

  const handleSelectDish = async (dish: any) => {
    if (!selectedMeal) return;

    await apiClient.addToMenu(date, dish.id, selectedMeal, 100, dish.price);

    await load();
  };

  const handleRemoveDish = async (menuItemId: number) => {
    const previousItems = items;
    setItems((current) =>
      current.filter((item) => item.menu_item_id !== menuItemId)
    );

    try {
      await apiClient.removeFromMenu(menuItemId);
    } catch (error) {
      setItems(previousItems);
      console.error("Не удалось удалить блюдо из меню", error);
    }
  };

  if (loading) {
    return <div className="planner-loading">Собираем меню…</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {MEALS.map((meal) => {
        const mealItems = getByMeal(meal.key);
        const stats = getStats(mealItems);

        return (
          <section key={meal.key} className="meal-section">
            {/* HEADER */}
            <div className="meal-header">
              <div>
                <h2>{meal.label}</h2>
                <span>{mealItems.length} блюд</span>
              </div>

              <button
                className="add-btn"
                onClick={() => {
                  setSelectedMeal(meal.key);
                  setShowModal(true);
                }}
              >
                <FiPlus />
              </button>
            </div>

            {mealItems.length === 0 ? (
              <div className="empty-state">Пока ничего не добавлено</div>
            ) : (
              <div className="meal-list">
                {mealItems.map((item) => (
                  <div key={item.menu_item_id} className="meal-item">
                    <div>
                      <div className="meal-item-name">{item.name}</div>

                      <div className="meal-item-meta">
                        {item.calories} ккал · {item.grams} г ·{" "}
                        {item.preparationTime} мин
                      </div>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleRemoveDish(item.menu_item_id)}
                      aria-label={`Убрать ${item.name} из меню`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="meal-stats">
              <div className="stat-chip">
                <FiActivity />
                {stats.calories} ккал
              </div>

              <div className="stat-chip">
                <FiBox />
                {stats.grams} г
              </div>

              <div className="stat-chip">
                <FiClock />
                {stats.time} мин
              </div>
            </div>
          </section>
        );
      })}

      <SelectRecipeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        mealType={selectedMeal}
        date={date}
      />
    </div>
  );
};

export default DayMenuPlanner;
