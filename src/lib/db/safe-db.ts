// prepared statements для большей безопасности запросов
export class safeDB {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  // Получение одного элемента
  async get(sql: string, params: any[] = []) {
    return this.db.get(sql, params);
  }

  // Получение всех элементов
  async all(sql: string, params: any[] = []) {
    return this.db.all(sql, params);
  }

  // Для INSERT, UPDATE, DELETE
  async run(sql: string, params: any[] = []) {
    return this.db.run(sql, params);
  }

  // Безопасная транзакция
  async transaction<T>(callback: (db: safeDB) => Promise<T>): Promise<T> {
    await this.db.exec("BEGIN TRANSACTION");
    try {
      const result = await callback(this);
      await this.db.exec("COMMIT");
      return result;
    } catch (error) {
      await this.db.exec("ROLLBACK");
      throw error;
    }
  }
}
