import { MenuItem, ROLES } from "./sidebar.types";

export const ALL_MENUS: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "fas fa-tachometer-alt",
    roles: [ROLES.ADMIN],
  },
  {
    title: "Product Management",
    href: "/product",
    icon: "fas fa-box",
    roles: [ROLES.ADMIN, ROLES.USER],
  },
  {
    title: "Login",
    href: "/login",
    icon: "fas fa-sign-in-alt",
    roles: [ROLES.ANONIM],
  },
];