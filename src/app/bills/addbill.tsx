'use server';
import React from 'react'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';


export async function addbill(formData: FormData) 
{
    const service = formData.get('name') as string;
    const pricestr = formData.get('price') as string;
    const datestr = formData.get('date') as string
    const description = formData.get('description') as string;

    const price = parseFloat(pricestr);
    const date = new Date(datestr);

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if(!userId)
    {
        console.log("error");
        return;
    }

    await prisma.bill.create({
        data:{
            name:service,
            amount:price,
            day:date,
            userId: userId,
            description: description
        },

    })
    revalidatePath('/bills')
}
