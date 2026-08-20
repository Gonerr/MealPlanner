import { AppDispatch } from "@/app/store";
import { AddModalProps } from "@/features/dishes/types";
import { createRecipe } from "@/features/menu/menuSlice";
import { apiClient } from "@/lib/api-client";
import { Dish, Ingredient } from "@/types/menu";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const initialForm: Omit<Dish, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "main",
  ingredients: [],
  preparationTime: 0,
  isAvailable: true,
  isChefSpecial: false,
  calories: 0,
  mealType: "lunch",
};

export default function AddDishModal({ show, onHide }: AddModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState(initialForm);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) return;

    apiClient
      .getIngredients()
      .then(setIngredients)
      .catch(() => setError("Не удалось загрузить ингредиенты"));
  }, [show]);

  const selectedIngredients = useMemo(
    () => new Set(form.ingredients),
    [form.ingredients]
  );

  const updateField = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleIngredient = (ingredientId: number) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredientId)
        ? prev.ingredients.filter((id) => id !== ingredientId)
        : [...prev.ingredients, ingredientId],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("У блюда должно быть название");
      return;
    }

    if (form.ingredients.length === 0) {
      setError("Выбери хотя бы один ингредиент");
      return;
    }

    try {
      setIsSaving(true);

      await dispatch(
        createRecipe({
          ...form,
          name: form.name.trim(),
          description: form.description.trim(),
        })
      ).unwrap();

      setForm(initialForm);
      onHide();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать блюдо");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Новое блюдо</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group className="mb-3">
            <Form.Label>Название *</Form.Label>
            <Form.Control
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Например, курица с овощами"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <Form.Group className="col-md-4 mb-3">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="col-md-4 mb-3">
              <Form.Label>Калории</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={form.calories}
                onChange={(e) =>
                  updateField("calories", Number(e.target.value))
                }
              />
            </Form.Group>

            <Form.Group className="col-md-4 mb-3">
              <Form.Label>Минуты готовки</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={form.preparationTime}
                onChange={(e) =>
                  updateField("preparationTime", Number(e.target.value))
                }
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Категория</Form.Label>
            <Form.Select
              value={form.category}
              onChange={(e) =>
                updateField("category", e.target.value as Dish["category"])
              }
            >
              <option value="salads">Салаты</option>
              <option value="soups">Супы</option>
              <option value="main">Основные блюда</option>
              <option value="snacks">Перекусы</option>
              <option value="desserts">Десерты</option>
              <option value="drinks">Напитки</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Тип приёма пищи</Form.Label>
            <Form.Select
              value={form.mealType}
              onChange={(e) =>
                updateField("mealType", e.target.value as Dish["mealType"])
              }
            >
              <option value="breakfast">Завтрак</option>
              <option value="lunch">Обед</option>
              <option value="dinner">Ужин</option>
              <option value="snack">Перекус</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ингредиенты *</Form.Label>

            <div
              className="border rounded p-2 overflow-auto"
              style={{ maxHeight: 220 }}
            >
              {ingredients.map((ingredient) => (
                <Form.Check
                  key={ingredient.id}
                  id={`ingredient-${ingredient.id}`}
                  label={ingredient.name}
                  checked={selectedIngredients.has(ingredient.id)}
                  onChange={() => toggleIngredient(ingredient.id)}
                  className="py-1"
                />
              ))}
            </div>
          </Form.Group>

          <div className="d-flex gap-4">
            <Form.Check
              type="switch"
              label="Доступно пользователям"
              checked={form.isAvailable}
              onChange={(e) => updateField("isAvailable", e.target.checked)}
            />

            <Form.Check
              type="switch"
              label="Особое блюдо"
              checked={form.isChefSpecial}
              onChange={(e) => updateField("isChefSpecial", e.target.checked)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Сохраняем..." : "Создать блюдо"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
