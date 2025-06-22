

// "use client";

// import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";

// export default function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await signIn("credentials", {
//       redirect: false,
//       username,
//       password,
//     });

//     if (result?.error) {
//       setError("Invalid credentials");
//     } else {
//       window.location.href = "/";
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center font-sans  bg-gradient-to-br from-[#fafafa] to-[#fdf2f2]">


//       {/* Logo */}
//       <div className="text-center mb-6 ">
//         <h1 className="text-6xl font-bold text-red-700 inline-block">SCHOOL</h1>
//         <span className="text-6xl font-bold text-blue-800 ml-2 relative">
//           LMS
//           <span className="absolute -top-4 -left-5">
//             <svg className="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 0L6 4h3v6h2V4h3l-4-4zM3 10v9h14v-9H3zm2 2h10v5H5v-5z" />
//             </svg>
//           </span>
//         </span>
//       </div>

//       {/* Card */}
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-[90%] max-w-4xl overflow-hidden">
//         {/* Left Section */}
//         <div className="bg-[#7a0c0c] text-white p-8 w-full md:w-1/2 text-sm space-y-4">
//           <h2 className="text-lg font-semibold">Learning Management System</h2>
//           <p>🍪 Cookies must be enabled in your browser</p>
//           <p className="font-semibold">Is this your first time here?</p>
//           <p>
//             yo yo yo bitch
//           </p>
//           <p>Stay Safe and Stay Healthy,</p>
//         </div>

//         {/* Right Section - Login */}
//         <div className="p-8 w-full md:w-1/2">
//           <p className="text-lg mb-4 font-semibold">Already have an account?</p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <i className="fa fa-user absolute top-3 right-3 text-gray-400" />
//             </div>

//             <div className="relative">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <i className="fa fa-lock absolute top-3 right-3 text-gray-400" />
//             </div>

//             <div className="flex items-center space-x-2 text-sm">
//               <input type="checkbox" id="remember" className="accent-red-600" />
//               <label htmlFor="remember">Remember username</label>
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <button
//               type="submit"
//               className="w-full bg-[#7a0c0c] hover:bg-[#600909] text-white py-2 rounded text-sm transition duration-300"
//             >
//               Log in
//             </button>
//           </form>

//           <p className="text-sm text-red-600 mt-4 underline cursor-pointer hover:text-red-800">
//             Forgotten your username or password?
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";


import { signIn } from "next-auth/react";
import { Card } from "@/ui/src/card";
import { TextInput } from "@/ui/src/TextInput";
import { Select } from "@/ui/src/Select";
import { Button } from "@/ui/src/button";
import { Center } from "@/ui/src/Center";


import { useEffect, useState } from "react";


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      role,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };

  const roleOptions = [
    { key: "student", value: "Student" },
    { key: "parent", value: "Parent" },
    { key: "staff", value: "Staff" },
    { key: "admin", value: "Admin" },
  ];

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center font-sans bg-gradient-to-br  scale-90">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-6xl font-bold text-red-700 inline-block">SCHOOL</h1>
        <span className="text-6xl font-bold text-blue-800 ml-2 relative">
          LMS
          <span className="absolute -top-4 -left-5">
            <svg
              className="w-6 h-6 text-red-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0L6 4h3v6h2V4h3l-4-4zM3 10v9h14v-9H3zm2 2h10v5H5v-5z" />
            </svg>
          </span>
        </span>
      </div>

      {/* Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-[90%] max-w-4xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-[#7a0c0c] text-white p-8 w-full md:w-1/2 text-sm space-y-4">
          <h2 className="text-lg font-semibold">Learning Management System</h2>
          <p>🍪 Cookies must be enabled in your browser</p>
          <p className="font-semibold">Is this your first time here?</p>
          <p>yo yo yo bitch</p>
          <p>Stay Safe and Stay Healthy,</p>
        </div>

        {/* Right Section - Login */}
        <div className="p-8 w-full md:w-1/2">
          <p className="text-lg mb-4 font-semibold">Already have an account?</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <TextInput
              placeholder="Enter your username"
              onChange={(val) => setUsername(val)}
              label="Username"
            />

            {/* Password */}
            <div className="pt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your password"
              />
            </div>

            {/* Role Selector */}
            <div className="pt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Role
              </label>
              <Select options={roleOptions} onSelect={(val) => setRole(val)} />
            </div>

            {/* Remember */}
            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" id="remember" className="accent-red-600" />
              <label htmlFor="remember">Remember username</label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#7a0c0c] hover:bg-[#600909] text-white py-2 rounded text-sm transition duration-300"
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-red-600 mt-4 underline cursor-pointer hover:text-red-800">
            Forgotten your username or password?
          </p>
        </div>
      </div>
    </div>
  );
}
