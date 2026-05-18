import Link from "next/link";
import SidebarWrapper from "./sidebarWrapper";
import { getCurrentUserRole, filterMenusByRole } from "./sidebar.service";

export default async function Sidebar() {
  const currentRole = await getCurrentUserRole();
  
  const menus = filterMenusByRole(currentRole);

  return (
    <SidebarWrapper>
      <div className="p-2 border-b border-blue-600/50 flex items-center h-15">
        <span className="font-bold text-xl tracking-wider block group-[.data-closed]:hidden truncate">
          <Link
            href='/profile'
            className="flex items-center rounded-lg px-6 py-2 hover:bg-blue-800 transition-colors group"
            title='Profile'
          >
            <i className="fas fa-user w-5 text-center text-lg" />
            <span className="ml-1 text-sm transition-opacity duration-200 block [.data-closed_&]:opacity-0 [.data-closed_&]:w-0">
              Curriculum Vitae
            </span>
          </Link>
        </span>
        
      </div>
      <div className="p-2 border-b border-blue-600/50 flex items-center h-15">
        <span className="font-bold text-xl tracking-wider block group-[.data-closed]:hidden truncate">
          <Link
            href='/docs'
            className="flex items-center rounded-lg px-6 py-2 hover:bg-blue-800 transition-colors group"
            title='Technical Specifications'
          >
            <i className="fas fa-cubes w-5 text-center text-lg" />
            <span className="ml-1 text-sm transition-opacity duration-200 block [.data-closed_&]:opacity-0 [.data-closed_&]:w-0">
              Technical Specifications
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