import React from 'react';
import { CheckIcon } from '../icons';
import { Utensils } from 'lucide-react';
import { EmptyStateProps } from '../../app/types/IEmptyStateProps';

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  activeCategory,
  categories = [],
  onResetCategory
}) => {
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 px-3">
      <div className="d-flex align-items-center gap-3 mb-3">
          <h3 className="h5 fw-semibold text-dark mb-0">
            {searchQuery 
              ? `По запросу "${searchQuery}" ничего не найдено`
              : currentCategory
              ? `В категории "${currentCategory.name}" пока нет рецептов`
              : 'Рецепты не найдены'
            }
          </h3>
           <Utensils size={24} className="text-secondary" />
      </div>
     
      <p className="text-secondary text-center mb-4" style={{ maxWidth: '400px'}}>
        {searchQuery 
          ? 'Попробуйте изменить поисковый запрос или проверьте правильность написания.'
          : 'Добавьте новые рецепты в эту категорию или выберите другую категорию.'
        }
      </p>

      <div className="d-flex gap-3 mb-5">
        {onResetCategory && activeCategory && activeCategory !== 'all' && (
          <button 
            onClick={onResetCategory}
            className="btn btn-outline-secondary"
          >
            Показать все категории
          </button>
        )}
        
        <button className="btn btn-dark">
          Добавить рецепт
        </button>
      </div>

      {/* Подсказки */}
      <div className="border-top pt-4 w-100" style={{maxWidth: '400px'}}>
        <h4 className="text-dark text-center  fw-semibold mb-3">Попробуйте:</h4>
        <ul className="list-unstyled text-secondary">
          <li className="d-flex align-items-center gap-2 mb-2 ">
            <CheckIcon />
            Выбрать другую категорию
          </li>
          <li className="d-flex align-items-center gap-2 mb-2">
            <CheckIcon />
            Использовать другие ключевые слова
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckIcon />
            Проверить фильтры
          </li>
        </ul>
      </div>
    </div>
  );
};