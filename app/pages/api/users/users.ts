import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"; // Ensure `db.ts` exports a configured PrismaClient instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password, name, slug } = req.body;

      // Create the user in the database
      const user = await prisma.user.create({
        data: { email, password, name, slug },
      });

      res.status(200).json({ message: "User created successfully!", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create user." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  
}
