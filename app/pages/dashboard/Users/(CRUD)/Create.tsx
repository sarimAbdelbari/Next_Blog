"use client"; // Required for handling form submission on the client side
import React from "react";
import { useState } from "react";
import axios from "axios";
export default function UserForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    slug: "",
  });

  const [message, setMessage] = useState({
    text:"",
    color:false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      // const user = await prisma.user.create({
      //   data: {
      //     email: formData.email,
      //     password: formData.password,
      //     name: formData.name,
      //     slug: formData.slug,
      //   },
      // })

      const { data } = await axios.post("/api/users" , {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        slug: formData.slug,
      }) 
 
      console.log("data" ,data)
      setMessage({text:"User created successfully!" , color:true});
      setFormData({ email: "", password: "", name: "", slug: "" });
    } catch (error) {
      setMessage({text:"Failed to create user. Please try again." , color:false});
      console.log(error)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      {message && <p className={`${message.color ? "text-green-500" : "text-red-500" } text-sm text-center mb-4`}>{message.text}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium mb-1">
            Slug:
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
