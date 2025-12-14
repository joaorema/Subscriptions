import React from "react";
import AddBillForm from "./addbillform";

export default async function SubscriptionPage() {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#333]">Add Bill</h1>

      {/* The form handles its own interactivity now */}
      <AddBillForm />
      
    </div>
  );
}