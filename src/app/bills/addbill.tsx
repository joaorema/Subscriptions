'use server';

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addbill(formData: FormData) 
{
    // 1. Get the mandatory fields
    const service = formData.get('name') as string;
    const pricestr = formData.get('price') as string;
    const datestr = formData.get('date') as string; // This is the "Payment Date" from the form
    const description = formData.get('description') as string;
    
    // 2. Get the optional Cycle field
    const billingCycleRaw = formData.get('billingCycle') as string;

    const price = parseFloat(pricestr);
    const date = new Date(datestr); 

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if(!userId) {
        console.log("Error: No User ID");
        return;
    }
    let finalCycle = null;     
    let finalNextDate = null;   


    if (billingCycleRaw) 
    {
        finalCycle = billingCycleRaw;
        const calculatedDate = new Date(date); 

        if (finalCycle === 'Yearly') {
            calculatedDate.setFullYear(calculatedDate.getFullYear() + 1);
        } else if (finalCycle === 'Weekly') {
            calculatedDate.setDate(calculatedDate.getDate() + 7);
        } else {
            // Default to Monthly
            calculatedDate.setMonth(calculatedDate.getMonth() + 1);
        }

        finalNextDate = calculatedDate;
    }

    // 4. Create in DB
    await prisma.bill.create({
        data: {
            name: service,
            amount: price,
            day: date,
            userId: userId,
            description: description,
            // Pass the calculated variables (value or null)
            billingCycle: finalCycle,
            nextBillingDate: finalNextDate
        },
    })

    revalidatePath('/bills') // or '/dashboard'
}