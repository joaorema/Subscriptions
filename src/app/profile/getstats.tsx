"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'
import prisma from "@/lib/prisma";

export async function getStats() 
{
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId)
        redirect('/login');

    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    const bills = await prisma.bill.findMany({
    where:{
      userId: userId
    }
  });
  const subs = await prisma.subscription.findMany({
    where:{
      userId: userId
    }
  });

    const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const totalSubs = subs.reduce((sum, sub) => sum + sub.price, 0);
    const grandTotal = totalBills + totalSubs;

    return{
        totalBills,
        totalSubs,
        grandTotal,
        billCount: bills.length,
        subsCount: subs.length
    }
    
}