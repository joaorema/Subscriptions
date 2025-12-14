import React from 'react'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { addSub } from './addsub';

export default async function SubscriptionPage() 
{
  

  const subscriptions = await prisma.subscription.findMany({
    orderBy: { startDate: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-50">
      <h1 className="text-3xl font-bold mb-8 text-[#333]">Add Subscription</h1>

      {/* THE FORM */}
      <form action={addSub} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
        
        {/* Name Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Service Name</label>
          <input 
            name="name" 
            type="text" 
            placeholder="" 
            className="w-full border border-gray-300 p-2 rounded text-black" 
            required 
          />
        </div>

        {/* Price & Cycle Row */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Price</label>
            <input 
              name="price" 
              type="number" 
              step="1" 
              placeholder="0.00" 
              className="w-full border border-gray-300 p-2 rounded text-black" 
              required 
            />
          </div>
          
          <div className="w-1/2">
            <label className="block text-sm font-mono text-gray-700 mb-1">Cycle</label>
            <select name="billingCycle" className="w-full border border-gray-300 p-2 rounded text-black">
              <option value="Monthly" className='font-mono text-gray-700'>Monthly</option>
              <option value="Yearly" className='font-mono text-gray-700'>Yearly</option>
              <option value="Weekly" className='font-mono text-gray-700'>Weekly</option>
            </select>
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Payment Date</label>
          <input 
            name="nextDate" 
            type="date" 
            className="w-full border border-gray-300 p-2 rounded text-black" 
            required 
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition">
          Add Subscription
        </button>
      </form>
    </div>
  )
}