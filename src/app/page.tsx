import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { logoutAction } from "./login/loginuser";
import { getName } from "./login/loginuser";

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const name = getName();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 font-mono">
      {!userId ? (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 font-mono">
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="flex justify-center items-center w-full py-3 px-4 text-black font-medium rounded-lg transition-all shadow-sm hover:text-blue-600 hover:shadow-md"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="flex hover:text-blue-600 justify-center items-center w-full py-3 px-4 text-black font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Register
            </Link>

          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full font-mono">
          {/* 1. Header & Greeting */}
          <div className="mb-6 border-b border-gray-100 pb-4 text-center font-mono">
            <h2 className="text-2xl font-bold text-gray-800 mt-1 font-mono">
              Welcome Back
              <p>{name} </p>
            </h2>
          </div>
          {/* 3. Primary Actions */}
          <div className="flex flex-col gap-3 font-mono">
            <Link
              href="/profile"
              className="flex justify-center font-mono items-center w-full py-3 px-4 text-black font-medium rounded-lg transition-all shadow-sm hover:text-blue-600 hover:shadow-md"
            >
              Go to Profile
            </Link>

            <Link
              href="/dashboard"
              className="flex hover:text-blue-600 justify-center items-center w-full py-3 px-4 text-black font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/bills"
              className="flex hover:text-blue-600 justify-center items-center w-full py-3 px-4 text-black font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Add New Bill
            </Link>

            <Link
              href="/subscriptions"
              className="flex justify-center hover:text-blue-600 items-center w-full py-3 px-4 text-black font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Add New Subscription
            </Link>
          </div>
          <div className="mt-auto pt-10">
            <form action={logoutAction}>
              <button className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors">
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
