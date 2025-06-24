// // File: /app/api/signup/route.ts

// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import db from "@/db"; // Make sure this path is correct

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { username, password, role } = body;

//   if (!username || !password || !role) {
//     return NextResponse.json({ message: "All fields are required." }, { status: 400 });
//   }

//   // Check if user already exists
//   const existingUser = await db.user.findUnique({
//     where: { email: username },
//   });

//   if (existingUser) {
//     return NextResponse.json({ message: "User already exists." }, { status: 409 });
//   }

//   // Create new user
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await db.user.create({
//     data: {
//       email: username,
//       name: username,
//       password: hashedPassword,
//       role,
//     },
//   });

//   return NextResponse.json({
//     message: "User registered successfully",
//     user: { id: user.id, email: user.email, role: user.role },
//   }, { status: 201 });
// }




// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import db from "@/db";
// import { sendMail } from "@/app/lib/mailer";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { username, password, role } = body;

//   if (!username || !password || !role) {
//     return NextResponse.json({ message: "All fields are required." }, { status: 400 });
//   }

//   const existingUser = await db.user.findUnique({
//     where: { email: username },
//   });

//   if (existingUser) {
//     return NextResponse.json({ message: "User already exists." }, { status: 409 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await db.user.create({
//     data: {
//       email: username,
//       name: username,
//       password: hashedPassword,
//       role,
//     },
//   });

//   // Create a dummy password reset link (implement your token logic here)
//   const resetLink = `${process.env.BASE_URL}/reset-password?email=${encodeURIComponent(user.email)}`;

//   // Send the email
//   await sendMail({
//     to: user.email,
//     subject: "Welcome! Reset Your Password",
//     html: `
//       <h2>Welcome to Our Platform!</h2>
//       <p>You have successfully signed up.</p>
//       <p>Click the link below to reset your password:</p>
//       <a href="${resetLink}">Reset your password</a>
//     `,
//   });

//   return NextResponse.json({
//     message: "User registered successfully. A confirmation email has been sent.",
//     user: { id: user.id, email: user.email, role: user.role },
//   }, { status: 201 });
// }






import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, role } = body;

  if (!username || !password || !role) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  const existingUser = await db.user.findUnique({
    where: { email: username },
  });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email: username,
      name: username,
      password: hashedPassword,
      role,
    },
  });

  // 🔁 Call /api/request-password-reset internally
  await fetch(`${process.env.BASE_URL}/api/request-password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user.email }),
  });

  return NextResponse.json({
    message: "User registered successfully. A reset password email has been sent.",
    user: { id: user.id, email: user.email, role: user.role },
  }, { status: 201 });
}
