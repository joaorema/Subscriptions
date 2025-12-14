"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSub(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.subscription.delete({ where: { id: id } });
    revalidatePath("/dashboard"); 
  } catch (error) {
    console.error("Failed to delete sub:", error);
  }
}

export async function deleteBill(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  try {
    await prisma.bill.delete({ where: { id: id } });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
  }
}
