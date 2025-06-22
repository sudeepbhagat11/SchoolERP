"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolRegistration() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    refNumber: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/school", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/schoollisting");
    } else {
      alert("Failed to register school.");
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex justify-center items-center px-4 py-8 overflow-x-hidden">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 scale-75 ">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
          Register New School
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
          {[
            { name: "name", label: "School Name",placeholder:"name" },
            { name: "address", label: "Address",placeholder:"address"},
            { name: "city", label: "City",placeholder:"city" },
            { name: "state", label: "State",placeholder:"state" },
            { name: "pincode", label: "Pincode",placeholder:"pincode" },
            { name: "refNumber", label: "Reference Number",placeholder:"optional" },
          ].map(({ name, label,placeholder }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
