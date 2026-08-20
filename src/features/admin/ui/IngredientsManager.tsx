import { AppDispatch } from "@/app/store";
import {
  deleteIngredient,
  selectAllIngredients,
} from "@/features/ingredients/ingredientsSlice";
import AddIngregientModal from "@/features/ingredients/ui/AddIngredientModal";
import { Carrot, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// 2 секция "Управление ингредиентами" (стоимость, наличием и тп)
// Модальное окно - AddIngredientModal
export default function IngredientsManager() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const ingredients = useSelector(selectAllIngredients);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <section className="admin-panel">
      <div className="admin-panel__header">
        <div className="admin-panel__title">
          <span className="admin-panel__icon admin-panel__icon--green">
            <Carrot size={21} aria-hidden="true" />
          </span>
          <div>
            <span className="section-kicker">Продукты</span>
            <h2>Ингредиенты</h2>
            <p>{ingredients.length} позиций</p>
          </div>
        </div>
        <Button
          className="admin-secondary-btn"
          onClick={() => setIsAddModalOpen(true)}
          aria-label="Добавить ингредиент"
        >
          <Plus size={18} aria-hidden="true" />
          <span>Добавить</span>
        </Button>
      </div>

      <Table hover responsive className="admin-table align-middle">
        <tbody>
          {ingredients.map((i: any) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>
                <Button
                  size="sm"
                  className="delete-icon-btn"
                  onClick={() => dispatch(deleteIngredient(i.id))}
                  aria-label={`Удалить ${i.name}`}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddIngregientModal
        show={isAddModalOpen}
        onHide={() => setIsAddModalOpen(false)}
      />
      {/* TODO(ingredients): добавить редактирование цены, КБЖУ и признака
          "есть дома" прямо в строке вместо удаления как единственного действия. */}
    </section>
  );
}
