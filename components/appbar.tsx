"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@/ui/src/button";
import { useRouter } from "next/navigation";
// import { CodeIcon } from "./Icon";
// import { ModeToggle } from "./ModeToggle";
export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";
  console.log(session?.user);
  const router = useRouter();

  return (
    <header className="bg-[#1E293B] text-white px-4 md:px-6 py-2 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.4)] border-b border-[#93a5ab]">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-bold">School-EPR</span>
      </Link>
      
      {!isLoading && session?.user && (
        <div className="flex items-center gap-4">
          <Button  onClick={() => signOut({ callbackUrl: "/signin" })}>Logout</Button>
        </div>
      )}

      {!isLoading && !session?.user && (
        <div className="flex items-center gap-4 ">
        <Button  onClick={() => router.push("/signin")}>Sign in</Button>
        </div>
      
      )}

      {isLoading && <div className="flex items-center gap-4"></div>}
    </header>
  );
}
