// components/shared/CategoryNav.tsx
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  // Функция для получения Bootstrap variant по цвету
  const getButtonVariant = (color: string, isActive: boolean) => {
    if (isActive) {
      switch (color) {
        case 'green': return 'success';
        case 'blue': return 'primary';
        case 'amber': return 'warning';
        case 'purple': return 'info';
        case 'pink': return 'danger';
        case 'cyan': return 'info';
        case 'rose': return 'danger';
        case 'gray': 
        default: return 'dark';
      }
    }
    return 'outline-secondary';
  };

  // Функция для получения иконки по категории
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'all': return '📁';
      case 'salads': return '🥗';
      case 'soups': return '🍲';
      case 'main': return '🍛';
      case 'desserts': return '🍰';
      case 'snacks': return '🥪';
      case 'drinks': return '🥤';
      case 'specials': return '⭐';
      default: return '🍽️';
    }
  };

  return (
    <div className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0 text-dark fw-semibold">Категории рецептов</h2>
        <div className="d-none d-md-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-funnel"></i> Фильтры
          </button>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-sort-down"></i> Сортировка
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`btn ${isActive ? '' : 'btn-outline-'}${getButtonVariant(category.color, isActive)} d-flex align-items-center gap-2`}
              style={{
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                transition: 'all 0.2s'
              }}
            >
              <span>{getCategoryIcon(category.id)}</span>
              <span className="fw-medium">{category.name}</span>
              {isActive && (
                <span className="badge bg-white text-dark ms-1">
                  <i className="bi bi-check"></i>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};