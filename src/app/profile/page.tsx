import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { logoutAction } from '../login/loginuser'
import { getStats } from './getstats'

export default async function ProfilePage() {
  
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  const date = user?.createdAt.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })


  const userData = await getStats();

  if (!user) 
    return;

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-20 px-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col min-h-[600px]">
        
        {/* Top Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 shrink-0"></div>

        <div className="px-8 pb-8 flex-1 flex flex-col">
          
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{user.name || "Anonymous User"}</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6"></div>

          {/* Details Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Account Details</h2>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Member Since</span>
              <span className="text-gray-900 font-semibold">
                {date}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Total Bills</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {userData.billCount}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Total Subscriptions</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {userData.subsCount}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Total Bills Amount</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {userData.totalBills}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Total Subscriptions Amount</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {userData.totalSubs}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Total Money Spent</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {userData.grandTotal}
              </span>
            </div>
          </div>

          {/* CHANGE 3: Added 'mt-auto'
              This pushes the button to the very bottom of the flex container 
          */}
          <div className="mt-auto pt-10">
            <form action={logoutAction}>
              <button className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                Logout
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}