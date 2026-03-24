import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "../../../lib/auth/jwt";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        // если пользователь не авторизован
        if (!accessToken) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            )
        }

        const payload = verifyAccessToken(accessToken);

        // проверка на валидность токена
        if (!payload) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid or expired token' },
                { status: 401 }
            )
        }

        // если токен валиден
        return NextResponse.json({
            message: 'This is protected data',
            user: {
                id: payload.userId,
                email: payload.email,
                role: payload.role
            },
            data: {
                secretInfo: 'Только для авторизованных пользователей',
                timestamp: new Date().toISOString()
            }
        });
    } catch(error) {
        console.error('Protected route error: ',error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (!accessToken){
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

         const payload = verifyAccessToken(accessToken);

        // проверка на валидность токена
        if (!payload) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid or expired token' },
                { status: 401 }
            )
        }

        const body = await request.json();
        return NextResponse.json({
            success: true,
            message:'Data created successfully',
            createdBy: payload.userId,
            data: body 
        });
        
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        const accessToken = cookieStore.get('accessToken')?.value;
        if (!accessToken){
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        // проверка на валидность токена
        const payload = verifyAccessToken(accessToken);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        if (!id) {
            return NextResponse.json(
                {error: 'ID is required'},
                {status: 400}
            )
        }

        // TODO: настроить логику удаления, 
        // например чтоб только админ мог удалить

        return NextResponse.json({
            success: true,
            message: `Item ${id} deleted successfully`
        });
        
    }   catch (error) {
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
}