"use client";

import Link from "next/link";
import { useState } from "react";

export default function SchoolListingClient({ schools, userId }: { schools: any[], userId: string }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = schools.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] py-10 px-6 sm:px-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Registered Schools</h1>
          <Link
            href="/schoolregistration"
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900"
          >
            + Add New
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search school name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-4 py-2 rounded-md shadow-sm"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow p-4 border"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {school.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {school.address}, {school.city}, {school.state} - {school.pincode}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ref#: {school.refNumber}
              </p>

              {/* 🔒 Only show Edit button if createdBy matches */}
              {school.createdBy === userId && (
                <Link
                  href={`/schooledit/edit/${school.id}`}
                  className="inline-block mt-3 text-sm bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800"
                >
                  Edit
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
