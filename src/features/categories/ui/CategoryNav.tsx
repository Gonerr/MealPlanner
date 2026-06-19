// components/shared/CategoryNav.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import {
  Folder, Salad, Soup, Beef, Cake,
  Star, Utensils, Pizza, Coffee
} from 'lucide-react';

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
  const iconProps = { size: 16 };
  
  // Минималистичные цвета для активных табов
  const getActiveColor = (color: string) => {
    switch (color) {
      case 'green': return '#10b981'; // Emerald
      case 'blue': return '#3b82f6'; // Blue-500
      case 'amber': return '#f59e0b'; // Amber-500
      case 'purple': return '#8b5cf6'; // Violet-500
      case 'pink': return '#ec4899'; // Pink-500
      case 'cyan': return '#06b6d4'; // Cyan-500
      case 'rose': return '#f43f5e'; // Rose-500
      case 'gray': 
      default: return '#374151'; // Gray-700
    }
  };

  // Функция для получения иконки по категории
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'all': return <Folder {...iconProps} />;
      case 'salads': return <Salad {...iconProps} />;
      case 'soups': return <Soup {...iconProps} />;
      case 'main': return <Beef {...iconProps} />;
      case 'desserts': return <Cake {...iconProps} />;
      case 'snacks': return <Pizza {...iconProps} />;
      case 'drinks': return <Coffee {...iconProps} />;
      case 'specials': return <Star {...iconProps} />;
      default: return <Utensils {...iconProps} />;
    }
  };

  return (
    <div className="w-100">
      {/* Контейнер навигации */}
      <div className="nav nav-tabs border-0 w-100 d-flex" style={{ 
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <style>{`
          .nav-tabs::-webkit-scrollbar { display: none; }
        `}</style>
        
        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          const activeColor = getActiveColor(category.color);
          
          return (
            <div 
              key={category.id} 
              className="nav-item flex-grow-1 text-center"
              style={{ 
                flex: '1 0 0',
                minWidth: '0',
                maxWidth: '100%'
              }}
            >
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`
                  nav-link d-flex flex-column align-items-center justify-content-center
                  w-100 h-100 border-0 rounded-0 px-2 py-3
                  ${isActive ? 'fw-semibold' : 'fw-normal'}
                  position-relative
                `}
                style={{
                  backgroundColor: isActive ? '#f8fafc' : 'transparent',
                  color: isActive ? activeColor : '#6b7280',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <div className="d-flex align-items-center mb-1">
                  <span 
                    className="me-2 d-flex align-items-center"
                    style={{ 
                      color: isActive ? activeColor : '#9ca3af',
                      transition: 'color 0.2s'
                    }}
                  >
                    {getCategoryIcon(category.id)}
                  </span>
                  <span className="text-nowrap">{category.name}</span>
                </div>
                
                {/* Активный индикатор */}
                {isActive && (
                  <div 
                    className="position-absolute bottom-0 start-0 end-0"
                    style={{ 
                      height: '2px',
                      backgroundColor: activeColor,
                      borderRadius: '1px'
                    }}
                  />
                )}
                
                {/* Граница между табами (кроме последнего) */}
                {index < categories.length - 1 && (
                  <div 
                    className="position-absolute end-0 top-2 bottom-2"
                    style={{ 
                      width: '1px',
                      backgroundColor: 'rgba(0,0,0,0.08)'
                    }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};