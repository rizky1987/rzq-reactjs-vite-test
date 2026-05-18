import Link from "next/link";
import SidebarWrapper from "./sidebarWrapper";
import { getCurrentUserRole, filterMenusByRole } from "./sidebar.service";

export default async function Sidebar() {
  // 1. Ambil role aktif (di balik layar fungsi ini yang mengurus cookies & Redis)
  const currentRole = await getCurrentUserRole();
  
  // 2. Ambil menu yang sudah disaring
  const menus = filterMenusByRole(currentRole);

  return (
    <SidebarWrapper>
      <div className="p-4 border-b border-blue-600/50 flex items-center h-20">
        <span className="font-bold text-xl tracking-wider block group-[.data-closed]:hidden truncate">
          <Link
            href='/profile'
            className="flex items-center rounded-lg px-6 py-2 hover:bg-blue-800 transition-colors group"
            title='Profile'
          >
            <i className="fas fa-user w-5 text-center text-lg" />
            <span className="ml-1 transition-opacity duration-200 block [.data-closed_&]:opacity-0 [.data-closed_&]:w-0">
              Curriculum Vitae
            </span>
          </Link>
        </span>
      </div>

      <nav className="space-y-2 p-4">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="flex items-center rounded-lg px-4 py-3 hover:bg-blue-800 transition-colors group"
            title={menu.title} 
          >
            <i className={`${menu.icon} w-5 text-center text-lg`} />            
            <span className="ml-4 transition-opacity duration-200 block [.data-closed_&]:opacity-0 [.data-closed_&]:w-0 truncate">
              {menu.title}
            </span>
          </Link>
        ))}
      </nav>
    </SidebarWrapper>
  );
}