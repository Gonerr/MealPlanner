import { AppDispatch } from "@/app/store";
import AddDishModal from "@/features/dishes/ui/AddRecipeModal";
import { selectAllDishes, updateRecipe } from "@/features/menu/menuSlice";
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

  // TODO: Должно появиться модульное окно в котором можно вписать все параметры блюда и! выбрать для него ингредиенты.
  // надо опираться на базу данных с остальными блюдами
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
