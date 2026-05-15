export type UserRole =
  | "SUPERADMIN"
  | "ADMIN"
  | "USER"


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