import { NextResponse } from 'next/server';
import prisma from '@/lib/db';


// export async function GET(request: Request) {}

// export async function HEAD(request: Request) {}

export async function POST(req: Request) {
    try {
      const { email, password, name, slug } = await req.json();
  
      const user = await prisma.user.create({
        data: { email, password, name, slug },
      });
  
      return NextResponse.json({ message: "User created successfully!", user });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Failed to create user." },
        { status: 500 }
      );
    }
  }

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
