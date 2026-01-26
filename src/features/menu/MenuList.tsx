import React, { useState } from 'react';
import { Row, Col, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import MenuItem from './menuItem';
import { 
  selectFilteredDishes, 
  selectSelectedCategory,
  setSelectedCategory 
} from './menuSlice';
import { DishCategory } from '../../types/menu';

const MenuList: React.FC = () => {
  const dispatch = useDispatch();
  const filteredDishes = useSelector(selectFilteredDishes);
  const selectedCategory = useSelector(selectSelectedCategory);
  const [sortBy, setSortBy] = useState<'time' | 'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Сортировка блюд
  const sortedDishes = [...filteredDishes].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'time':
        comparison = a.preparationTime - b.preparationTime;
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Группировка по категориям
  const dishesByCategory = sortedDishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {} as Record<DishCategory, typeof sortedDishes>);

  // Получение русских названий категорий
  const getCategoryLabel = (category: DishCategory): string => {
    switch (category) {
      case 'salads': return '🍳 Салаты';
      case 'soups': return '🍲 Супы';
      case 'main': return '🍽️ Первое';
      case 'snacks': return '🥪 Перекусы';
      case 'desserts': return '🍰 Десерты';
      case 'drinks': return '🥖 Напитки';
      case 'specials': return '⭐ Особые рецепты';
      default: return category;
    }
  };

  // Сброс фильтров
  const handleResetFilters = () => {
    dispatch(setSelectedCategory('all'));
  };

  if (sortedDishes.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <h4>Рецепты не найдены</h4>
        <p>
          Попробуйте изменить параметры поиска или фильтрации.
        </p>
        {selectedCategory !== 'all' && (
          <Button 
            variant="outline-primary" 
            onClick={handleResetFilters}
            className="mt-2"
          >
            Сбросить фильтры
          </Button>
        )}
      </Alert>
    );
  }

  return (
    <div>
      {/* Панель управления сортировкой */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted me-2">
            {(FaFilter as any)} Сортировка:
          </span>
          <ButtonGroup size="sm">
            <Button
              variant={sortBy === 'name' ? 'primary' : 'outline-secondary'}
              onClick={() => setSortBy('name')}
            >
              По названию
            </Button>
            <Button
              variant={sortBy === 'time' ? 'primary' : 'outline-secondary'}
              onClick={() => setSortBy('time')}
            >
              По времени
            </Button>
            <Button
              variant={sortBy === 'price' ? 'primary' : 'outline-secondary'}
              onClick={() => setSortBy('price')}
            >
              По стоимости
            </Button>
          </ButtonGroup>
          
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="ms-2"
          >
            {sortOrder === 'asc' ? (FaSortAmountDown as any) : (FaSortAmountUp as any)}
          </Button>
        </div>
        
        <div className="text-muted">
          Найдено: <strong>{sortedDishes.length}</strong> рецептов
        </div>
      </div>

      {/* Отображение блюд */}
      {selectedCategory === 'all' ? (
        // Показать все категории
        Object.entries(dishesByCategory).map(([category, dishes]) => (
          <div key={category} className="mb-5">
            <h3 className="mb-4 border-bottom pb-2">
              {getCategoryLabel(category as DishCategory)}
              <span className="badge bg-secondary ms-2">{dishes.length}</span>
            </h3>
            
            <Row xs={1} md={2} lg={3} className="g-4">
              {dishes.map(dish => (
                <Col key={dish.id}>
                  <MenuItem dish={dish} isAdminMode={false} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      ) : (
        // Показать только выбранную категорию
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">
              {getCategoryLabel(selectedCategory)}
              <span className="badge bg-secondary ms-2">{sortedDishes.length}</span>
            </h3>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleResetFilters}
            >
              Показать все категории
            </Button>
          </div>
          
          <Row xs={1} md={2} lg={3} className="g-4">
            {sortedDishes.map(dish => (
              <Col key={dish.id}>
                <MenuItem dish={dish} isAdminMode={false} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Информация о сортировке */}
      <div className="mt-4 pt-3 border-top">
        <div className="alert alert-light">
          <small className="text-muted">
            <strong>💡 Подсказка:</strong> 
            {sortBy === 'name' && ' Отсортировано по названию '}
            {sortBy === 'time' && ' Отсортировано по времени приготовления '}
            {sortBy === 'price' && ' Отсортировано по примерной стоимости '}
            {sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'}.
            Щелкните по рецепту, чтобы увидеть детали и список ингредиентов.
          </small>
        </div>
      </div>
    </div>
  );
};

export default MenuList;