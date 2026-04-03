import { safeDB } from "../api-helper";

export class MenuPlanCRUD {
    private db: safeDB;

    constructor(db: any) {
        this.db = new safeDB(db);
    }

    // Получить меню на день
    async getByDate (userId: any, date: string) {
        const rows = await this.db.all(`
                SELECT r.*,
                FROM menu_plan mp
                JOIN recipes r ON mp.recipe_id = r.id
                WHERE mp.user_id = ? AND mp.date = ?
            `, [userId, date]);

        return rows;
    }

    // Добавить блюдо
    async addDish(userId: any, date: string, recipeId: number) {
        await this.db.run(`
                INSERT OR IGNORE INTO menu_plan (user_id, date, recipe_id)
                VALUES (?, ?, ?)
            `, [userId, date, recipeId]);
    }

    // Удалить блюдо
    async removeDish(userId: any, date: string, recipeId: number) {
        await this.db.run(`
                DELETE FROM menu_plan
                WHERE user_id = ? AND date = ? AND recipe_id = ?
            `, [userId, date, recipeId]);
    }

    // Перезаписать весь день
    async setDay(userId: number, date: string, recipeId: number[]){
        await this.db.transaction(async (db) => {
            await db.run(`
                DELETE FROM menu_plan WHERE user_id = ? AND date = ?`,
            [userId, date]);

            for (const id of recipeId) {
                await db.run(`
                    INSERT INTO menu_plan (user_id, date, recipe_id)
                    VALUES (?, ?, ?)
                    `, [userId, date, id]);
            }
        })
    }
}
