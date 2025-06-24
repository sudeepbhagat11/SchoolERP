import { NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/db";
import { sendMail } from "@/app/lib/mailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "If email exists, a reset link will be sent." }, { status: 200 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

  await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  await sendMail({
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 30 minutes.</p>
    `,
  });

  return NextResponse.json({ message: "If email exists, a reset link has been sent." }, { status: 200 });
}
