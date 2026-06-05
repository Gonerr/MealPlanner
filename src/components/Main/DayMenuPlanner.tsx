import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import SelectRecipeModal from "../SelectRecipeModal";
import { FiActivity, FiBox, FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import { removeDish } from "@/features/menu/menuSlice";
import "../../styles/dayMenuPlanner.css";

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
            console.log("Получаем данные о меню при загрузке: ", data);

            setItems(data);
        } finally {
            setLoading(false);
        }
    };

    const getByMeal = (meal: string) => {
        console.log(
            items.map((i) => ({
                name: i.name,
                meal_type: i.meal_type,
            }))
        );

        let filteredMeal = items.filter((i) => i.meal_type === meal);

        return filteredMeal;
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
                            <div className="empty-state">
                                Пока ничего не добавлено
                            </div>
                        ) : (
                            <div className="meal-list">
                                {mealItems.map((item) => (
                                    <div key={item.id} className="meal-item">
                                        <div>
                                            <div className="meal-item-name">
                                                {item.name}
                                            </div>

                                            <div className="meal-item-meta">
                                                {item.calories} ккал ·{" "}
                                                {item.grams} г ·{" "}
                                                {item.preparationTime} мин
                                            </div>
                                        </div>

                                        <button
                                            className="delete-btn"
                                            onClick={() => removeDish(item.id)}
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
