"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('userId'); 
  redirect('/');
}

export async function getName() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  const username = await prisma.user.findUnique({
    where: {id : userId}
  })
  const name = username?.name;
  return name;
}

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [{ password: password }, { name: username }],
    },
  });

  if (!existingUser) {
    return { message: "User not found!" };
  }

  const cookieStore = await cookies();
  cookieStore.set('userId', existingUser.id)
  redirect("/profile");
}
