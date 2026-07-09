import { AppDispatch } from "@/app/store";
import AddDishModal from "@/features/admin/ui/AddRecipeModal";
import {
  selectAllDishes,
  updateRecipe,
  deleteRecipe,
} from "@/features/menu/menuSlice";
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
    console.log(updatedDays);
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [archivingId, setArchivingId] = useState<number | null>(null);

  const handleDeleteDish = async (dish: any) => {
    const confirmed = window.confirm(
      `Удалить блюдо "${dish.name}"? Это действие нельзя будет отменить.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(dish.id);
      await dispatch(deleteRecipe(dish.id)).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении блюда: ", error);
      alert("Не удалось удалить блюдо. Попробуй ещё раз.");
    } finally {
      setDeletingId(null);
    }
  };

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
    <div className="bg-white p-3 rounded-3 shadow-sm">
      <div className="d-flex justify-content-between mb-3">
        <h5>Список блюд</h5>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Добавить</Button>
      </div>

      <Table hover responsive>
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
                    bg={dish.availableDays?.includes(i) ? "primary" : "light"}
                    text={dish.availableDays?.includes(i) ? "white" : "dark"}
                    onClick={() => toggleday(dish, i)}
                    style={{
                      cursor: "pointer",
                      marginRight: 4,
                    }}
                  >
                    {d}
                  </Badge>
                ))}
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  disabled={deletingId === dish.id}
                  onClick={() => handleDeleteDish(dish)}
                >
                  {deletingId === dish.id ? "Удаляем..." : "Удалить"}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  disabled={deletingId === dish.id}
                  onClick={() => handleArchivedDish(dish)}
                >
                  {archivingId === dish.id ? "Архивируем..." : "Архивировать"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddDishModal
        show={isAddModalOpen}
        onHide={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
