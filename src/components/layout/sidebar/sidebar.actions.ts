export interface MenuItem {
  title: string;
  href: string;
  icon: string;

  roles?: (
    | "SUPERADMIN"
    | "ADMIN"
    | "USER"
  )[];
}

/*
|--------------------------------------------------------------------------
| SIDEBAR MENUS
|--------------------------------------------------------------------------
*/

export const menus: MenuItem[] = [
  /*
  |--------------------------------------------------------------------------
  | PUBLIC
  |--------------------------------------------------------------------------
  */

  {
    title: "Profile",
    href: "/profile",
    icon: "fas fa-user",
  },

  /*
  |--------------------------------------------------------------------------
  | ADMIN ONLY
  |--------------------------------------------------------------------------
  */

  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "fas fa-chart-line",
    roles: ["ADMIN"],
  },

  /*
  |--------------------------------------------------------------------------
  | ADMIN & USER
  |--------------------------------------------------------------------------
  */

  {
    title: "Products",
    href: "/products",
    icon: "fas fa-box",
    roles: ["ADMIN", "USER"],
  },
];

/*
|--------------------------------------------------------------------------
| FILTER MENU
|--------------------------------------------------------------------------
*/

export function filterMenusByRole(
  role?: "SUPERADMIN" | "ADMIN" | "USER" | string, // Izinkan menerima string biasa agar fleksibel
) {
  return menus.filter((menu) => {
    /*
    |--------------------------------------------------------------------------
    | PUBLIC MENU
    |--------------------------------------------------------------------------
    */
    if (!menu.roles) {
      return true;
    }

    /*
    |--------------------------------------------------------------------------
    | NO ROLE
    |--------------------------------------------------------------------------
    */
    if (!role) {
      return false;
    }

    /*
    |--------------------------------------------------------------------------
    | ROLE CHECK (KINI AMAN DARI CASE-SENSITIVE)
    |--------------------------------------------------------------------------
    */
    // 💡 Paksa string role dari Redis/Database menjadi UPPERCASE sebelum dicek
    const upperCaseRole = role.toUpperCase();

    return menu.roles.includes(upperCaseRole as any);
  });
}