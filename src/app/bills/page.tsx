import React from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { addbill } from "./addbill";

export default async function SubscriptionPage() {
  const bills = await prisma.bill.findMany({
    orderBy: { day: "desc" }, // Shows newest first
  });
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-50">
      <h1 className="text-3xl font-bold mb-8 text-[#333]">Add Bill</h1>

      <form
        action={addbill}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
      >
        {/* Name Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
              Bill
            </label>
          <select
            name="name"
            className="w-full border border-gray-300 p-2 rounded text-black"
          > 
            <option value="Water">Water</option>
            <option value="Light">Light</option>
            <option value="Gas">Gas</option>
            <option value="Internet">Internet</option>
            <option value="Phone">Phone</option>
            <option value="Rent">Rent</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>

        {/* Price & Cycle Row */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              step="0.25"
              placeholder="0.00"
              className="w-full border border-gray-300 p-2 rounded text-black"
              required
            />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Payment Date
          </label>
          <input
            name="date"
            type="date"
            className="w-full border border-gray-300 p-2 rounded text-black"
            required
          />
        </div>
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea
            name="description"
            placeholder="Add any extra details here..."
            rows={3} 
            className="w-full border border-gray-300 p-2 rounded text-black resize-none"
            required
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Bill
        </button>
      </form>
    </div>
  );
}
