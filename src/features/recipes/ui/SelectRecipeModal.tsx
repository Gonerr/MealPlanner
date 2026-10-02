import { RootState } from "@/app/store";
import { clearSelection } from "@/features/menu/menuSlice";
import { apiClient } from "@/lib/api-client";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RecipesSection from "./RecipesSections";

interface Props {
  show: boolean;
  onClose: () => void;
  onSaved?: () => void | Promise<void>;
  mealType: string | null;
  date: string;
}
const SelectRecipeModal: React.FC<Props> = ({
  show,
  onClose,
  onSaved,
  mealType,
  date,
}) => {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const selected = useSelector((state: any) => state.menu.selected);
  const householdId = useSelector(
    (state: RootState) => state.households.selectedHouseholdId
  );
  const handleSave = async () => {
    try {
      if (householdId === null) return;
      setSaving(true);
      setError("");

      for (const item of selected) {
        const response = await apiClient.addToMenu(
          householdId,
          date,
          item.dish.id,
          item.mealType,
          item.grams,
          item.dish.price
        );
        if (!response.ok) throw new Error("Не удалось добавить блюдо в меню");
      }

      dispatch(clearSelection());

      await onSaved?.();

      onClose();
    } catch (error) {
      console.error("Не удалось добавить блюда на день из-за ошибки: ", error);
      setError(error instanceof Error ? error.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      dialogClassName="recipe-picker-dialog"
    >
      <Modal.Header closeButton className="recipe-picker-modal-header">
        <div>
          <span className="eyebrow">
            <Sparkles size={15} /> СОБИРАЕМ МЕНЮ
          </span>
          <Modal.Title>Что приготовим?</Modal.Title>
          <p>Выбери несколько блюд — они появятся в меню выбранного дня.</p>
        </div>
      </Modal.Header>

      <Modal.Body className="recipe-picker-modal-body">
        <RecipesSection mealType={mealType} />
      </Modal.Body>

      <Modal.Footer className="recipe-picker-modal-footer">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <span className="text-muted">
            Выбрано: <strong>{selected.length}</strong>
          </span>

          <Button
            disabled={selected.length === 0 || saving}
            onClick={handleSave}
            className="recipe-picker-save"
          >
            {saving ? "Добавляем…" : "Добавить в меню"}
          </Button>
        </div>
        {error && (
          <p className="inventory-error w-100 mb-0" role="alert">
            {error}
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SelectRecipeModal;
