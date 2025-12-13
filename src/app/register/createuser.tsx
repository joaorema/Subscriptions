"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string; // This now matches the HTML name

  // Validation
  if (!password || password.length < 10) {
    return { message: "Password must be at least 10 characters long" };
  }

  try {
    // Attempt to create user
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: password, 
      },
    });
  } 
  catch (e) 
  {
    
    return { message: "❌ Email already registered or DB error" };
  }

  
  redirect("/login");
}