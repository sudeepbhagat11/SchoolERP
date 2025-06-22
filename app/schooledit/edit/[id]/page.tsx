// app/school/edit/[id]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import db from "@/db";
import { notFound, redirect } from "next/navigation";
import EditForm from "@/components/editform";

export default async function EditSchoolPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/schoollisting");
  }

  const school = await db.school.findUnique({
    where: { id: params.id },
  });

  if (!school || school.createdBy !== session.user.id) {
    notFound();
  }

  return <EditForm school={school} />;
}
