// app/school/edit/[id]/EditForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({ school }: { school: any }) {
  const [form, setForm] = useState({ ...school });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/admin/school/edit/${school.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/schoollisting");
    } else {
      alert("Failed to update school.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit School</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "address", "city", "state", "pincode", "refNumber"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field === "refNumber" ? "Reference Number" : field}
              </label>
              <input
                type="text"
                name={field}
                value={form[field as keyof typeof form] || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition font-medium"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
