import { safeDB } from "../api-helper";

export class MenuPlanCRUD {
    private db: safeDB;

    constructor(db: any) {
        this.db = new safeDB(db);
    }

    /* =========================
       SERVICE: получить/создать день
    ========================== */

    private async getOrCreateDay(ownerId: any, date: string) {
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

    async getByDate (ownerId: any, date: string) {
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

    /* =========================
       ADD: добавить блюдо
    ========================== */
    
    async addDish(
        ownerId: any, 
        date: string, 
        recipeId: number, 
        mealType: string, 
        grams: number = 100,
        price: number
    ) {
        let menuDay = await this.getOrCreateDay(ownerId,date);
        let menuDayId = menuDay.id;

        let recipeDefault = await this.db.get(`
                SELECT meal_type, price
                FROM recipes 
                WHERE id = ?`, [recipeId]);

        await this.db.run(`
            INSERT OR IGNORE INTO menu_items (
            menu_day_id, 
            recipe_id,
            meal_type,
            grams,
            custom_price
            )
            VALUES (?, ?, ?, ?, ?)
            `, [
                menuDayId,
                recipeId,
                mealType !== null ? mealType : recipeDefault.meal_type,
                grams,
                price !== null ? price: recipeDefault.price
            ]);
    }

    /* =========================
       DEL: удалить блюдо
    ========================== */

    // Удалить блюдо в конкретный день
    async removeDish(date: string, recipeId: number, menuDayId: number) {
        await this.db.run(`
            DELETE FROM menu_items
            WHERE menu_day_id = ? AND date = ? AND recipe_id = ?
        `, [menuDayId, date, recipeId]);
    }

    /* =========================
       UPD: перезапись всего дня
    ========================== */

    // async setDay(ownerId: number, date: string, recipeId: number[]){
    //     await this.db.transaction(async (db) => {
    //         await db.run(`
    //             DELETE FROM menu_plan WHERE user_id = ? AND date = ?`,
    //         [userId, date]);

    //         for (const id of recipeId) {
    //             await db.run(`
    //                 INSERT INTO menu_plan (user_id, date, recipe_id)
    //                 VALUES (?, ?, ?)
    //                 `, [userId, date, id]);
    //         }
    //     })
    // }

    /* ==================== 
     Получить план за всю неделю
    ======================== */
    async getWeekPlan (ownerId: any, startDate: string, endDate: string) {
        const rows = await this.db.all(
            `
            SELECT 
                md.id as menu_day_id,
                md.date as date,
                mi.id as menu_item_id,
                mi.recipe_id as recipe_id,
                mi.meal_type as meal_type,
                mi.grams as grams,
                mi.custom_price as price,
                r.title as title,
                r.cook_time as cook_time
            FROM menu_days md
            LEFT JOIN menu_items mi ON mi.menu_day_id = md.id
            LEFT JOIN recipes r ON r.id = mi.recipe_id
            WHERE md.owner_id = ?
                AND md.date BETWEEN ? AND ?
            ORDER BY md.date ASC, mi.meal_type ASC
            `,
            [ownerId, startDate, endDate]
        );

        return rows;
    }
}
