"use client"; // Must be at the top

import React, { useState } from "react";
import { addbill } from "./addbill";

export default function AddBillForm() {
  // 1. Track the selected option
  const [category, setCategory] = useState("Water");

  // 2. Define which options show the Cycle
  const showCycleOptions = [
    "Rent",
    "Water",
    "Light",
    "Gas",
    "Internet",
    "Phone",
    "Insurance",
  ];

  const shouldShowCycle = showCycleOptions.includes(category);

  return (
    <form
      action={addbill}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
    >
      {/* Name Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Bill Type
        </label>
        <select
          name="name"
          value={category}
          // Update state when user changes selection
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-black bg-white"
        >
          <option value="Water">Water</option>
          <option value="Light">Light</option>
          <option value="Gas">Gas</option>
          <option value="Internet">Internet</option>
          <option value="Phone">Phone</option>
          <option value="Rent">Rent</option>
          <option value="Insurance">Insurance</option>
          
          <option disabled>──────────</option>
          
          <option value="Groceries">Groceries</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Price & Cycle Row */}
      <div className="flex gap-4">
        {/* Price - Grows to full width if Cycle is hidden */}
        <div className={shouldShowCycle ? "w-1/2" : "w-full"}>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Price
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full border border-gray-300 p-2 rounded text-black"
            required
          />
        </div>

        {/* Cycle - Only shown for specific categories */}
        {shouldShowCycle && (
          <div className="w-1/2 animate-in fade-in slide-in-from-left-2 duration-300">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Cycle
            </label>
            <select
              name="billingCycle"
              className="w-full border border-gray-300 p-2 rounded text-black bg-white"
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
        )}
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

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Add any extra details here..."
          rows={3}
          className="w-full border border-gray-300 p-2 rounded text-black resize-none"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add Bill
      </button>
    </form>
  );
}