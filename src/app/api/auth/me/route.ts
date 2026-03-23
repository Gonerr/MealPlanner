import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "../../../../lib/auth/jwt";

export async function GET (request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const payload = verifyAccessToken(accessToken);

        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        return NextResponse.json({
            user: {
                id: payload.userId,
                email: payload.email,
                role: payload.role
            }
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}