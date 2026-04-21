import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { Badge, Button, Card, Form, Modal } from "react-bootstrap";
import {deleteRecipe, updateRecipe, selectIsAdminMode, selectLoading, selectError} from "./menuSlice";
import IngredientList from "../../components/IngredientList";
import { FaClock, FaEdit, FaEye, FaFire, FaStar, FaTrash } from "react-icons/fa";
import { Dish } from "../../app/types/menu";
import type {AppDispatch, RootState} from "../../app/store"
import { number } from "framer-motion";
import { CakeSlice, ForkKnife, GlassWater, Popcorn, Salad, Soup, Sparkles } from "lucide-react";

interface MenuItemProps {
    dish: Dish;
    isAdminMode: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ dish }) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const isAdminMode = useSelector((state: RootState) => selectIsAdminMode(state));
    const loading = useSelector((state: RootState) => selectLoading(state));
    const error = useSelector((state: RootState) => selectError(state));

    const [showDetails, setShowDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState(dish);

    const handleSave = useCallback(async() => {
      try {
        await dispatch(updateRecipe({id: dish.id, recipe: editForm})).unwrap();
        setShowEditModal(false);
      } catch (error) {
        console.log('Ошибка сохранения рецепта: ', error)
      }
    },[dispatch, dish.id, editForm]);

    const handleDelete = useCallback(async() => {
      if (confirm('Удалить блюдо?')) {
        try {
          await dispatch(deleteRecipe(dish.id)).unwrap();
        } catch (error) {
          console.log('Ошибка удаления рецепта: ', error)
        } 
      }
    },[dispatch, dish.id]);

    const handleToggleAvailability = useCallback(() => {
      const newAvailability = !dish.isAvailable;
      dispatch(updateRecipe({
        id: dish.id,
        recipe: {isAvailable: newAvailability}
      }))
    }, [dispatch, dish.id, dish.isAvailable]);

  const categoryLabels: Record<Dish['category'], React.ReactNode> = {
        salads: <><Salad className="me-1 h-3 w-3"/> Салаты</>,
        soups:  <><Soup className="me-1 h-3 w-3"/> Супы</>,
        main: <><ForkKnife className="me-1 h-3 w-3"/> Основное</>,
        desserts: <><CakeSlice className="me-1 h-3 w-3"/>Десерты</>,
        snacks: <><Popcorn className="me-1 h-3 w-3"/>Закуски</>,
        drinks: <><GlassWater className="me-1 h-3 w-3"/>Напитки</>,
        specials: <><Sparkles className="me-1 h-3 w-3"/>Особое</>
    };

    return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Card.Title className="mb-1">
                {dish.name}
                {dish.isChefSpecial && (
                  <Badge bg="warning" className="ms-2">
                    {(FaStar as any)({className: "me-1"})}Шеф-блюдо
                  </Badge>
                )}
              </Card.Title>
              <Badge bg={dish.category === 'specials' ? 'danger' : 'secondary'} className="mb-2">
                {categoryLabels[dish.category]}
              </Badge>
            </div>
            <div className="text-end">
              <div className="h4 text-primary">{dish.price}₽</div>
              <small className="text-muted">цена</small>
            </div>
          </div>

          <Card.Text className="text-muted mb-3">{dish.description}</Card.Text>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Badge bg="light" text="dark" className="me-2">
                {(FaClock as any)({className: "me-1"})}
                  {dish.preparationTime} мин
              </Badge>
              {dish.calories && (
                <Badge bg="light" text="dark">
                  {(FaFire as any)({className: "me-1"})}{dish.calories} ккал
                </Badge>
              )}
            </div>
            <Badge bg={dish.isAvailable ? 'success' : 'danger'}>
              {dish.isAvailable ? 'В наличии' : 'Нет в наличии'}
            </Badge>
          </div>

          <div className="d-flex justify-content-between">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setShowDetails(true)}
            >
              {(FaEye as any)({className: "me-1"})}Ингредиенты
            </Button>

            {isAdminMode && (
              <div>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => setShowEditModal(true)}
                >
                  {(FaEdit as any)}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {(FaTrash as any)}
                </Button>
                <Button
                  variant={dish.isAvailable ? 'outline-secondary' : 'outline-success'}
                  size="sm"
                  onClick={handleToggleAvailability}
                  disabled={loading}
                >
                  {dish.isAvailable ? 'Скрыть' : 'Показать'}
                </Button>
              </div>
            )}
          </div>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </Card.Body>
      </Card>

      {/* Модальное окно с деталями */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{dish.name} - Состав</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <h6>Информация:</h6>
              <ul className="list-unstyled">
                <li><strong>Категория:</strong> {categoryLabels[dish.category]}</li>
                <li><strong>Цена:</strong> {dish.price}₽</li>
                <li><strong>Время приготовления:</strong> {dish.preparationTime} мин</li>
                {dish.calories && <li><strong>Калории:</strong> {dish.calories} ккал</li>}
                <li><strong>Описание:</strong> {dish.description}</li>
              </ul>
            </div>
            <div className="col-md-6">
              <IngredientList ingredientIds={dish.ingredients} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно редактирования (админ) */}
      {isAdminMode && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать блюдо</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Цена (₽)</Form.Label>
                <Form.Control
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Время приготовления (мин)</Form.Label>
                <Form.Control
                  type="number"
                  value={editForm.preparationTime}
                  onChange={(e) => setEditForm({ ...editForm, preparationTime: Number(e.target.value) })}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Особое блюдо шефа"
                checked={editForm.isChefSpecial}
                onChange={(e) => setEditForm({ ...editForm, isChefSpecial: e.target.checked })}
                className="mb-3"
              />

              <Form.Check
                type="checkbox"
                label="Доступно для заказа"
                checked={editForm.isAvailable}
                onChange={(e) => setEditForm({ ...editForm, isAvailable: e.target.checked })}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};


export default MenuItem;