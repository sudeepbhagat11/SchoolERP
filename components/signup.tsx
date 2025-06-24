"use client";

import { useState } from "react";
import { TextInput } from "@/ui/src/TextInput";
import { Select } from "@/ui/src/Select";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setSuccess("Signup successful! You can now login.");
        setUsername("");
        setPassword("");
        setRole("student");
      }
    } catch (err) {
      setError("Unexpected error occurred");
      console.error(err);
    }

    setLoading(false);
  };

  const roleOptions = [
    { key: "student", value: "Student" },
    { key: "parent", value: "Parent" },
    { key: "staff", value: "Staff" },
    { key: "admin", value: "Admin" },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            placeholder="Enter username"
            label="Username"
            onChange={(val) => setUsername(val)}
            value={username}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Select Role
            </label>
            <Select options={roleOptions} onSelect={(val) => setRole(val)} />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
