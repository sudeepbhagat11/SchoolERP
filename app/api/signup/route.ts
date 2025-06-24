// File: /app/api/signup/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/db"; // Make sure this path is correct

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, role } = body;

  if (!username || !password || !role) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: username },
  });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists." }, { status: 409 });
  }

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email: username,
      name: username,
      password: hashedPassword,
      role,
    },
  });

  return NextResponse.json({
    message: "User registered successfully",
    user: { id: user.id, email: user.email, role: user.role },
  }, { status: 201 });
}
