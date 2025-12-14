import React from 'react'
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { deleteSub } from './action'; 
import DeleteButton from '@/src/components/deletebtn'; 

export default async function DashboardPage() 
{
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) 
    return <div>Please log in</div>;
    
  // 1. Fetch Data
  const bills = await prisma.bill.findMany({
    where:{ userId: userId },
    orderBy:{ day: 'desc' }
  });
  const rent = await prisma.bill.findMany({
    where:{ userId: userId, name:"Rent" },
    orderBy:{ day: 'desc' }
  });

  const internet = await prisma.bill.findMany({
    where:{ userId: userId, name:"Internet" },
    orderBy:{ day: 'desc' }
  });

  const light = await prisma.bill.findMany({
    where:{ userId: userId, name:"Light" },
    orderBy:{ day: 'desc' }
  });

  const water = await prisma.bill.findMany({
    where:{ userId: userId, name:"Water" },
    orderBy:{ day: 'desc' }
  });

  const groceries = await prisma.bill.findMany({
    where:{ userId: userId, name:"Groceries" },
    orderBy:{ day: 'desc' }
  });

  const Insurance = await prisma.bill.findMany({
    where:{ userId: userId, name:"Insurance" },
    orderBy:{ day: 'desc' }
  });
  const subs = await prisma.subscription.findMany({
    where:{ userId: userId },
    orderBy: { nextBillingDate: 'desc' }
  });


  const nextUp = subs.length > 0 
    ? subs.reduce((closest, current) => 
        current.nextBillingDate < closest.nextBillingDate ? current : closest
      )
    : null;

  // 3. Helper for Max Amounts
  function getMaxAmount(categoryName: string) {
    const categoryBills = bills.filter(b => b.name === categoryName);
    if (categoryBills.length === 0) return 0;
    return Math.max(...categoryBills.map(b => b.amount));
  }

  //const nextRent = ren

  const maxWater = getMaxAmount("Water");
  const maxLight = getMaxAmount("Light");
  const maxInternet = getMaxAmount("Internet");
  const maxGroceries = getMaxAmount("Groceries");
  const maxInsurance = getMaxAmount("Insurance");

  // 4. Totals
  const totalGroceries = groceries.reduce((sum, item) => sum + item.amount, 0);
  const totalinsurance = Insurance.reduce((sum, item) => sum + item.amount, 0);
  const totalWater = water.reduce((sum, item) => sum + item.amount, 0);
  const totalLight = light.reduce((sum, item) => sum + item.amount, 0);
  const totalInternet = internet.reduce((sum, item) => sum + item.amount, 0);
  const totalrent = rent.reduce((sum, item) => sum + item.amount, 0);
  const totalBills = bills.reduce((sum, item) => sum + item.amount, 0);
  const totalSubs = subs.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = totalBills + totalSubs;

  return (
    <div className='min-h-screen bg-gray-50 py-20 px-4 flex flex-col items-center font-mono'>
      
      {/* TOP SUMMARY CARDS */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          
          {/* Card 1: Total Spent */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-zinc-600">
             <div className="text-gray-500 text-sm font-bold uppercase">Total Spent</div>
             <div className="text-3xl font-mono text-gray-800 mt-2">€{grandTotal.toFixed(2)}</div>
          </div>


          {/* Card 2: Active Subs Count */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
             <div className="text-gray-500 text-sm font-bold uppercase">Active Subs</div>
             <div className="text-3xl font-mono text-gray-800 mt-2">{subs.length}</div>
          </div>
          {/* Card 3: NEXT SUBSCRIPTION (Replaced 'Bills Count') */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
             <div className="text-gray-500 text-sm font-mono uppercase">Next Payment</div>
             
             {nextUp ? (
                <div className="mt-2">
                    <div className="text-2xl font-mono font-bold text-gray-800 truncate">{nextUp.name}</div>
                    <div className="flex justify-between items-end mt-1">
                        <span className="text-xs font-mono text-gray-800 px-2 py-1 rounded">
                            {nextUp.nextBillingDate.toLocaleDateString('en-GB')}
                        </span>
                        <span className="font-mono text-gray-800 font-bold">€{nextUp.price.toFixed(2)}</span>
                    </div>
                </div>
             ) : (
                <div className="text-xl font-bold text-gray-400 mt-2">None upcoming</div>
             )}
          </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT SIDE: HOUSE TOTALS */}
        <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                House Total
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
                {/* 1. RENT */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <div className="text-3xl">🏠</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">Rent</div>
                    <div className="text-xl font-mono text-gray-800">€{totalrent.toFixed(2)}</div>
                </div>

                {/* 2. WATER */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <div className="text-3xl">💧</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">Water</div>
                    <div className="text-xl font-mono text-gray-800">€{totalWater.toFixed(2)}</div>
                </div>

                {/* 3. LIGHT */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <div className="text-3xl">⚡</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">Light</div>
                    <div className="text-xl font-mono text-gray-800">€{totalLight.toFixed(2)}</div>
                </div>

                {/* 4. INTERNET */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <div className="text-3xl">🌐</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">Internet</div>
                    <div className="text-xl font-mono text-gray-800">€{totalInternet.toFixed(2)}</div>
                </div>
                {/* 5. Groceries */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <div className="text-3xl">🛒</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">Groceries</div>
                    <div className="text-xl font-mono text-gray-800">€{totalGroceries.toFixed(2)}</div>
                </div>
                {/* 6. Insurance */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                    <div className="text-3xl">🏥</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">Insurance</div>
                    <div className="text-xl font-mono text-gray-800">€{totalinsurance.toFixed(2)}</div>
                </div>
            </div>
        </div>

        {/* RIGHT SIDE: SUBSCRIPTIONS */}
        <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                Subscriptions
            </h2>
             {subs.length === 0 ? <p className="text-gray-400 italic">No subscriptions found.</p> : (
                <ul className="space-y-3">
                {subs.map((sub) => (
                    <li key={sub.id} className="group relative bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex justify-between items-center">
                    
                    {/* Left Info */}
                    <div>
                        <div className="font-bold text-gray-800">{sub.name}</div>
                        <div className="text-xs text-gray-500">
                           Next: {sub.nextBillingDate.toLocaleDateString('en-GB')}
                        </div>
                    </div>

                    {/* Right Info + Delete */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="font-bold text-gray-900">€{sub.price.toFixed(2)}</div>
                            <div className="text-xs text-gray-500 lowercase">{sub.billingCycle || 'monthly'}</div>
                        </div>
                        <DeleteButton id={sub.id} action={deleteSub} />
                    </div>
                    </li>
                ))}
                </ul>
             )}
        </div>

      </div>
    </div>
  )
}