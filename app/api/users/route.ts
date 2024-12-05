import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, slug } = body;

  try {
    const user = await prisma.user.create({
      data: { email, password, name, slug },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
