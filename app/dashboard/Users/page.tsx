import prisma from "@/lib/db";
import Link from "next/link";


export default async function Home() {
  
  const users = await prisma.user.findMany();

  return (
    
      <div >
        <h1 className="text-2xl font-bold mb-4">Users Display</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user)=>(
            <>
          <Link href={`/dashboard/Users/${user.id}`} key={user.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </Link>
            </>

))}
          
        </div>
      </div>
  );
}
