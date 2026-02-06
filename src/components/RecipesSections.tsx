// components/RecipesSection.tsx
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredDishes } from '../features/menu/menuSlice';
import { Dish, DishCategory } from '../types/menu';
import { RecipeCard } from './Main/RecipeCard'
import { CategoryNav } from './shared/CategoryNav'
import { EmptyState } from './EmptyState';

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

  // Преобразование Dish в формат для RecipeCard
  const transformDishToRecipe = (dish: Dish) => {
    return {
      id: dish.id.toString(),
      name: dish.name,
      categoryId: dish.category,
      difficulty: getDifficulty(dish.preparationTime),
      cookingTime: dish.preparationTime,
      servings: 4, // Можно добавить в Dish если нужно
      calories: dish.calories || 300,
      rating: 4.5, // Можно добавить в Dish если нужно
      isFavorite: false, // Можно добавить в Dish если нужно
      description: dish.description,
      imageUrl: dish.imageUrl || '/placeholder-recipe.jpg',
      tags: dish.isChefSpecial ? ['Шеф-спешиал'] : [],
      price: dish.price,
      isAvailable: dish.isAvailable,
      isChefSpecial: dish.isChefSpecial,
      preparationTime: dish.preparationTime,
    };
  };

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

  // Функция для определения сложности
  function getDifficulty(preparationTime: number): 'easy' | 'medium' | 'hard' {
    if (preparationTime <= 15) return 'easy';
    if (preparationTime <= 30) return 'medium';
    return 'hard';
  }

  const handleResetCategory = () => {
    setActiveCategory('all');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full">
      {/* Шапка с навигацией */}
      <div className="sticky top-0 z-10 bg-white rounded-t-2xl border-b border-gray-100">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <ChefHatIcon />
                {hasRecipes ? 'Доступные рецепты' : 'Рецепты не найдены'}
              </h1>
              <p className="text-gray-500 mt-1">
                {totalRecipes > 0 
                  ? `Найдено ${totalRecipes} рецептов`
                  : 'Добавьте рецепты для начала работы'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                hasRecipes 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {hasRecipes ? `${filteredRecipes.length} рецептов` : '0 рецептов'}
              </span>
            </div>
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
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Сортировка:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('name')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'name'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                По названию
              </button>
              <button
                onClick={() => setSortBy('time')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'time'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                По времени
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'price'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                По цене
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sortOrder === 'asc' ? <SortAscIcon /> : <SortDescIcon />}
            <span className="text-sm font-medium">
              {sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
            </span>
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="p-6">
        {hasRecipes ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(dish => (
              <RecipeCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <EmptyState 
            searchQuery="" // если есть поиск, передать сюда
            activeCategory={activeCategory}
            categories={categories}
            onResetCategory={handleResetCategory}
          />
        )}

        {/* Подсказка о сортировке */}
        {hasRecipes && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <InfoIcon />
              <span>
                Отсортировано <strong>
                  {sortBy === 'name' && 'по названию'}
                  {sortBy === 'time' && 'по времени приготовления'}
                  {sortBy === 'price' && 'по цене'}
                </strong> {sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesSection;

// SVG иконки
const ChefHatIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C8.68629 15 6 17.6863 6 21H18C18 17.6863 15.3137 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 15V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SortAscIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SortDescIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);