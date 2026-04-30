import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import SelectRecipeModal from "../SelectRecipeModal";

const MEALS = [
    { key: 'breakfast', label: 'Завтрак', color: 'warning' },
    { key: 'lunch', label: 'Обед', color: 'success' },
    { key: 'dinner', label: 'Ужин', color: 'dark' },
    { key: 'snack', label: 'Перекус', color: 'info' },
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
            setItems(data.items || []);
        } finally {
            setLoading(false);
        }
    };

    const getByMeal = (meal: string) =>
        items.filter(i => i.mealType === meal);

    const getStats = (list: any[]) => {
        return {
            calories: list.reduce((s, i) => s + (i.calories || 0), 0),
            grams: list.reduce((s, i) => s + (i.grams || 0), 0),
            time: list.reduce((s, i) => s + (i.preparationTime || 0), 0),
        };
    };

    const handleSelectDish = async (dish: any) => {
        if (!selectedMeal) return;

        await apiClient.addToMenu(
            date,
            dish.id,
            selectedMeal,
            100, 
            dish.price
        );

        await load();
    }

    return (
        <div className="d-flex flex-column gap-3">

            {MEALS.map(meal => {
                const mealItems = getByMeal(meal.key);
                const stats = getStats(mealItems);

                return (
                    <Card key={meal.key} className="shadow-sm border-0">

                        {/* HEADER */}
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <h5 className="mb-0">{meal.label}</h5>
                                <Badge bg={meal.color}>
                                    {mealItems.length} блюд
                                </Badge>
                            </div>

                            <Button 
                                size="sm" 
                                variant="outline-primary"
                                onClick={() => {
                                    setSelectedMeal(meal.key);
                                    setShowModal(true);
                                }}
                                >
                                ➕ Добавить
                            </Button>
                        </Card.Header>

                        {/* BODY */}
                        <Card.Body>

                            {mealItems.length === 0 ? (
                                <div className="text-muted text-center py-3">
                                    Нет блюд
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-2">

                                    {mealItems.map(item => (
                                        <div
                                            key={item.id}
                                            className="d-flex justify-content-between align-items-center border rounded p-2"
                                        >
                                            <div>
                                                <div className="fw-semibold">{item.name}</div>

                                                <div className="small text-muted">
                                                    {item.calories} ккал • {item.grams} г • {item.preparationTime} мин
                                                </div>
                                            </div>

                                            <Button size="sm" variant="outline-danger">
                                                ✕
                                            </Button>
                                        </div>
                                    ))}

                                </div>
                            )}

                        </Card.Body>

                        {/* FOOTER (СТАТИСТИКА) */}
                        <Card.Footer className="d-flex justify-content-between text-muted small">
                            <span>🔥 {stats.calories} ккал</span>
                            <span>⚖️ {stats.grams} г</span>
                            <span>⏱ {stats.time} мин</span>
                        </Card.Footer>

                    </Card>
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
}

export default DayMenuPlanner;