"use client";

import { useState } from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex">
      {/* Container Utama Sidebar dengan Animasi Transisi */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } min-h-screen bg-blue-700 text-white transition-all duration-300 ease-in-out relative flex flex-col justify-between`}
      >
        {/* Tombol Toggle Buka/Tutup */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-6 bg-blue-600 hover:bg-blue-800 text-white border border-blue-500 rounded-full p-1.5 shadow-md z-50 transition"
          aria-label="Toggle Sidebar"
        >
          <svg
            className={`h-4 w-4 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 
          Mengalirkan state isOpen ke elemen children dengan trik CSS global variabel 
          atau membiarkan children menyesuaikan kelas induknya 
        */}
        <div className={`w-full overflow-hidden ${isOpen ? "data-open" : "data-closed"}`}>
          {children}
        </div>
      </aside>
    </div>
  );
}