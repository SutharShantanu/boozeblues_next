import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = req.json();
        return NextResponse.json(body);
    } catch (error) {}
}
