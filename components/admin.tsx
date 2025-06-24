"use client";

import Link from "next/link";
import { useState } from "react";

export default function Admin() {
    return (
        <div className="min-h-screen bg-[#F1F5F9] py-10 px-6 sm:px-10 font-sans">
            <div className="grid gap-5 sm:grid-cols-2">
            <Link
                href="/admin/schoolregistration"
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900"
            >
                + School Registration
            </Link>

            <Link
                href="/admin/schoollisting"
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900"
            >
                + School Listing
            </Link>

            <Link
                href="/admin/addStudent"
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
                + Add Student
            </Link>
            <Link
                href="/admin/addStaff"
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
                + Add Staff
            </Link>
            </div>
            
        </div>
    );

}
