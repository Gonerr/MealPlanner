import { Clock3, Flame, UtensilsCrossed } from "lucide-react";
import { Modal } from "react-bootstrap";
import { Dish } from "@/types/menu";

const categoryNames: Record<string, string> = {
  salads: "Салат", soups: "Суп", main: "Основное", desserts: "Десерт",
  snacks: "Перекус", drinks: "Напиток", specials: "Особое",
};

export function RecipeModal({ dish, show, onHide }: { dish: Dish; show: boolean; onHide: () => void }) {
  return <Modal show={show} onHide={onHide} centered dialogClassName="recipe-detail-dialog">
    <Modal.Header closeButton><Modal.Title>{dish.name}</Modal.Title></Modal.Header>
    <Modal.Body className="recipe-detail">
      <span className="recipe-detail__category">{categoryNames[dish.category] || "Блюдо"}</span>
      <p>{dish.description || "Описание этого блюда пока не добавлено."}</p>
      <div className="recipe-detail__facts">
        <span><Clock3 size={19} /> {dish.preparationTime || 0} мин</span>
        {dish.calories != null && <span><Flame size={19} /> {dish.calories} ккал</span>}
        {dish.price != null && <span><UtensilsCrossed size={19} /> {dish.price} ₽</span>}
      </div>
      <small>Подробные шаги приготовления пока не добавлены к этому рецепту.</small>
    </Modal.Body>
  </Modal>;
}
