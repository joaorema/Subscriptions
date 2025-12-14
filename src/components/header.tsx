import React from "react";
import { cookies } from "next/headers"
import NavbarClient from "./navbar_helper";

export default async function Navbar() 
{
  
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  const isLoggedIn = !!userId;

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}