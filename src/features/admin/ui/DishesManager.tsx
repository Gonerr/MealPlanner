import { AppDispatch } from "@/app/store";
import AddDishModal from "@/features/dishes/ui/AddRecipeModal";
import { selectAllDishes, updateRecipe } from "@/features/menu/menuSlice";
import { Archive, Plus, Soup } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
// 1 секция "Управление блюдами" и кнопка "Добавить"
// Модальное окно - AddDishModal
export default function DishesManager() {
  const dishes = useSelector(selectAllDishes);
  const dispatch = useDispatch<AppDispatch>();

  const toggleday = (dish: any, day: number) => {
    const updatedDays = dish.availableDays?.includes(day)
      ? dish.availableDays.filter((d: number) => d !== day)
      : [...(dish.availableDays || []), day];

    dispatch(
      updateRecipe({
        id: dish.id,
        recipe: {
          availableDays: updatedDays,
        },
      })
    );
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [archivingId, setArchivingId] = useState<number | null>(null);

  const handleArchivedDish = async (dish: any) => {
    const confirmed = window.confirm(`Архивировать блюдо "${dish.name}"? 
        Оно исчезнет из обычного списка, но останется в базе.`);

    if (!confirmed) return;

    try {
      setArchivingId(dish.id);
      await dispatch(
        updateRecipe({
          id: dish.id,
          recipe: {
            isArchived: true,
            isAvailable: false,
          },
        })
      ).unwrap();
    } catch (error) {
      console.error("Ошибка при архивировании блюда: ", error);
      alert("Не удалось архивировать блюдо. Попробуй ещё раз.");
    } finally {
      setArchivingId(null);
    }
  };

  return (
    <section className="admin-panel admin-panel--wide">
      <div className="admin-panel__header">
        <div className="admin-panel__title">
          <span className="admin-panel__icon admin-panel__icon--peach">
            <Soup size={21} aria-hidden="true" />
          </span>
          <div>
            <span className="section-kicker">Рецепты</span>
            <h2>Список блюд</h2>
            <p>{dishes.length} позиций в общей базе</p>
          </div>
        </div>
        <Button
          className="admin-primary-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={17} aria-hidden="true" />
          Добавить блюдо
        </Button>
      </div>

      <div className="admin-table-wrap">
        <Table hover responsive className="admin-table align-middle">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Время готовки</th>
              <th>Доступно</th>
              <th>Дни</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish: any) => (
              <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>{dish.price}</td>
                <td>{dish.preparationTime}</td>
                <td>
                  <Form.Check
                    checked={dish.isAvailable}
                    onChange={() =>
                      dispatch(
                        updateRecipe({
                          id: dish.id,
                          recipe: {
                            isAvailable: !dish.isAvailable,
                          },
                        })
                      )
                    }
                  />
                </td>
                <td>
                  {days.map((d, i) => (
                    <Badge
                      key={i}
                      onClick={() => toggleday(dish, i)}
                      className={`weekday-badge ${
                        dish.availableDays?.includes(i) ? "is-active" : ""
                      }`}
                    >
                      {d}
                    </Badge>
                  ))}
                </td>
                <td>
                  <Button
                    size="sm"
                    className="archive-btn"
                    disabled={archivingId === dish.id}
                    onClick={() => handleArchivedDish(dish)}
                  >
                    <Archive size={15} aria-hidden="true" />
                    {archivingId === dish.id ? "Архивируем…" : "В архив"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <AddDishModal
        show={isAddModalOpen}
        onHide={() => setIsAddModalOpen(false)}
      />
    </section>
  );
}
