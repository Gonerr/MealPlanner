import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth/jwt";

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Публичные роуты
    const publicPaths = [
        '/login', 
        '/api/auth/login', 
        '/api/auth/refresh',
        '/api/auth/signup'
    ];
    const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path +'/'));
    
    // Получаем токен
    const accessToken = request.cookies.get('accessToken')?.value;

    if (pathname === '/login'){
        // Если есть логин и он валидный то переходим на главную страницу
        if (accessToken) {
            const payload = await verifyAccessToken(accessToken);
            if (payload) {
                console.log('Middleware - redirecting from /login to /')
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
        //иначе - показываем страницу логина
        return NextResponse.next();
    }

    // Для всех остальных страниц (кроме публичных api)
    if (!isPublicPath && !pathname.startsWith('_next') && pathname !== '/favicon.ico'){
        //если нет токена - редирект на логин
        if (!accessToken){
            console.log('Middleware - redirecting to /login from:', pathname);
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        const payload = await verifyAccessToken(accessToken);
        if (!payload) {
            console.log('Middleware - invalid token, redirecting to /login');
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
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