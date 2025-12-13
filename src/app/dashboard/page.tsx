import React from 'react'
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export default async function dashboardPage() 
{
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    console.log(userId);
    
    
  const bills = await prisma.bill.findMany({
    where:{
        userId: userId?.value
    },
    orderBy:{
        day: 'desc'
    }
  });
  const subs = await prisma.subscription.findMany({
    where:{
        userId: userId?.value
    },
    orderBy: {nextBillingDate: 'desc'}
  })

  return (
    <div className='py-25 text-center flex flex-col items-center'>
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Your Bills</h2>
        <ul className="space-y-3">
          {bills.map((sub) => (
            <li key={sub.id} className="group relative bg-white p-4 rounded shadow border-l-4 border-blue-500 flex justify-between items-center">
              
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 z-10 shadow-lg">
                {sub.description || "No description provided."}
              </div>

              <div>
                <div className="font-bold text-gray-800">{sub.name}</div>
                <div className="text-xs text-gray-500">
                   Date: {sub.day.toLocaleDateString('en-GB')}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">€{sub.amount}</div>
                <div className="text-xs text-gray-500 lowercase">{sub.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Your Subscriptions</h2>
        <ul className="space-y-3">
          {subs.map((sub) => (
            <li key={sub.id} className="group relative bg-white p-4 rounded shadow border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <div className="font-bold text-gray-800">{sub.name}</div>
                <div className="text-xs text-gray-500">
                   Date: {sub.nextBillingDate.toLocaleDateString('en-GB')}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">€{sub.price}</div>
                <div className="text-xs text-gray-500 lowercase">{sub.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
