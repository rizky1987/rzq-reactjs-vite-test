import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";

import { Product } from "../types/product.type";

interface Props {
  products: Product[];

  onCreate: () => void;

  onUpdate: () => void;

  onView: () => void;

  onDelete: () => void;
}

export default function ProductListView({
  products,
  onCreate,
  onUpdate,
  onView,
  onDelete,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
          </h1>

          <p className="text-sm text-gray-500">
            Manage your products
          </p>
        </div>

        <Button
          variant="primary"
          buttonType="add"
          onClick={onCreate}
        >
          Add Product
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 z-10 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Actions */}
              <div className="absolute left-3 top-3 z-20 flex gap-2">
                <ButtonIcon
                  buttonType="view"
                  onClick={onView}
                />

                <ButtonIcon
                  buttonType="edit"
                  onClick={onUpdate}
                />
              </div>

              <div className="absolute right-3 top-3 z-20">
                <ButtonIcon
                  buttonType="delete"
                  onClick={onDelete}
                />
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h5 className="mb-1 text-lg font-semibold text-gray-800">
                {product.name}
              </h5>

              <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-blue-600">
                  ${product.price}
                </span>

                <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}