"use client";

import { useState, useTransition } from 'react';
import { handleServerLogout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export function useTopbar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    setShowDropdown(false);

    startTransition(async () => {
      try {
        await handleServerLogout();
        router.push("/login");
       
      } catch (error) {
        console.error("Terjadi kesalahan saat logout:", error);
      }
    });
  };

  const toggleDropdown = () => {
    if (!isPending) {
      setShowDropdown((prev) => !prev);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return {
    showDropdown,
    isPending,
    handleLogout,
    toggleDropdown,
    closeDropdown,
  };
}