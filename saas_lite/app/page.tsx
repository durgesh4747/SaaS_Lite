import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
        Welcome to Invoice App Lite! Please sign in to continue.
      </div>
    );
  }
  redirect('/dashboard');
}
