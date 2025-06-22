import { getServerSession } from "next-auth";
import {authOptions} from "@/app/lib/auth"
import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!userId || role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const body = await req.json();

    const newSchool = await db.school.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        refNumber: body.refNumber,
        createdBy: userId,
      },
    });

    return NextResponse.json(newSchool);
  } catch (error) {
    return NextResponse.json({ error: "Failed to register school" }, { status: 500 });
  }
}

// app/api/getschools/route.ts


export async function GET() {
  try {
    const schools = await db.school.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(schools);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}


