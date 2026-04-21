import { safeDB } from "../api-helper";

export class MenuPlanCRUD {
    private db: safeDB;

    constructor(db: any) {
        this.db = new safeDB(db);
    }


    /* =========================
       SERVICE: получить/создать день
    ========================== */

    private async getOrCreateDay(ownerId: number, date: string) {
        let day = await this.db.get(`
                SELECT * FROM menu_days
                WHERE owner_id = ? AND date = ?
            `, [ownerId, date])
        
        if (!day) {
            const result = await this.db.run(`
                    INSERT INTO menu_days (owner_id, date)
                    VALUES (?, ?)
                `, [ownerId, date]);

            day = {id: result.lastID, owner_id: ownerId, date}
        }

        return day;
    }

    /* =========================
       GET: меню на день
    ========================== */

    //версия с menu_plan
    // async getByDate (userId: any, date: string) {
    //     const rows = await this.db.all(`
    //             SELECT r.*,
    //             FROM menu_plan mp
    //             JOIN recipes r ON mp.recipe_id = r.id
    //             WHERE mp.user_id = ? AND mp.date = ?
    //         `, [userId, date]);

    //     return rows;
    // }

    async getByDate (ownerId: number, date: string) {
        const rows = await this.db.all(
            `SELECT *
            FROM menu_days md
            INNER JOIN menu_items mi 
                ON md.id = mi.menu_day_id 
            LEFT JOIN recipes r 
                ON r.id = mi.recipe_id
            WHERE md.owner_id = ? AND md.date = ?
            ORDER BY mi.meal_type
            `, [ownerId, date]);
            
        return rows;
    }

    // Добавить блюдо
    async addDish(userId: any, date: string, recipeId: number) {
        await this.db.run(`
                INSERT OR IGNORE INTO menu_plan (user_id, date, recipe_id)
                VALUES (?, ?, ?)
            `, [userId, date, recipeId]);

        await this.db.run(`
                INSERT OR IGNORE INTO 
            `)
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
