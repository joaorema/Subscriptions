"use client";

import React from "react";
import { useFormState } from "react-dom";
import { getSearch } from "./search";
import { deleteBill } from "./search"; // Ensure this import path is correct for your delete action

const initialState = {
  bills: [],
  total: 0,
  searched: false,
};

export default function SearchPage() {
  const [state, formAction] = useFormState(getSearch, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#333]">Search History</h1>

      <div className="w-full max-w-5xl">
        {/* SEARCH FORM */}
        <form
          action={formAction}
          className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4 mb-8 items-end"
        >
          {/* Service Name */}
          <div className="w-full md:flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              By Name
            </label>
            <select
              name="name"
              className="w-full border border-gray-300 p-2.5 rounded text-black bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">All Services</option>
              <option value="Water">Water</option>
              <option value="Light">Light</option>
              <option value="Gas">Gas</option>
              <option value="Internet">Internet</option>
              <option value="Phone">Phone</option>
              <option value="Rent">Rent</option>
              <option value="Insurance">Insurance</option>
              <option value="Groceries">Groceries</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Month Picker */}
          <div className="w-full md:flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              By Month
            </label>
            <select
              name="month"
              className="w-full border border-gray-300 p-2.5 rounded text-black bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full md:w-auto bg-blue-600 text-white font-bold py-2.5 px-8 rounded hover:bg-blue-700 transition shadow-lg mb-[1px]"
          >
            Search
          </button>
        </form>

        {/* RESULTS SECTION */}
        {state.searched && (
          <div className="bg-white p-8 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[400px] flex flex-col">
            {/* Header */}
            
            <div className="relative z-0 flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Results Found
              </h2>
              <span className="bg-green-100 text-green-800 px-5 py-2 rounded-full text-lg font-bold shadow-sm">
                Total: €{state.total.toFixed(2)}
              </span>
            </div>

            {/* The List */}
            {state.bills.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <p className="text-xl italic">
                  No bills found for this selection.
                </p>
              </div>
            ) : (
           
              <ul className="space-y-3">
                {state.bills.map((bill: any) => (
                  <li
                    key={bill.id}
                    
                    className="group relative flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 transition-colors rounded-lg border border-gray-200 z-10 hover:z-20"
                  >
                    {/* Tooltip */}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 z-50 shadow-2xl text-center">
                      {bill.description || "No description provided."}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {bill.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-800">
                          {bill.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(bill.day).toLocaleDateString("en-GB", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="font-bold text-xl text-gray-900">
                        €{bill.amount.toFixed(2)}
                      </div>

                      <form
                        action={deleteBill}
                        onSubmit={(e) => {
                          // This native browser popup returns true (OK) or false (Cancel)
                          if (
                            !confirm(
                              "Are you sure you want to delete this bill?"
                            )
                          ) {
                            e.preventDefault(); // Stop the form if they click Cancel
                          }
                        }}
                      >
                        <input type="hidden" name="id" value={bill.id} />
                        <button
                          type="submit"
                          className="text-gray-400 hover:text-red-500 hover:bg-red-100 p-2 rounded-full transition-all"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </form>
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
