import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 px-4">
      <SignIn />
    </div>
  );
}
