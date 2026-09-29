import { RootState } from "@/app/store";
import { clearSelection } from "@/features/menu/menuSlice";
import { apiClient } from "@/lib/api-client";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RecipesSection from "./RecipesSections";

interface Props {
  show: boolean;
  onClose: () => void;
  onSaved?: () => void;
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
  const selected = useSelector((state: any) => state.menu.selected);
  const householdId = useSelector(
    (state: RootState) => state.households.selectedHouseholdId
  );
  const handleSave = async () => {
    try {
      if (householdId === null) return;

      for (const item of selected) {
        await apiClient.addToMenu(
          householdId,
          date,
          item.dish.id,
          item.mealType,
          item.grams,
          item.dish.price
        );
      }

      dispatch(clearSelection());

      await onSaved?.();

      onClose();
    } catch (error) {
      console.error("Не удалось добавить блюда на день из-за ошибки: ", error);
    }
  };
  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Выберите блюдо</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <RecipesSection mealType={mealType} />
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-between w-100 align-items-center">
          <span className="text-muted">Выбрано блюд: {selected.length}</span>

          <Button
            disabled={selected.length === 0}
            onClick={handleSave}
            style={{
              background: "var(--main-color)",
              color: "black",
              border: "none",
              fontSize: "medium",
            }}
          >
            Добавить выбранное
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectRecipeModal;
