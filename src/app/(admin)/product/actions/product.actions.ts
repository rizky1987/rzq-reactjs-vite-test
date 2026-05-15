import { Product } from "../types/product.type";

export const products: Product[] = [
  {
    id: 1,
    name: "Mountain Gear X1",
    description:
      "Professional climbing equipment.",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
    status: "In Stock",
  },

  {
    id: 2,
    name: "Mountain Gear X2",
    description:
      "Professional climbing equipment.",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
    status: "In Stock",
  },
];

export async function getProducts() {
  return products;
}