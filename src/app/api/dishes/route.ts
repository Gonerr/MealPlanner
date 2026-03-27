import { NextResponse } from "next/server";

let dishes: any[] = [];

export async function GET() {
    return NextResponse.json(dishes);
}

export async function POST(req: Request) {
    const body = await req.json();

    const newDish = {
        ...body,
        id: Date.now(),
    }

    dishes.push(newDish);

    return NextResponse.json(newDish);
}