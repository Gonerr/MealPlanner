import { safeDB } from "../api-helper";

export class HouseholdsRepository {
  private db: safeDB;

  constructor(db: any) {
    this.db = new safeDB(db);
  }

  /**
   * Получить личное пространство пользователя.
   * Если его еще нет - создать
   */
  async ensurePersonalHousehold(userId: number) {
    const existing = await this.db.get(
      `
            SELECT h.*
            FROM households h

            INNER JOIN household_members hm
                ON hm.household_id = h.id

            WHERE 
                h.type = 'personal'
                AND hm.user_id = ?
            
            LIMIT 1
        `,
      [userId]
    );

    if (existing) {
      return existing;
    }

    const user = await this.db.get(
      `
            SELECT id, name, email
            FROM users
            WHERE id = ?
        `,
      [userId]
    );

    if (!user) {
      throw new Error("User not found");
    }

    return this.db.transaction(async (db) => {
      const result = await db.run(
        `
                    INSERT INTO households (
                        name, 
                        type,
                        created_by
                    )
                    VALUES (?, 'personal', ?)
                `,
        ["Личное", userId]
      );

      const householdId = result.lastId;

      await db.run(
        `INSERT INTO household_members (
                    household_id,
                    user_id,
                    role
                )
                VALUES (?, ?, 'owner')
                `,
        [householdId, userId]
      );

      return db.get(
        `
                SELECT *
                FROM households
                WHERE id = ?
                `,
        [householdId]
      );
    });
  }

  /**
   * Все пространства пользователя
   */
  async getAllForUser(userId: number) {
    return (
      this.db.all(
        `
            SELECT 
                h.id,
                h.name,
                h.type,
                h.created_at,

                hm.role,

          COUNT(members.user_id) AS member_count

        FROM household_members hm

        INNER JOIN households h
          ON h.id = hm.household_id

        LEFT JOIN household_members members
          ON members.household_id = h.id

        WHERE hm.user_id = ?

        GROUP BY
          h.id,
          h.name,
          h.type,
          h.created_at,
          hm.role

        ORDER BY
          CASE
            WHEN h.type = 'personal' THEN 0
            ELSE 1
          END,
          h.created_at ASC
            `
      ),
      [userId]
    );
  }

  /**
   * Создать семейное пространство.
   */
  async createFamily(userId: number, name: string) {
    return this.db.transaction(async (db) => {
      const result = await db.run(
        `
              INSERT INTO households (
                name,
                type,
                created_by
              )
              VALUES (?, 'family', ?)
            `,
        [name, userId]
      );

      const householdId = result.lastID;

      await db.run(
        `
              INSERT INTO household_members (
                household_id,
                user_id,
                role
              )
              VALUES (?, ?, 'owner')
            `,
        [householdId, userId]
      );

      return db.get(
        `
              SELECT
                h.id,
                h.name,
                h.type,
                h.created_at,
    
                'owner' AS role,
                1 AS member_count
    
              FROM households h
    
              WHERE h.id = ?
            `,
        [householdId]
      );
    });
  }

  /**
   * Проверить, состоит ли пользователь в household
   *
   * Потом будем использовать метод в menu/pantry/shopping-list API
   * @param householdId
   * @param userId
   * @returns
   */
  async isMember(householdId: number, userId: number): Promise<boolean> {
    const membership = await this.db.get(
      `
            SELECT 1
            FROM household_members
    
            WHERE
              household_id = ?
              AND user_id = ?
          `,
      [householdId, userId]
    );

    return !!membership;
  }
}
