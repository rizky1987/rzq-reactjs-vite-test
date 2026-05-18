"use client";

import { useState, useTransition } from 'react';
import { handleServerLogout } from "@/app/actions/auth";

export function useTopbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    setShowDropdown(false);

    startTransition(async () => {
      try {
        await handleServerLogout();
      } catch (error) {
        console.error("Terjadi kesalahan saat logout:", error);
        window.location.href = '/login';
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