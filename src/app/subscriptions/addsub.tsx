"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Redirect } from "next";
import prisma from "@/lib/prisma";


export async function addSub(formData :FormData) 
{
    const name = formData.get('name') as string;
    const priceStr = formData.get('price') as string;
    const billingCycle = formData.get('billingCycle') as string;
    const startDateStr = formData.get('nextDate') as string;
    
    // 2. Data Conversion (The Important Part)
    const price = parseFloat(priceStr);
    const startDate = new Date(startDateStr); // Converts "2023-10-25" to Date Object
    const nextBillingDate = new Date(startDateStr);
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1) 

    const cookieSote = await cookies();
    const userId = cookieSote.get('userId')?.value;

    if(!userId)
    {
        console.log("error on addsub");
        return;
    }

    // 3. Create Record
    await prisma.subscription.create({
      data: {
        name: name,
        price: price,
        billingCycle: billingCycle,
        startDate: startDate,
        nextBillingDate: nextBillingDate,
        userId: userId,   
        active: true,          // Default to true
      },
    }); 

    revalidatePath('/subscriptions');
}