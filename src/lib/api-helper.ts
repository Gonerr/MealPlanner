import { NextRequest, NextResponse } from "next/server";
import { TokenPayload, verifyAccessToken } from "./auth/jwt";
import { cookies } from "next/headers";
import { initDB } from "./db/db";

type AuthHandler = (
    request: NextRequest,
    context: {
        params: {id: string}; 
        user: TokenPayload; 
        db: any
    }
) => Promise<NextResponse>;

export async function withAuth(
    request:NextRequest,
    requireAdmin: boolean = false
) : Promise<{user: TokenPayload; error?: NextResponse}> { 

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token){
        return {
            user: null as any,
            error: NextResponse.json(
                { error: 'Unauthorized user' },
                { status: 401 }
            )
        }
    }

    const user = await verifyAccessToken(token);
    if (!user){
        return {
            user: null as any,
            error: NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            )
        };
    }

    if (requireAdmin && user.role !== 'admin') {
        return {
            user: null as any,
            error: NextResponse.json(
                { error: 'Forbidden - Admin access required' },
                { status: 403 }
            )
        };
    }

    return { user, error: undefined };
}


// с авторизацией
export function withAuthHandler(
    handler: AuthHandler,
    requireAdmin: boolean = false
): any  {
    return async (request: NextRequest, contextRaw: {params: Promise<{id: string}>}) => {
        const auth = await withAuth(request, requireAdmin);
        if (auth.error) {
            return auth.error;
        }

        const db = await initDB();
        const params = await contextRaw.params;

        return handler(request, {
            params, 
            user: auth.user,
            db
        })
    }
}

// prepared statements для большей безопасности запросов
export class safeDB{
    private db: any;

    constructor(db: any){
        this.db = db;
    }

    // Получение одного элемента
    async get(sql:string, params: any[] = []) {
        return this.db.get(sql,params);
    }

    // Получение всех элементов
    async all(sql: string, params: any[] = []){ 
        return this.db.all(sql,params);
    }

    // Для INSERT, UPDATE, DELETE
    async run(sql:string, params: any[] = []){
        return this.db.run(sql,params);
    }

    // Безопасная транзакция
    async transaction<T>(callback: (db: safeDB) => Promise<T>): Promise<T>{
        await this.db.exec('BEGIN TRANSACTION');
        try {
            const result = await callback(this);
            await this.db.exec('COMMIT');
            return result;
        } catch (error) {
            await this.db.exec('ROLLBACK');
            throw error;
        }
    }
}