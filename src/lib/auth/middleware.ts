// Вспомогательные функции для использования в api routes

import { NextRequest, NextResponse } from "next/server";
import { TokenPayload, verifyAccessToken } from "./jwt";
import { cookies } from "next/headers";

export interface AuthRequest extends NextRequest {
    user?: TokenPayload;
}

export async function authMiddleware(
    request:NextRequest): 
Promise<{ isValid: boolean; user?: TokenPayload; response?: NextResponse }> {
    
        try{
            const cookieStore = await cookies();
            const accessToken = cookieStore.get('accessToken')?.value;

            if (!accessToken){
                return {
                    isValid: false,
                    response: NextResponse.json(
                        {error: 'Unauthorized - No token provided'},
                        {status: 401}
                    )
                }
            }

            const payload = await verifyAccessToken(accessToken);
            if (!payload) {
                return {
                    isValid: false,
                    response: NextResponse.json(
                    { error: 'Unauthorized - Invalid or expired token' },
                    { status: 401 }
                    )
                };
            }
            return {
                isValid: true,
                user: payload
            };
        } catch (error) {
            return {
                isValid:false,
                response: NextResponse.json(
                    {error: 'Internal server error'},
                    {status: 500}
                )
            }
        }
}

// Проверка роли
export async function roleMiddleware(
    request: NextRequest,
    allowedRoles: string[]
): Promise<{ isValid: boolean; user?: TokenPayload; response?: NextResponse }> {
    const auth = await authMiddleware(request);

    if (!auth.isValid){
        return auth;
    }

    const userRole = auth.user?.role || 'user';

    if (!allowedRoles.includes(userRole)) {
        return {
            isValid: false,
            response: NextResponse.json(
                {error: 'Forbidden - Insufficient permissions'},
                {status: 403}
            )
        }
    }

    return auth;
}

// Получение пользователя из запроса
export function getUserFromRequest(request: NextRequest): TokenPayload | null {

    // Пытаемся получить из headers 
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');
    const userRole = request.headers.get('x-user-role');

    if (userId && userEmail) {
        return {
            userId,
            email: userEmail,
            role: userRole || undefined
        }
    }

    return null;
}

export function withAuth(
    handler: (request: AuthRequest, params?: any) => Promise<NextResponse>
){
    return async (request: NextRequest, params?: any) => {
        const auth = await authMiddleware(request);

        if (!auth.isValid){
            return auth.response;
        }

        const authRequest = request as AuthRequest;
        authRequest.user = auth.user;

        return handler(authRequest, params);
    }
}

// Higher-order function для оборачивания API routes с проверкой роли
export function withRole(
    allowedRoles: string[],
    handler: (request: AuthRequest, params?: any) => Promise<NextResponse>
){
    return async (request: NextRequest, params?: any) => {
        const auth = await roleMiddleware(request,allowedRoles);

        if (!auth.isValid){
            return auth.response;
        }

        const authRequest = request as AuthRequest;
        authRequest.user = auth.user;

        return handler(authRequest, params);
    }
}

