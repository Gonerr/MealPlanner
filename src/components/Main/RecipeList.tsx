// components/shared/CategoryNav.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

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
  const getButtonStyle = (category: Category, isActive: boolean) => {
    if (isActive) {
      return {
        backgroundColor: getColor(category.color),
        color: 'white',
        borderColor: getColor(category.color)
      };
    }
    
    return {
      backgroundColor: 'transparent',
      color: '#6c757d',
      borderColor: 'rgba(0,0,0,0.1)'
    };
  };

  const getColor = (color: string) => {
    switch (color) {
      case 'green': return '#28a745';
      case 'blue': return '#007bff';
      case 'amber': return '#ffc107';
      case 'purple': return '#6f42c1';
      case 'pink': return '#e83e8c';
      case 'cyan': return '#17a2b8';
      case 'rose': return '#dc3545';
      case 'gray': 
      default: return '#343a40';
    }
  };

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
    <div className="py-2">
      <div className="d-flex gap-2 overflow-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .category-scroll::-webkit-scrollbar { display: none; }
        `}</style>
        
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <Button
              key={category.id}
              variant={isActive ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="d-flex align-items-center gap-2 rounded-pill px-3 py-2"
              style={{
                ...getButtonStyle(category, isActive),
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                borderWidth: '1px',
                borderStyle: 'solid',
                flexShrink: 0
              }}
            >
              <span className="fs-6">{getCategoryIcon(category.id)}</span>
              <span className="fw-medium">{category.name}</span>
              {isActive && (
                <span className="ms-1" style={{ fontSize: '12px' }}>
                  ✓
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};