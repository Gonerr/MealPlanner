import { Dish, DishCategory, Ingredient } from "@/app/types/menu";
import { deleteIngredient } from "@/features/ingredients/ingredientsSlice";

interface RecipeDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    preparationTime: number;
    isAvailable: boolean;
    isChefSpecial: boolean;
    calories: number;
    mealType: string;
    imageUrl?: string;
    ingredients: Array<{ id: number; name: string }>;
    createdAt: string;
    updatedAt: string;
}

// Преобразование из API формата в формат Redux
const mapRecipeToDish = (recipe: RecipeDTO): Dish => ({
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    price: recipe.price,
    category: recipe.category as DishCategory,
    ingredients: recipe.ingredients.map(i => i.id),
    preparationTime: recipe.preparationTime,
    isAvailable: recipe.isAvailable,
    calories: recipe.calories,
    isChefSpecial: recipe.isChefSpecial,
    imageUrl: recipe.imageUrl,
    mealType: recipe.mealType as any
});


class ApiClient {
    private baseUrl: string = '/api';

    // Получить все рецепты
    async getRecipes(): Promise<Dish[]> {
        try{
            const response = await fetch(`${this.baseUrl}/recipes`);
            if (!response.ok){
                throw new Error('Failed to fetch recipes');
            }
            const data = await response.json();
            return data.recipes.map(mapRecipeToDish);
        }catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    }

    // Получить рецепт по id
    async getRecipesById(id: number): Promise<Dish | null> {
        try{
            const response = await fetch(`${this.baseUrl}/recipes/${id}`);
            if (!response.ok){
                throw new Error('Failed to fetch recipe');
            }
            const data = await response.json();
            return mapRecipeToDish(data.recipe);
        }catch (error) {
            console.error('Error fetching recipe:', error);
            return null;
        }
    }

    // Создать новый рецепт (пока что только админ)
    async createRecipe(recipe: Omit<Dish, 'id'>): Promise<Dish | null> {
        try{
            const response = await fetch(`${this.baseUrl}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: recipe.name,
                    description: recipe.description,
                    price: recipe.price,
                    category: recipe.category,
                    preparationTime: recipe.preparationTime,
                    isAvailable: recipe.isAvailable,
                    isChefSpecial: recipe.isChefSpecial,
                    calories: recipe.calories,
                    mealType: recipe.mealType,
                    ingredientIds: recipe.ingredients
                })
            });
            if (!response.ok){
                throw new Error('Failed to fetch recipe');
            }
            const data = await response.json();
            return mapRecipeToDish(data.recipe);
        }catch (error) {
            console.error('Error fetching recipe:', error);
            return null;
        }
    }

    // Обновить рецепт (пока что только админ)
    async updateRecipe(id: number, recipe: Partial<Dish>): Promise<boolean> {
        try{
            const response = await fetch(`${this.baseUrl}/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: recipe.name,
                    description: recipe.description,
                    price: recipe.price,
                    category: recipe.category,
                    preparationTime: recipe.preparationTime,
                    isAvailable: recipe.isAvailable,
                    isChefSpecial: recipe.isChefSpecial,
                    calories: recipe.calories,
                    mealType: recipe.mealType,
                    ingredientIds: recipe.ingredients
                })
            });
            
            return response.ok;
        }catch (error) {
            console.error('Error fetching recipe:', error);
            return false;
        }
    }

    // Удалить рецепт (только админ)
    async deleteRecipe(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/recipes/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return false;
        }
    }


    // ================== ИНГРЕДИЕНТЫ ====================

    // Получить все ингредиенты
    async getIngredients(): Promise<Ingredient[]> {
        try{
            const response = await fetch(`${this.baseUrl}/ingredients`);
            if (!response.ok) {
                throw new Error('Failed to fetch ingredients');
            }
            const data = await response.json();
            return data.ingredients;
        }catch(error){
            console.error('Error fetching ingredients:', error);
            return [];
        }
    }

    // Создать ингредиент 
    async createIngredient(ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient | null> {
        try {
            const response = await fetch(`${this.baseUrl}/ingredients`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient)
            });
            if (!response.ok) {
                throw new Error('Failed to create ingredient');
            }
            
            const data = await response.json();
            return data.ingredient;
        } catch (error) {
            console.error('Error creating ingredient:', error);
            return null;
        }
    }

    // Обновить ингредиент
    async updateIngredient(id: number, ingredient: Partial<Ingredient>): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/ingredients`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...ingredient })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Error updating ingredient:', error);
            return false;
        }
    }

    // Удалить ингредиент
    async deleteIngredient(id: number): Promise<boolean> {
        try{
             const response = await fetch(`${this.baseUrl}/ingredients?id=${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting ingredient:', error);
            return false;
        }
    }
}

export const apiClient = new ApiClient();