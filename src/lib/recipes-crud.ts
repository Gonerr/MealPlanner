import { safeDB } from "./api-helper";

export interface RecipeInput {
    name: string;
    description?: string;
    price?: number;
    category: string;
    preparationTime?: number;
    isAvailable?: boolean;
    isChefSpecial?: boolean;
    calories?: number;
    mealType?: string;
    ingredientIds?: number[];
}

export interface Recipe extends RecipeInput {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export class RecipesCRUD {
    private db: safeDB;

    constructor(db:any){
        this.db = new safeDB(db);
    }

    // Получение всех рецептов
    async getAll(): Promise<Recipe[]> {
        const recipes = await this.db.all(`
            
            SELECT 
                r.*,
                GROUP_CONCAT(i.id) as indredient_ids,
                GROUP_CONCAT(i.namr) as indredient_names
            FROM recipes r
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            GROUP BY r.id
            ORDER BY r.created_at DESC
            `);

        return recipes.map(this.formatRecipe);
    }

    // Получение рецепта по ID
    async getById(id: number): Promise<Recipe | null> {
        const recipe = await this.db.get(`
            SELECT 
                r.*,
                GROUP_CONCAT(i.id) as ingredient_ids,
                GROUP_CONCAT(i.name) as ingredient_names
            FROM recipes r
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE r.id = ?
            GROUP BY r.id
        `, [id]);
        
        return recipe ? this.formatRecipe(recipe) : null;
    }

     // Проверка существования рецепта по имени
    async existsByName(name: string): Promise<boolean> {
        const result = await this.db.get(
            'SELECT 1 FROM recipes WHERE name = ?',
            [name]
        );
        return !!result;
    }

    // Создание рецепта
    async create(userId: number, newRecipe: RecipeInput): Promise<Recipe>{
        // Проверяем существование
        if (await this.existsByName(newRecipe.name)) {
            throw new Error('Recipe with this name already exists');
        }

        // Проверяем ингредиенты, если нужно создать новые
        const ingredientIds = await this.ensureIngredients(newRecipe.ingredientIds || []);

        const result = await this.db.run(`
            INSERT INTO recipes(
                user_id, 
                name, 
                description, 
                price, 
                category, 
                preparation_time,
                is_available,
                is_chef_special, 
                calories, 
                meal_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                userId,
                newRecipe.name,
                newRecipe.description || '',
                newRecipe.price || 0,
                newRecipe.category,
                newRecipe.preparationTime || 0,
                newRecipe.isAvailable !== undefined? (newRecipe.isAvailable ? 1 : 0): 1,
                newRecipe.isChefSpecial !== undefined? (newRecipe.isChefSpecial ? 1 : 0): 1,
                newRecipe.calories || 0,
                newRecipe.mealType || 'lunch'
        ]);

        const recipeId = result.lastID;

        // Добавляем связи с ингредиентами, если они переданы
        for (let id of ingredientIds){
            await this.db.run(
                `INSERT INTO recipe_ingredients (
                    recipe_id, 
                    ingredient_id)
                VALUES (?, ?)`,
                [recipeId, id]
            );
        }
        
        return this.getById(recipeId) as Promise<Recipe>;
    }

    // Обновление рецепта
    async update(recipe: RecipeInput, id: number): Promise<Recipe>{
        // Проверяем существование
        if (await this.getById(id) === null) {
            throw new Error('Recipe not exists!');
        }

        // Проверяем ингредиенты, если нужно создать новые
        const ingredientIds = await this.ensureIngredients(recipe.ingredientIds || []);

        const result = await this.db.run(`
            UPDATE recipes
            SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                price = COALESCE(?, price),
                category = COALESCE(?, category),
                preparation_time = COALESCE(?, preparation_time),
                is_available = COALESCE(?, is_available),
                is_chef_special = COALESCE(?, is_chef_special),
                calories = COALESCE(?, calories),
                meal_type = COALESCE(?, meal_type),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,[
                recipe.name, recipe.description, recipe.price, recipe.category,
                recipe.preparationTime, recipe.isAvailable ? 1 : 0, 
                recipe.isChefSpecial ? 1 : 0, recipe.calories, recipe.mealType, id
            ])

        const recipeId = result.lastID;

        // Добавляем связи с ингредиентами, если они переданы
        if (recipe.ingredientIds) {
            // Удаляем старые связи
            await this.db.run(
                'DELETE FROM recipe_ingredients WHERE recipe_id = ?',
                [id]
            );
            
            // Добавляем новые
            for (const ingredientId of recipe.ingredientIds) {
                await this.db.run(
                    'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
                    [id, ingredientId]
                );
            }
        }
        
        return this.getById(recipeId) as Promise<Recipe>;
    }

    // Удаление рецепта
    async delete(id: number): Promise<void> {
        const result = await this.db.run(`
            DELETE FROM recipes WHERE id = ?
            `, [id]);

        if (result.changes === 0){
            throw new Error('Recipe not found');
        }
    }

    // Проверка и создание ингредиентов (TODO)
    private async ensureIngredients(ingredientIds: number[]): Promise<number[]> {
        // TODO: Проверить, существуют ли ингредиенты
        // Если нет - создать
        return ingredientIds;
    }

    // Форматирование рецепта из БД
    private formatRecipe(recipe: any): Recipe {
        return {
            id: recipe.id,
            userId: recipe.user_id,
            name: recipe.name,
            description: recipe.description,
            price: recipe.price,
            category: recipe.category,
            preparationTime: recipe.preparation_time,
            isAvailable: recipe.is_available === 1,
            isChefSpecial: recipe.is_chef_special === 1,
            calories: recipe.calories,
            mealType: recipe.meal_type,
            ingredientIds: recipe.ingredient_ids ? 
                recipe.ingredient_ids.split(',').map(Number) : [],
            createdAt: recipe.created_at,
            updatedAt: recipe.updated_at
        };
    }
}