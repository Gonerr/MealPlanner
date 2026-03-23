import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Modal, Table, Badge } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { addDish, selectAllDishes } from './menuSlice';
import { addIngredient, deleteIngredient, selectAllIngredients } from '../ingredients/ingredientsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Dish, Ingredient, DishCategory } from '../../app/types/menu';

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch();
    const dishes = useSelector(selectAllDishes);
    const ingredients = useSelector(selectAllIngredients);

    const [showAddDish, setShowAddDish] = useState(false);
    const [showAddIngredient, setShowAddIngredient] = useState(false);
    const [newDish, setNewDish] = useState<Omit<Dish, 'id'>>({
        name: '',
        description: '',
        price: 0,
        category: 'main',
        ingredients: [],
        preparationTime: 35,
        isAvailable: true,
        isChefSpecial: false,
    });

    const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id'>>({
        name: '',
        description: '',
        isAvailable: false,
        category: 'other',
    });

    const handleAddDish = () => {
        if (newDish.name && newDish.price > 0) {
            dispatch(addDish(newDish));
            setNewDish({
                name: '',
                description: '',
                price: 0,
                category: 'main',
                ingredients: [],
                preparationTime: 15,
                isAvailable: true,
                isChefSpecial: false,
            });
            setShowAddDish(false);
        }
    };

    const handleAddIngredient = () => {
        if (newIngredient.name) {
            dispatch(addIngredient({ ...newIngredient, id: 0}));
            setNewIngredient({
                name: '',
                description: '',
                isAvailable: false,
                category: 'other',
            });
            setShowAddIngredient(false);
        }
    };

    // Функция для получения русского названия категории ингредиента
    const getIngredientCategoryLabel = (category: Ingredient['category']): string => {
        switch (category) {
            case 'vegetable': return 'Овощи';
            case 'meat': return 'Мясо';
            case 'dairy': return 'Молочные продукты';
            case 'spice': return 'Острое';
            case 'other': return 'Прочее';
            default: return category;
        }
    };

    return (
        <div className="mb-5">
            <h3 className="mb-4 border-bottom pb-2">Панель администратора</h3>

            <div className="row mb-4">
                <div className="col-md-6">
                    <Card className="h-100">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Управление блюдами</h5>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-muted">
                                Всего блюд: {dishes.length} |
                                Доступно: {dishes.filter(d => d.isAvailable).length}
                            </p>
                            <Button variant="success" onClick={() => setShowAddDish(true)}>
                                 {(FaPlus as any)({className: "me-2"})}Добавить новое блюдо
                            </Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-6">
                    <Card className="h-100">
                        <Card.Header className="bg-info text-white">
                            <h5 className="mb-0">Управление ингредиентами</h5>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-muted">
                                Всего ингредиентов: {ingredients.length} |
                                Аллергенов: {ingredients.filter(i => i.isAvailable).length}
                            </p>
                            <Button variant="info" onClick={() => setShowAddIngredient(true)}>
                                {(FaPlus as any)({className: "me-2"})}Добавить ингредиент
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Список ингредиентов */}
            <Card className="mb-4">
                <Card.Header>
                    <h5 className="mb-0">Список ингредиентов</h5>
                </Card.Header>
                <Card.Body>
                    {ingredients.length === 0 ? (
                        <p className="text-muted">Нет ингредиентов</p>
                    ) : (
                        <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Категория</th>
                                    <th>Описание</th>
                                    <th>Аллерген</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map(ingredient => (
                                    <tr key={ingredient.id}>
                                        <td>{ingredient.name}</td>
                                        <td>
                                            <Badge bg={
                                                ingredient.category === 'vegetable' ? 'success' :
                                                    ingredient.category === 'meat' ? 'danger' :
                                                        ingredient.category === 'dairy' ? 'info' :
                                                            ingredient.category === 'spice' ? 'warning' : 'secondary'
                                            }>
                                                {getIngredientCategoryLabel(ingredient.category)}
                                            </Badge>
                                        </td>
                                        <td>{ingredient.description}</td>
                                        <td>
                                            {ingredient.isAvailable ? (
                                                <Badge bg="danger">Да</Badge>
                                            ) : (
                                                <Badge bg="success">Нет</Badge>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => dispatch(deleteIngredient(ingredient.id))}
                                            >
                                                {(FaTrash as any)({className: "me-2"})}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* Модальное окно добавления блюда */}
            <Modal show={showAddDish} onHide={() => setShowAddDish(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новое блюдо</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Название блюда</Form.Label>
                            <Form.Control
                                value={newDish.name}
                                onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                                placeholder="Например: Салат Цезарь"
                                required
                            />
                            {!newDish.name && (
                                <Form.Text className="text-danger">
                                    Пожалуйста, введите название блюда
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newDish.description}
                                onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                                placeholder="Опишите блюдо..."
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Цена (₽)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        step="10"
                                        value={newDish.price}
                                        onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                                        required
                                    />
                                    {newDish.price <= 0 && (
                                        <Form.Text className="text-danger">
                                            Цена должна быть больше 0
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Категория</Form.Label>
                                    <Form.Select
                                        value={newDish.category}
                                        onChange={(e) => setNewDish({ ...newDish, category: e.target.value as DishCategory })}
                                    >
                                        <option value="starters">🥗 Закуски</option>
                                        <option value="main">🍖 Основное блюдо</option>
                                        <option value="desserts">🍰 Десерты</option>
                                        <option value="drinks">🥤 Напитки</option>
                                        <option value="specials">⭐ Особые блюда</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Время приготовления (мин)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="180"
                                        value={newDish.preparationTime}
                                        onChange={(e) => setNewDish({ ...newDish, preparationTime: Number(e.target.value) })}
                                    />
                                    <Form.Text className="text-muted">
                                        Время в минутах
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Выберите ингредиенты</Form.Label>
                                    <Form.Select
                                        multiple
                                        value={newDish.ingredients.map(id => id.toString())}
                                        onChange={(e) => {
                                            const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
                                            const numericIds = selectedIds.map(id => parseInt(id, 10));
                                            setNewDish({ ...newDish, ingredients: numericIds });
                                        }}
                                    >
                                        {ingredients.map(ingredient => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name} ({getIngredientCategoryLabel(ingredient.category)})
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text className="text-muted">
                                        Удерживайте Ctrl для выбора нескольких ингредиентов
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Особое блюдо шефа"
                                checked={newDish.isChefSpecial}
                                onChange={(e) => setNewDish({ ...newDish, isChefSpecial: e.target.checked })}
                            />

                            <Form.Check
                                type="checkbox"
                                label="Доступно для заказа"
                                checked={newDish.isAvailable}
                                onChange={(e) => setNewDish({ ...newDish, isAvailable: e.target.checked })}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label>Выбранные ингредиенты:</Form.Label>
                            <div className="border rounded p-2">
                                {newDish.ingredients.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-1">
                                        {newDish.ingredients.map(ingId => {
                                            const ingredient = ingredients.find(i => i.id === ingId);
                                            return ingredient ? (
                                                <Badge key={ingId} bg="secondary" className="me-1 mb-1">
                                                    {ingredient.name}
                                                </Badge>
                                            ) : null;
                                        })}
                                    </div>
                                ) : (
                                    <small className="text-muted">Ингредиенты не выбраны</small>
                                )}
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddDish(false)}>
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddDish}
                        disabled={!newDish.name || newDish.price <= 0}
                    >
                        Добавить блюдо
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Модальное окно добавления ингредиента */}
            <Modal show={showAddIngredient} onHide={() => setShowAddIngredient(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить ингредиент</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Название ингредиента</Form.Label>
                            <Form.Control
                                value={newIngredient.name}
                                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                                placeholder="Например: Помидор"
                                required
                            />
                            {!newIngredient.name && (
                                <Form.Text className="text-danger">
                                    Пожалуйста, введите название ингредиента
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={newIngredient.description}
                                onChange={(e) => setNewIngredient({ ...newIngredient, description: e.target.value })}
                                placeholder="Опишите ингредиент..."
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Категория ингредиента</Form.Label>
                            <Form.Select
                                value={newIngredient.category}
                                onChange={(e) => setNewIngredient({
                                    ...newIngredient,
                                    category: e.target.value as Ingredient['category']
                                })}
                            >
                                <option value="vegetable">🥦 Овощи</option>
                                <option value="meat">🥩 Мясо</option>
                                <option value="dairy">🧀 Молочные продукты</option>
                                <option value="spice">🌿 Специи</option>
                                <option value="other">📦 Прочее</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="alert alert-info">
                            <small>
                                <strong>Примечание:</strong> После добавления ингредиента вы сможете использовать его при создании блюд.
                            </small>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddIngredient(false)}>
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddIngredient}
                        disabled={!newIngredient.name}
                    >
                        Добавить ингредиент
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Статистика */}
            <Card className="mt-4">
                <Card.Header>
                    <h5 className="mb-0">Статистика меню</h5>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="text-center">
                                <h3>{dishes.length}</h3>
                                <p className="text-muted">Всего блюд</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <h3 className="text-success">
                                    {dishes.filter(d => d.isAvailable).length}
                                </h3>
                                <p className="text-muted">Доступно</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <h3 className="text-warning">
                                    {dishes.filter(d => d.isChefSpecial).length}
                                </h3>
                                <p className="text-muted">Особые блюда</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <h3 className="text-info">{ingredients.length}</h3>
                                <p className="text-muted">Ингредиентов</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminPanel;