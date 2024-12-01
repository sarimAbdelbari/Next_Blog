import prisma from '@/lib/db';

export default async function UserPage({ params }: { params: { slug: string } }) {
  // Await params to ensure it is fully resolved
  const { slug } = await params;

  if (!slug) {
    return <p>Invalid User ID</p>;
  }

  // Fetch user from database
  const user = await prisma.user.findUnique({
    where: { slug },
  });

  // Handle user not found
  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <main className="p-4">
      <h3 className="text-2xl">{user.name ?? "Unknown User"}</h3>
      <p>{user.email ?? "No Email Provided"}</p>
    </main>
  );
}
