// components/RecipesSection.tsx
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredDishes } from '../features/menu/menuSlice';
import { Dish, DishCategory } from '../types/menu';
import { RecipeCard } from './Main/RecipeCard';
import { CategoryNav } from './shared/CategoryNav';
import { EmptyState } from './EmptyState';
import { ChefHatIcon, InfoIcon, SortAscIcon, SortDescIcon } from './icons';

interface Category {
  id: DishCategory | 'all';
  name: string;
  color: string;
}

const RecipesSection: React.FC = () => {
  const allRecipes = useSelector(selectFilteredDishes);
  const [activeCategory, setActiveCategory] = useState<DishCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'time' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Категории для навигации
  const categories: Category[] = [
    { id: 'all', name: 'Все рецепты', color: 'gray' },
    { id: 'salads', name: 'Салаты', color: 'green' },
    { id: 'soups', name: 'Супы', color: 'blue' },
    { id: 'main', name: 'Основные блюда', color: 'amber' },
    { id: 'desserts', name: 'Десерты', color: 'pink' },
    { id: 'snacks', name: 'Перекусы', color: 'purple' },
    { id: 'drinks', name: 'Напитки', color: 'cyan' },
    { id: 'specials', name: 'Особые рецепты', color: 'rose' },
  ];

  // Фильтрация и сортировка блюд
  const filteredRecipes = useMemo(() => {
    const filtered = activeCategory === 'all' 
      ? allRecipes 
      : allRecipes.filter(dish => dish.category === activeCategory);
    
    // Сортировка
    return [...filtered].sort((a, b) => {
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
  }, [allRecipes, activeCategory, sortBy, sortOrder]);

  const hasRecipes = filteredRecipes.length > 0;
  const totalRecipes = allRecipes.length;

  const handleResetCategory = () => {
    setActiveCategory('all');
  };

  return (
    <div className="bg-white rounded-3 shadow-sm border border-gray-300 h-100 p-2">
      {/* Шапка с навигацией */}
      <div className="sticky-top bg-white rounded-top-3 border-bottom border-gray-300">
        <div className="p-4 pb-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 fw-bold text-dark d-flex align-items-center gap-2">
              {hasRecipes ? 'Доступные рецепты' : 'Рецепты не найдены'}
            </h1>
            
            <p className="text-muted m-0">
              {totalRecipes > 0 
                ? `Найдено ${totalRecipes} рецептов`
                : 'Добавьте рецепты для начала работы'
              }
            </p>
          </div>
          
          {/* Навигация по категориям */}
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(categoryId) => setActiveCategory(categoryId as DishCategory | 'all')}
          />
        </div>
      </div>

      {/* Панель сортировки */}
      <div className="px-4 py-3 border-bottom border-gray-300">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted fw-medium">Сортировка:</span>
            <div className="d-flex gap-2">
              <button
                onClick={() => setSortBy('name')}
                className={`btn btn-sm ${
                  sortBy === 'name'
                    ? 'btn-dark'
                    : 'btn-outline-dark'
                }`}
              >
                По названию
              </button>
              <button
                onClick={() => setSortBy('time')}
                className={`btn btn-sm ${
                  sortBy === 'time'
                    ? 'btn-dark'
                    : 'btn-outline-dark'
                }`}
              >
                По времени
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`btn btn-sm ${
                  sortBy === 'price'
                    ? 'btn-dark'
                    : 'btn-outline-dark'
                }`}
              >
                По цене
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
          >
            {sortOrder === 'asc' ? <SortAscIcon /> : <SortDescIcon />}
            <span>
              {sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
            </span>
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="p-4">
        {hasRecipes ? (
          <div className="row g-4">
            {filteredRecipes.map(dish => (
              <div key={dish.id} className="col-12 col-md-6 col-lg-4">
                <RecipeCard dish={dish} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            searchQuery=""
            activeCategory={activeCategory}
            categories={categories}
            onResetCategory={handleResetCategory}
          />
        )}

        {/* Подсказка о сортировке */}
        {hasRecipes && (
          <div className="mt-4 pt-4 border-top border-gray-300">
            <div className="d-flex align-items-center gap-2 text-muted">
              <InfoIcon />
              <small>
                Отсортировано <strong>
                  {sortBy === 'name' && 'по названию'}
                  {sortBy === 'time' && 'по времени приготовления'}
                  {sortBy === 'price' && 'по цене'}
                </strong> {sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'}
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesSection;