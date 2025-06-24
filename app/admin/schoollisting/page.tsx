// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface School {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   refNumber: string;
// }

// export default function SchoolListing() {
//   const [schools, setSchools] = useState<School[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchSchools = async () => {
//       const res = await fetch("/school");
//       const data = await res.json();
//       setSchools(data);
//     };
//     fetchSchools();
//   }, []);

//   const filteredSchools = schools.filter((school) =>
//     school.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6 sm:px-10 font-sans">
//       <div className="max-w-5xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h1 className="text-4xl font-bold text-gray-800">Registered Schools</h1>
//           <Link
//             href="/schoolregistration"
//             className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
//           >
//             + Add New School
//           </Link>
//         </div>

//         {/* Search bar */}
//         <input
//           type="text"
//           placeholder="Search by school name..."
//           className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* School Cards */}
//         {filteredSchools.length === 0 ? (
//           <p className="text-gray-500">No matching schools found.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2">
//             {filteredSchools.map((school) => (
//               <div
//                 key={school.id}
//                 className="bg-white rounded-lg shadow-md border border-gray-200 p-5"
//               >
//                 <h2 className="text-xl font-semibold text-gray-900">{school.name}</h2>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {school.address}, {school.city}, {school.state} - {school.pincode}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-2">Ref#: {school.refNumber}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// app/schoollisting/page.tsx
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/lib/auth"

import db from "@/db";
import SchoolListingClient from "@/components/schoollistingclient";

export default async function SchoolListingPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const schools = await db.school.findMany({
    orderBy: { createdAt: "desc" },
    include: { creator: true },
  });

  return <SchoolListingClient userId={userId} schools={schools} />;
}
