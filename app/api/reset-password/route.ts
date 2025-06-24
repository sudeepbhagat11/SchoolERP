import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/db";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  const record = await db.passwordResetToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { email: record.email },
    data: { password: hashed },
  });

  await db.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: "Password reset successfully." });
}
