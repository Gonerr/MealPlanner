import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth/jwt";

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Публичные роуты
    const publicPaths = [
        '/login', 
        '/api/auth/login', 
        '/api/auth/refresh'
    ];

     // api роуты для аутентификации
    const isAuthApi = pathname.startsWith('/api/auth');

    // Получаем токен из cookie
    const accessToken = request.cookies.get('accessToken')?.value;

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path)); //проверяет, удовлетворяет ли хотя бы один элемент массива условию, заданному в передаваемой функции-callback
    if (isPublicPath){
        if (pathname.startsWith('/login') && accessToken) {
            const payload = verifyAccessToken(accessToken);
            if (payload) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
        return NextResponse.next();
    }


    if (!accessToken) {
        // если зашли на защищенную страницу - возвращаем ошибку
        if (pathname.startsWith('/api')) {
            return NextResponse.json(
                {error: 'unathorized'},
                {status: 401}
            );
        }

        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
        if (pathname.startsWith('/api')) {
            return NextResponse.json(
                {error: 'Invalid token'},
                {status: 401}
            );
        }

        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }


    // Для авторизованного пользователя перенаправляем на страницу dashbords
    if (accessToken && pathname === '/login') {
        const payload = verifyAccessToken(accessToken);
        if (payload) {
            return NextResponse.redirect(new URL('/dashbords', request.url));
        }
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
         /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ]
}