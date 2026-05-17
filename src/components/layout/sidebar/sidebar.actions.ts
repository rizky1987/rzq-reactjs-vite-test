export interface MenuItem {
  title: string;
  href: string;
  icon: string;

  roles?: (
    | "SUPERADMIN"
    | "ADMIN"
    | "USER"
    | "ANONIM" // 💡 Tambahkan ANONIM ke dalam daftar tipe data roles opsional
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
  | PUBLIC / UNAUTHENTICATED ONLY
  |--------------------------------------------------------------------------
  */
  {
    title: "Login",
    href: "/login",
    icon: "fas fa-sign-in-alt",
    roles: ["ANONIM"], // 💡 Menu ini dikunci khusus untuk user tanpa role / ANONIM
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
    title: "Product",
    href: "/product",
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
  role?: "SUPERADMIN" | "ADMIN" | "USER" | "ANONIM" | string,
) {
  // 💡 1. Jika role kosong, null, undefined, atau string kosong, otomatis paksa statusnya jadi "ANONIM"
  const currentRole = (!role || role.trim() === "") ? "ANONIM" : role.toUpperCase();

  return menus.filter((menu) => {
    /*
    |--------------------------------------------------------------------------
    | PUBLIC MENU (Bisa diakses siapa saja, baik terautentikasi maupun tidak)
    |--------------------------------------------------------------------------
    | Contoh: Jika nanti kamu mengaktifkan menu "Profile" tanpa properti `.roles`
    */
    if (!menu.roles) {
      return true;
    }

    /*
    |--------------------------------------------------------------------------
    | ROLE CHECK
    |--------------------------------------------------------------------------
    */
    // Cek apakah kecocokan role (termasuk kondisi ANONIM) ada di dalam array menu
    return menu.roles.includes(currentRole as any);
  });
}