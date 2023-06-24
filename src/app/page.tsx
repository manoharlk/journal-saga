"use client"
import useLocalStorage from "./lib/hooks/use-local-storage";
import Onboarding from "../ui/onboarding";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  let userData = null;
  if (typeof window !== undefined) {
    userData = window?.localStorage?.getItem("userData");
    if (!userData) {
      redirect("/onboarding");
    } else {
      redirect('/dashboard');
    }
  }
  return (
    <>
      
    </>
  );
}
