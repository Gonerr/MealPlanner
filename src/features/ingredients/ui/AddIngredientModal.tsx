import { AppDispatch } from "@/app/store";
import { AddModalProps } from "@/features/dishes/types";
import { Ingredient } from "@/types/menu";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createIngredient } from "../ingredientsSlice";

const initialForm: Omit<Ingredient, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "other",
  isAvailable: true,
  calories: 0,
};

export default function AddIngredientModal({ show, onHide }: AddModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const updateField = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("У ингредиента должно быть название");
      return;
    }

    try {
      setIsSaving(true);

      await dispatch(
        createIngredient({
          ...form,
          name: form.name.trim(),
          description: form.description.trim(),
        })
      ).unwrap();

      setForm(initialForm);
      onHide();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось создать ингредиент"
      );
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
              placeholder="Например, куриное филе"
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
              <Form.Label>Цена за 1 кг</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="col-md-4 mb-3">
              <Form.Label>Калории на 1 кг</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={form.calories}
                onChange={(e) =>
                  updateField("calories", Number(e.target.value))
                }
              />
            </Form.Group>
          </div>

          <div className="d-flex gap-4">
            <Form.Check
              type="switch"
              label="Доступно пользователям"
              checked={form.isAvailable}
              onChange={(e) => updateField("isAvailable", e.target.checked)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Сохраняем..." : "Добавить ингредиент"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
