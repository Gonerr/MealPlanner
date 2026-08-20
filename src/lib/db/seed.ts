import bcrypt from "bcryptjs";

// Функция для добавления тестовых данных
export async function seedTestData(db: any) {
  try {
    // Проверяем и добавляем категории
    const categoryCount = await db.get(
      "SELECT COUNT(*) as count FROM categories"
    );

    if (categoryCount.count === 0) {
      console.log("Seeding categories...");

      const categories = [
        { name: "Все рецепты", slug: "all", color: "gray", display_order: 0 },
        { name: "Салаты", slug: "salads", color: "green", display_order: 1 },
        { name: "Супы", slug: "soups", color: "blue", display_order: 2 },
        {
          name: "Основные блюда",
          slug: "main",
          color: "amber",
          display_order: 3,
        },
        { name: "Десерты", slug: "desserts", color: "pink", display_order: 4 },
        { name: "Перекусы", slug: "snacks", color: "purple", display_order: 5 },
        { name: "Напитки", slug: "drinks", color: "cyan", display_order: 6 },
        {
          name: "Особые рецепты",
          slug: "specials",
          color: "rose",
          display_order: 7,
        },
      ];

      for (const cat of categories) {
        await db.run(
          `INSERT INTO categories (name, slug, color, display_order, is_active) 
                       VALUES (?, ?, ?, ?, 1)`,
          [cat.name, cat.slug, cat.color, cat.display_order]
        );
      }
      console.log("✅ Categories seeded");
    }

    // Проверяем и добавляем тестового пользователя
    const userCount = await db.get("SELECT COUNT(*) as count FROM users");

    if (userCount.count === 0) {
      console.log("Seeding test user...");
      const hashedPassword = await bcrypt.hash("hahah23", 10);
      await db.run(
        `INSERT INTO users (email, password_hash, name, role, is_active) 
                   VALUES (?, ?, ?, ?, 1)`,
        ["user@example.com", hashedPassword, "Test User", "user"]
      );
      console.log("✅ Test user seeded");
    }

    // Проверяем и добавляем ингредиенты
    const ingredientCount = await db.get(
      "SELECT COUNT(*) as count FROM ingredients"
    );

    if (ingredientCount.count === 0) {
      console.log("Seeding ingredients...");

      const ingredients = [
        {
          name: "Куриное филе",
          category: "meat",
          description: "Свежее куриное филе",
        },
        {
          name: "Картофель",
          category: "vegetable",
          description: "Молодой картофель",
        },
        { name: "Сыр", category: "dairy", description: "Твердый сыр" },
        {
          name: "Говядина",
          category: "meat",
          description: "Мраморная говядина",
        },
        { name: "Шоколад", category: "other", description: "Темный шоколад" },
        { name: "Мята", category: "vegetable", description: "Свежая мята" },
        { name: "Лайм", category: "vegetable", description: "Свежий лайм" },
      ];

      for (const ing of ingredients) {
        await db.run(
          `INSERT INTO ingredients (name, description, category, is_available) 
                       VALUES (?, ?, ?, 1)`,
          [ing.name, ing.description, ing.category]
        );
      }
      console.log("✅ Ingredients seeded");
    }

    // Проверяем и добавляем рецепты
    const recipeCount = await db.get("SELECT COUNT(*) as count FROM recipes");

    if (recipeCount.count === 0) {
      console.log("Seeding recipes...");

      // Получаем ID ингредиентов
      const ingredients = await db.all("SELECT id, name FROM ingredients");
      const ingMap = new Map();
      ingredients.forEach((ing: any) => {
        ingMap.set(ing.name, ing.id);
      });

      // Получаем пользователя
      const user = await db.get("SELECT id FROM users WHERE email = ?", [
        "user@example.com",
      ]);
      const userId = user?.id || null;

      const recipes = [
        {
          name: "Курица по-французски",
          description: "Запеканка из нескольких слоев",
          price: 450,
          category_slug: "main",
          preparation_time: 55,
          is_available: 1,
          is_chef_special: 1,
          calories: 320,
          meal_type: "lunch",
          ingredients: ["Куриное филе", "Картофель", "Сыр"],
        },
        {
          name: "Стейк из говядины",
          description: "Сочный стейк с овощами гриль",
          price: 890,
          category_slug: "main",
          preparation_time: 25,
          is_available: 1,
          is_chef_special: 0,
          calories: 650,
          meal_type: "dinner",
          ingredients: ["Говядина"],
        },
        {
          name: "Шоколадный фондан",
          description: "Теплый шоколадный десерт с мороженым",
          price: 350,
          category_slug: "desserts",
          preparation_time: 20,
          is_available: 0,
          is_chef_special: 1,
          calories: 420,
          meal_type: "dessert",
          ingredients: ["Шоколад"],
        },
        {
          name: "Мохито",
          description: "Освежающий коктейль с мятой и лаймом",
          price: 300,
          category_slug: "drinks",
          preparation_time: 5,
          is_available: 1,
          is_chef_special: 0,
          calories: 150,
          meal_type: "drinks",
          ingredients: ["Мята", "Лайм"],
        },
      ];

      for (const recipe of recipes) {
        // Правильный INSERT с 9 значениями (соответствует количеству столбцов)
        const result = await db.run(
          `
                      INSERT INTO recipes (
                          user_id, name, description, price, category_slug, 
                          preparation_time, is_available, is_chef_special, 
                          calories, meal_type
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `,
          [
            userId,
            recipe.name,
            recipe.description,
            recipe.price,
            recipe.category_slug,
            recipe.preparation_time,
            recipe.is_available,
            recipe.is_chef_special,
            recipe.calories,
            recipe.meal_type,
          ]
        );

        const recipeId = result.lastID;

        // Добавляем связи с ингредиентами
        for (const ingName of recipe.ingredients) {
          const ingredientId = ingMap.get(ingName);
          if (ingredientId) {
            await db.run(
              `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
                               VALUES (?, ?)`,
              [recipeId, ingredientId]
            );
          }
        }
      }
      console.log("Recipes seeded");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
}
