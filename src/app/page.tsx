"use client"
import useLocalStorage from "./lib/hooks/use-local-storage";
import Onboarding from "../ui/onboarding";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    let userData = null;
    if (typeof window !== undefined) {
      userData = window?.localStorage?.getItem("userData");
      if (!userData) {
        redirect("/onboarding");
      } else {
        redirect('/dashboard');
      }
    }
  }, []);
  return (
    <>

    </>
  );
}
