import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-300 px-4 py-5">
      <SignUp />
    </div>
  );
}
