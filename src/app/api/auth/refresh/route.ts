import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, verifyRefreshToken } from "../../../../lib/auth/jwt";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if(!refreshToken) {
            return NextResponse.json(
                { error: 'No refresh token'},
                {status: 401}
            );
        }
        
        const payload = await verifyRefreshToken(refreshToken);

        if (!payload) {
            return NextResponse.json(
                {error:'Invalid refresh token'},
                {status: 401}
            );
        }

        const newAccessToken = await generateAccessToken(payload);

        // Обновляем cookie
        cookieStore.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60
        });
        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
}