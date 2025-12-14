"use client"; 

import React, { useState } from "react";
import Link from "next/link"; 

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) 
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const links = [
    { href: "/profile", label: "Profile" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/bills", label: "Bills" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/search", label: "Search" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md font-mono">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
      
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium hover:bg-gray-50" >
            Home
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 items-center">
            {isLoggedIn && (
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Hamburger Button (Visible on Mobile Only) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              {/* Icon switches between 'Menu' and 'X' */}
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Conditional Rendering) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {isLoggedIn ? (
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-mono"
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-4 py-2 mt-4 bg-black text-white rounded font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}