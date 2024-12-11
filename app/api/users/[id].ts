import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({ where: { id: String(id) } });
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const { email, password, name, slug } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { email, password, name, slug },
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Failed to update user" });
    }
}

if (req.method === "DELETE") {
    try {
        await prisma.user.delete({ where: { id: String(id) } });
        return res.status(204).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
