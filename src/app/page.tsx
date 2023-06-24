"use client"
import useLocalStorage from "./lib/hooks/use-local-storage";
import Onboarding from "../ui/onboarding";
import Link from "next/link";

export default function Page() {
  const [onboardingCompleted, setValue] = useLocalStorage("onboarding-completed", false);
  return (
    <>
      <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
        <div className="flex items-center justify-center max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-4 py-2">
            {onboardingCompleted ? (
              <>
                <Link href="/journal">
                  Wanna journal
                </Link>
                <Link href="/upload">
                  Process existing journal
                </Link>
              </>
            ) : (
              <Onboarding />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
