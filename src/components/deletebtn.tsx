'use client'

import React from 'react'

export default function DeleteButton({ id, action }: { id: string, action: any }) 
{
  return (
    <form 
      action={action}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this item?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="text-gray-400 hover:text-red-500 hover:bg-red-100 p-2 rounded-full transition-all"
        title="Delete"
      >
         {/* The X Icon */}
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
         </svg>
      </button>
    </form>
  )
}