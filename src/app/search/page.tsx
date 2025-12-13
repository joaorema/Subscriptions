"use client"; // Required for useFormState

import React from "react";
import { useFormState } from "react-dom";
import { getSearch } from "./search";

const initialState = {
  bills: [],
  total: 0,
  searched: false,
};

export default function SearchPage() {
  // Connect the Server Action
  const [state, formAction] = useFormState(getSearch, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20">
      <h1 className="text-3xl font-bold mb-8 text-[#333]">Search History</h1>

      {/* SEARCH FORM */}
      <div className="w-full max-w-md">
        <form
          action={formAction}
          className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 mb-8"
        >
          {/* Service Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              By Name
            </label>
            <select
              name="name"
              className="w-full border border-gray-300 p-2 rounded text-black"
            >
              <option value="All">All Services</option>
              <option value="Water">Water</option>
              <option value="Light">Light</option>
              <option value="Gas">Gas</option>
              <option value="Internet">Internet</option>
              <option value="Phone">Phone</option>
              <option value="Rent">Rent</option>
              <option value="Groceries">Groceries</option>
            </select>
          </div>

          {/* Month Picker */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              By Month
            </label>
            <select
              name="month"
              className="w-full border border-gray-300 p-2 rounded text-black"
            >
              <option value="All">All Months</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Find Bills
          </button>
        </form>

        {/* RESULTS SECTION (Only shows after searching) */}
        {state.searched && (
          <div className="bg-white p-6 rounded-lg shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with Total */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Results</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                Total: €{state.total.toFixed(2)}
              </span>
            </div>

            {/* The List */}
            {state.bills.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No bills found for this selection.
              </p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {state.bills.map((bill: any) => (
                  <li
                    key={bill.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100"
                  >
                    <div>
                      <div className="font-bold text-gray-700">{bill.name}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(bill.day).toLocaleDateString("en-GB")}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">
                      €{bill.amount.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
