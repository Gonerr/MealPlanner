import { selectAllIngredients } from "@/features/ingredients/ingredientsSlice";
import { selectAllDishes } from "@/features/menu/menuSlice";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function StatsPanel() {
    const dishes = useSelector(selectAllDishes);
    const ingredients = useSelector(selectAllIngredients);

    return (
        <Card className="mt-4">
            <Card.Header>
                <h5 className="mb-0">Статистика меню</h5>
            </Card.Header>
            <Card.Body>
                <div className="row">
                    <div className="col-md-3">
                        <div className="text-center">
                            <h3>{dishes.length}</h3>
                            <p className="text-muted">Всего блюд</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-center">
                            <h3 className="text-success">
                                {dishes.filter(d => d.isAvailable).length}
                            </h3>
                            <p className="text-muted">Доступно</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-center">
                            <h3 className="text-warning">
                                {dishes.filter(d => d.isChefSpecial).length}
                            </h3>
                            <p className="text-muted">Особые блюда</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-center">
                            <h3 className="text-info">{ingredients.length}</h3>
                            <p className="text-muted">Ингредиентов</p>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}