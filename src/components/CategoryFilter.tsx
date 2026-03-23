import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { setSelectedCategory, selectSelectedCategory } from '../features/menu/menuSlice';
import { DishCategory } from '../app/types/menu';


const categories: { value: DishCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'Все', icon: '🍽️' },
  { value: 'salads', label: 'Салаты', icon: '🥗' },
  { value: 'main', label: 'Основное', icon: '🍖' },
  { value: 'desserts', label: 'Десерты', icon: '🍰' },
  { value: 'drinks', label: 'Напитки', icon: '🥤' },
  { value: 'specials', label: 'Особые', icon: '⭐' },
];

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  return (
    <div className="mb-4">
      <h5 className="mb-3">Категории:</h5>
      <ButtonGroup className="flex-wrap">
        {categories.map(category => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(setSelectedCategory(category.value))}
            className="mb-2 me-2"
          >
            <span className="me-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default CategoryFilter;