import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import validator from "validator";
import bcrypt from "bcryptjs";
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
  const body = await req.json();
  const { email, password, name, slug } = body;

  if(!validator.isEmail(email)){
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough ");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { email, password: hash, name, slug },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
