import React from "react";
import { cookies } from "next/headers";


export default async function Navbar() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  const isLoggedIn = !!userId;

  return (
   
    <nav className="block fixed top-0 left-0 w-full z-50 bg-white shadow-md">
     
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 py-4">
        {isLoggedIn ? (
          <form className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <a
              href="/profile"
              className="text-black bg-white font-bold px-3 py-1 rounded hover:text-blue-600"
            >
              Profile
            </a>
            <a
              href="/dashboard"
              className="text-black bg-white font-bold px-3 py-1 rounded hover:text-blue-600"
            >
              Dashboard
            </a>
            <a
              href="/bills"
              className="text-black bg-white font-bold px-3 py-1 rounded hover:text-blue-600"
            >
              Bills
            </a>
            <a
              href="/subscriptions"
              className="text-black bg-white font-bold px-3 py-1 rounded hover:text-blue-600"
            >
              Subscriptions
            </a>
            <a
              href="/search"
              className="text-black bg-white font-bold px-3 py-1 rounded hover:text-blue-600"
            >
              Search
            </a>
          </form>
        ) : (
          <a
            href="/login"
            className="bg-white text-black px-4 py-2 rounded font-bold hover:text-blue-600"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
