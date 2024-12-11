"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import UserForm from "@/app/components/users/userForm";

interface User {
  id: string;
  name: string | null; // Allow nullable names
  email: string;
  slug: string;
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const [userList, setUserList] = useState(users);
  const [triger, setTriger] = useState(false); // State to toggle the Create component

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUserList(userList.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="relative h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userList.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:scale-105 duration-300 ease-in-out"
          >
            <Link href={`/dashboard/Users/${user.slug}`}>
              <h2 className="text-lg font-semibold">{user.name ?? "No Name"}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </Link>
            <div className="flex justify-end items-center">
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the Create component */}
      {triger && <UserForm />}

      {/* Button to toggle the Create component */}
      <button
        onClick={() => setTriger(!triger)}
        className="absolute bottom-10 right-10 rounded-full bg-white dark:bg-gray-800 shadow-lg p-4 hover:scale-105 duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
      </button>
    </div>
  );
}
