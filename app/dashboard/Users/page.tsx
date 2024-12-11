import prisma from "@/lib/db";
import UserList from "@/app/components/users/userList";

export const revalidate = 60; // Revalidate data every 60 seconds (optional)

export default async function Home() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, slug: true },
  });

  return (
    <main className="relative h-full">
      <h1 className="text-2xl font-bold mb-4">Users Display</h1>
      <UserList users={users} />
    </main>
  );
}
