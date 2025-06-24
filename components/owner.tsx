"use client";

import Link from "next/link";
import { useState } from "react";

export default function Owner() {
    return (
        <div className="min-h-screen bg-[#F1F5F9] py-10 px-6 sm:px-10 font-sans">
            <div className="grid gap-5 sm:grid-cols-2">
            <Link
                href="/owner/signup"
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900"
            >
            Add New Admin
            </Link>
            </div>
            
        </div>
    );

}
