
export const ROLES = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
  ANONIM: "ANONIM"
} as const;

export type UserRole = "SUPERADMIN" | "ADMIN" | "USER" | "ANONIM";
export interface MenuItem {
  title: string;
  href: string;
  icon: string;
  roles?: (UserRole)[]; 
}
