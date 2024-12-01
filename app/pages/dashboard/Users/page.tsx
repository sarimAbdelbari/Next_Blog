import prisma from "@/lib/db";
import Link from "next/link";
import Create from "@/app/dashboard/Users/(CRUD)/Create";
export default async function Home() {
  


  const users = await prisma.user.findMany({
    orderBy : { // to order them 
      createdAt : 'desc'
    },
    select : { // select only the element you need for example i didnt fetch the password
      id:true,
      name:true,
      email:true,
      slug:true,
    },
  
  });

 

  return (
    <main className="relative h-full">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Users Display</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {users.map((user)=>(
            
          <Link href={`/dashboard/Users/${user.slug}`} key={user.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:scale-105 duration-300 ease-in-out">
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </Link>

))}
          
        </div>
        <Create />
        <button className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800 shadow-lg p-4 hover:scale-105 duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
        </button>
      </div>
    </main>
  );
}
