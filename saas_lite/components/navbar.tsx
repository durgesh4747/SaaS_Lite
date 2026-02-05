import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 bg-gray-300 border-b border-black">
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <SignedOut>
        <SignInButton>
          <button className="bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded ">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      {/* Show the user button when the user is signed in */}
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </header>
  );
}
