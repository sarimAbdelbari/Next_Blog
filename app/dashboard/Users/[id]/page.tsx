import prisma from '@/lib/db'
import React from 'react'

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }, // Convert string to number
  });

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
