// components/Main/RecipeCard.tsx
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Dish } from '../../types/menu';

interface RecipeCardProps {
  dish: Dish;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ dish }) => {
  // Определяем сложность по времени приготовления
  const getDifficulty = (time: number) => {
    if (time <= 15) return { text: 'Легкий', variant: 'success' };
    if (time <= 30) return { text: 'Средний', variant: 'warning' };
    return { text: 'Сложный', variant: 'danger' };
  };

  const difficulty = getDifficulty(dish.preparationTime);
  const categoryIcon = getCategoryIcon(dish.category);

  return (
    <Card className="h-100 border-0 shadow-sm hover-lift"
      style={{ 
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}>
      {/* Изображение блюда */}
      <div style={{ 
        height: '180px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Card.Img 
          variant="top" 
          src={dish.imageUrl || '/placeholder-recipe.jpg'} 
          alt={dish.name}
          style={{ 
            height: '100%', 
            width: '100%', 
            objectFit: 'cover' 
          }}
        />
        
        {/* Бейджи поверх изображения */}
        <div className="position-absolute top-0 start-0 p-2">
          <Badge bg={difficulty.variant} className="px-2 py-1">
            {difficulty.text}
          </Badge>
        </div>
        
        {dish.isChefSpecial && (
          <div className="position-absolute top-0 end-0 p-2">
            <Badge bg="warning" className="px-2 py-1">
              <i className="bi bi-star-fill me-1"></i> Шеф
            </Badge>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1 me-2">
            <Card.Title className="h6 mb-1 text-truncate">
              {dish.name}
            </Card.Title>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="text-muted">{categoryIcon}</span>
              <small className="text-muted">
                {getCategoryName(dish.category)}
              </small>
            </div>
          </div>
          
          {dish.price > 0 && (
            <div className="text-end">
              <span className="h5 fw-bold text-dark">{dish.price.toFixed(2)} ₽</span>
            </div>
          )}
        </div>

        <Card.Text className="text-muted small mb-3" style={{ 
          height: '40px', 
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {dish.description}
        </Card.Text>

        {/* Мета информация */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-clock text-muted"></i>
              <small className="text-muted">{dish.preparationTime} мин</small>
            </div>
            
            {dish.calories && (
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-fire text-muted"></i>
                <small className="text-muted">{dish.calories} ккал</small>
              </div>
            )}
          </div>
          
          <Badge bg={dish.isAvailable ? "success" : "secondary"} className="px-2 py-1">
            {dish.isAvailable ? '✓ Доступно' : '✗ Нет в наличии'}
          </Badge>
        </div>

        {/* Теги */}
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1">
            {dish.preparationTime <= 15 && (
              <span className="badge bg-light text-dark border">Быстро</span>
            )}
            {dish.calories && dish.calories < 300 && (
              <span className="badge bg-light text-dark border">Легкое</span>
            )}
            {dish.isChefSpecial && (
              <span className="badge bg-warning text-dark">Особое</span>
            )}
          </div>
        </div>

        {/* Кнопка действий */}
        <Button 
          variant="dark" 
          className="mt-auto w-100 d-flex align-items-center justify-content-center gap-2"
          style={{ borderRadius: '8px' }}
        >
          <i className="bi bi-book"></i>
          Посмотреть рецепт
        </Button>
      </Card.Body>
    </Card>
  );
};

// Вспомогательные функции
const getCategoryIcon = (category: string) => {
  switch (category) {
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

const getCategoryName = (category: string) => {
  switch (category) {
    case 'salads': return 'Салат';
    case 'soups': return 'Суп';
    case 'main': return 'Основное';
    case 'desserts': return 'Десерт';
    case 'snacks': return 'Перекус';
    case 'drinks': return 'Напиток';
    case 'specials': return 'Особое';
    default: return 'Блюдо';
  }
};