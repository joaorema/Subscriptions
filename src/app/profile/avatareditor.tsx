"use client";

import React, { useState } from "react";
import { updateAvatar } from "./getstats";

const PLACEHOLDERS = [
  "https://api.dicebear.com/7.x/micah/svg?seed=Lion",
  "https://api.dicebear.com/7.x/micah/svg?seed=Tiger",
  "https://api.dicebear.com/7.x/micah/svg?seed=Bear",
  "https://api.dicebear.com/7.x/micah/svg?seed=Fox",
  "https://api.dicebear.com/7.x/micah/svg?seed=Wolf",
  "https://api.dicebear.com/7.x/micah/svg?seed=Eagle",
  "https://api.dicebear.com/7.x/micah/svg?seed=Shark",
  "https://api.dicebear.com/7.x/micah/svg?seed=Panther",
  "https://api.dicebear.com/7.x/micah/svg?seed=Owl",
  "https://api.dicebear.com/7.x/micah/svg?seed=Falcon",
  "https://api.dicebear.com/7.x/micah/svg?seed=Apollo",
  "https://api.dicebear.com/7.x/micah/svg?seed=Nova",
  "https://api.dicebear.com/7.x/micah/svg?seed=Atlas",
  "https://api.dicebear.com/7.x/micah/svg?seed=Orion",
  "https://api.dicebear.com/7.x/micah/svg?seed=Echo",
  "https://api.dicebear.com/7.x/micah/svg?seed=Zephyr",
  "https://api.dicebear.com/7.x/micah/svg?seed=Pixel",
  "https://api.dicebear.com/7.x/micah/svg?seed=Shadow",
  "https://api.dicebear.com/7.x/micah/svg?seed=Comet",
  "https://api.dicebear.com/7.x/micah/svg?seed=Blaze",
  
];

export default function AvatarEditor({
  currentAvatar,
}: {
  currentAvatar?: string | null;
}) {
  const safeAvatar = currentAvatar || PLACEHOLDERS[0];
  const [avatar, setAvatar] = useState(safeAvatar);

  const handleNextAvatar = async () => {
    const currentIndex = PLACEHOLDERS.indexOf(avatar);

    const nextIndex = (currentIndex + 1) % PLACEHOLDERS.length;
    const nextAvatarUrl = PLACEHOLDERS[nextIndex];

    setAvatar(nextAvatarUrl);

    const formData = new FormData();
    formData.append("avatarUrl", nextAvatarUrl);
    await updateAvatar(formData);
  };

  return (
    <div className="relative -mt-16 mb-4 flex justify-center group">
      {/* Image Container */}
      <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white relative">
        <img
          src={avatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
      </div>

      {/* Cycle Button */}
      <div className="absolute bottom-0 right-1/3 translate-x-4 translate-y-2">
        <button
          type="button"
          onClick={handleNextAvatar}
          className="bg-white text-gray-700 p-2 rounded-full shadow-lg border border-gray-200 hover:bg-blue-50 transition-transform active:scale-95 cursor-pointer z-10"
          title="Change Avatar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
