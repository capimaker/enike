import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: Object.fromEntries(request.headers),
    });
    return NextResponse.json({ user: session?.user ?? null });
  } catch (e) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
