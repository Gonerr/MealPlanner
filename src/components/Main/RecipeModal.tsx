// components/Main/RecipeModal.tsx
import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  Star,
  X,
  BookOpen,
  ShoppingBag
} from 'lucide-react';
import { Dish } from '../../app/types/menu';

interface RecipeModalProps {
  dish: Dish;
  show: boolean;
  onHide: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ dish, show, onHide }) => {
  // Ингредиенты (можно добавить в тип Dish если нужно)
  const ingredients = [
    'Помидоры - 2 шт',
    'Огурцы - 1 шт',
    'Лук репчатый - 1/2 шт',
    'Оливковое масло - 2 ст.л.',
    'Соль, перец - по вкусу',
    'Зелень (петрушка, укроп) - по вкусу'
  ];

  // Шаги приготовления (можно добавить в тип Dish если нужно)
  const steps = [
    'Подготовить все ингредиенты',
    'Нарезать овощи кубиками',
    'Смешать в салатнице',
    'Заправить маслом и специями',
    'Украсить зеленью и подавать'
  ];

  const getDifficulty = (time: number) => {
    if (time <= 15) return { text: 'Легкий', color: '#10b981' };
    if (time <= 30) return { text: 'Средний', color: '#f59e0b' };
    return { text: 'Сложный', color: '#ef4444' };
  };

  const difficulty = getDifficulty(dish.preparationTime);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      dialogClassName="recipe-modal"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <Modal.Body className="p-0" style={{ backgroundColor: '#ffffff' }}>
        <div className="d-flex" style={{ minHeight: '600px' }}>
          {/* Левая часть - изображение и базовая информация */}
          <div className="flex-shrink-0" style={{ width: '40%' }}>
            <div 
              className="h-100 position-relative"
              style={{ 
                backgroundColor: '#f8f9fa',
                backgroundImage: `url(${dish.imageUrl || '/placeholder-recipe.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Button
                variant="light"
                onClick={onHide}
                className="position-absolute top-3 end-3 rounded-circle p-2"
                style={{ 
                  width: '40px', 
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none'
                }}
              >
                <X size={20} />
              </Button>
              
              <div className="position-absolute bottom-0 start-0 end-0 p-4 text-white"
                   style={{ 
                     background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                   }}>
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                    <h2 className="h3 mb-2 fw-bold">{dish.name}</h2>
                    <div className="d-flex align-items-center gap-3">
                      <Badge 
                        className="px-3 py-2"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        {getCategoryName(dish.category)}
                      </Badge>
                      {dish.isChefSpecial && (
                        <Badge className="bg-warning px-3 py-2">
                          <Star size={14} className="me-1" />
                          Особое блюдо
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-end">
                    {dish.price > 0 && (
                      <div className="h3 fw-bold mb-1">{dish.price.toFixed(2)} ₽</div>
                    )}
                    <div className="text-white-50">
                      {dish.isAvailable ? 'В наличии' : 'Нет в наличии'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - детали рецепта */}
          <div className="flex-grow-1 p-5" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {/* Кнопки действий в шапке */}
            <div className="d-flex justify-content-end gap-2 mb-4">
              <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-2">
                <BookOpen size={16} />
                Сохранить
              </Button>
              <Button variant="dark" size="sm" className="d-flex align-items-center gap-2">
                <ShoppingBag size={16} />
                Добавить в заказ
              </Button>
            </div>

            {/* Описание */}
            <div className="mb-5">
              <p className="text-gray-600 mb-0">{dish.description}</p>
            </div>

            {/* Статистика */}
            <div className="row mb-5">
              <div className="col-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <div className="p-3 rounded-circle mb-2" style={{ backgroundColor: '#f3f4f6' }}>
                    <Clock size={24} className="text-gray-600" />
                  </div>
                  <div className="fw-semibold">{dish.preparationTime} мин</div>
                  <div className="text-gray-500 small">Время</div>
                </div>
              </div>
              
              <div className="col-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <div className="p-3 rounded-circle mb-2" style={{ backgroundColor: '#f3f4f6' }}>
                    <Flame size={24} className="text-gray-600" />
                  </div>
                  <div className="fw-semibold">{dish.calories || '~'} ккал</div>
                  <div className="text-gray-500 small">Калории</div>
                </div>
              </div>
              
              <div className="col-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <div className="p-3 rounded-circle mb-2" style={{ backgroundColor: '#f3f4f6' }}>
                    <ChefHat size={24} className="text-gray-600" />
                  </div>
                  <div className="fw-semibold" style={{ color: difficulty.color }}>
                    {difficulty.text}
                  </div>
                  <div className="text-gray-500 small">Сложность</div>
                </div>
              </div>
            </div>

            {/* Ингредиенты */}
            <div className="mb-5">
              <h4 className="h5 fw-semibold mb-3">Ингредиенты</h4>
              <div className="row">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center gap-2 p-2 rounded" 
                         style={{ backgroundColor: '#f8f9fa' }}>
                      <div style={{ 
                        width: '6px', 
                        height: '6px', 
                        backgroundColor: '#6c757d',
                        borderRadius: '50%'
                      }} />
                      <span>{ingredient}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Шаги приготовления */}
            <div className="mb-5">
              <h4 className="h5 fw-semibold mb-3">Приготовление</h4>
              <div className="position-relative">
                {/* Вертикальная линия */}
                <div className="position-absolute start-0 top-0 bottom-0" 
                     style={{ 
                       width: '2px', 
                       backgroundColor: '#e9ecef',
                       marginLeft: '15px'
                     }} />
                
                {steps.map((step, index) => (
                  <div key={index} className="d-flex align-items-start mb-4 position-relative">
                    {/* Номер шага */}
                    <div className="flex-shrink-0 me-4 position-relative z-1">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          backgroundColor: '#0d6efd',
                          color: 'white',
                          fontWeight: '600'
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Текст шага */}
                    <div className="flex-grow-1">
                      <p className="mb-0 text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Советы и заметки */}
            <div className="p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <h5 className="h6 fw-semibold mb-2">👨‍🍳 Советы шефа</h5>
              <p className="text-gray-600 mb-0 small">
                Для лучшего вкуса дайте салату настояться 10-15 минут перед подачей.
                Свежая зелень добавляется в последний момент для сохранения аромата.
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// Вспомогательная функция для названия категории
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