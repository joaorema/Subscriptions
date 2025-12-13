"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import prisma from "@/lib/prisma";

export async function getSearch(prevState: any, formData: FormData) 
{
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) redirect('/login');

    const searchName = formData.get('name') as string;
    const searchMonth = formData.get('month') as string;

    // LOGIC: If "All" is selected, we pass undefined to fetch everything
    const nameFilter = searchName === "All" ? undefined : searchName;

    // 1. Fetch from DB
    const bills = await prisma.bill.findMany({
        where: {
            userId: userId,
            name: nameFilter, // If undefined, it ignores this filter
        },
        orderBy: { day: 'desc' }
    });

    // 2. Filter by Month (Javascript)
    // We need a map because your dropdown sends "January", but Date() needs 0
    const monthMap: { [key: string]: number } = {
        "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
        "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };

    let finalBills = bills;

    if (searchMonth && searchMonth !== "All") {
        const targetMonthIndex = monthMap[searchMonth];
        
        // Filter: Keep only bills where the month matches
        finalBills = bills.filter(item => {
            return item.day.getMonth() === targetMonthIndex;
        });
    }

    // 3. Calculate Totals
    const total = finalBills.reduce((sum, item) => sum + item.amount, 0);

    return {
        bills: finalBills,
        total: total,
        searched: true, // Flag to tell UI "We have searched!"
    }
}