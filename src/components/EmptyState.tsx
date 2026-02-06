// EmptyState.tsx
import React from 'react';

// Добавляем импорт иконок
import { NoRecipesIcon, CheckIcon } from './icons'; // или ваш путь к иконкам

// Обновляем интерфейс
interface EmptyStateProps {
  searchQuery?: string;
  activeCategory?: string;
  categories?: Array<{ id: string; name: string }>;
  onResetCategory?: () => void; // Добавляем эту пропсу
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  activeCategory,
  categories = [],
  onResetCategory // Используем пропсу
}) => {
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-6 text-gray-300">
        <NoRecipesIcon />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {searchQuery 
          ? `По запросу "${searchQuery}" ничего не найдено`
          : currentCategory
          ? `В категории "${currentCategory.name}" пока нет рецептов`
          : 'Рецепты не найдены'
        }
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        {searchQuery 
          ? 'Попробуйте изменить поисковый запрос или проверьте правильность написания.'
          : 'Добавьте новые рецепты в эту категорию или выберите другую категорию.'
        }
      </p>

      <div className="flex gap-4">
        {onResetCategory && activeCategory && activeCategory !== 'all' && (
          <button 
            onClick={onResetCategory}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Показать все категории
          </button>
        )}
        
        <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Добавить рецепт
        </button>
      </div>

      {/* Подсказки */}
      <div className="mt-8 pt-8 border-t border-gray-200 w-full max-w-md">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Попробуйте:</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            <CheckIcon />
            Выбрать другую категорию
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            Использовать другие ключевые слова
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            Проверить фильтры
          </li>
        </ul>
      </div>
    </div>
  );
};