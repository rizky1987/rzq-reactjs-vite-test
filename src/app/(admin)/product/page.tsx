"use client";

import { useState } from "react";

import Alert from "@/components/ui/Alert";

import CreateProductModal from "./components/Create";
import ProductListView from "./components/ProductListView";
import ViewProductModal from "./components/View";

import { useProductList } from "./hooks/useProductList";
import { Product } from "@/app/(admin)/product/types/product.type";

export default function ProductList() {

  const {
    products,
    refreshProducts,
  } = useProductList();

  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);

  const [
    isViewOpen,
    setIsViewOpen,
  ] = useState(false);

  const [alert, setAlert] =
    useState<{
      type:
        | "success"
        | "danger"
        | "warning";
      msg: string;
    } | null>(null);

  const [processOptionCreateUpdate, setProcessOptionCreateUpdate] = 
      useState<'create' | 'update'>('create');

  const [processOptionViewDelete, setProcessOptionViewDelete] = 
   useState<'view' | 'delete'>('view');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSuccess = (
    message: string,
    alertType: "success" | "danger" | "warning",
  ) => {
    setAlert({
      type: alertType,
      msg: message,
    });

    if (alertType === "success") {
      refreshProducts();
    }
  };

  const doCreate = () => {
    setSelectedProduct(null);
    setIsCreateOpen(true);
    setProcessOptionCreateUpdate("create");
  };

  const doUpdate = (product : Product) => {
    setSelectedProduct(product);
    setIsCreateOpen(true);
    setProcessOptionCreateUpdate("update");
  };

  const doView = (product : Product) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
    setProcessOptionViewDelete("view");
  };

  const doDelete = (product : Product) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
    setProcessOptionViewDelete("delete");
  };

  return (
    <>
      {/* Alert */}
      {alert && (
        <div className="fixed right-5 top-20 z-50">
          <Alert
            type={alert.type}
            message={alert.msg}
            onClose={() =>
              setAlert(null)
            }
          />
        </div>
      )}

      {/* Modals */}
      <CreateProductModal
        isOpen={isCreateOpen}
        onClose={() =>
          setIsCreateOpen(false)
        }
        process={processOptionCreateUpdate}
        onSuccess={handleSuccess}
        product={selectedProduct}
      />

      <ViewProductModal
        isOpen={isViewOpen}
        onClose={() =>
          setIsViewOpen(false)
        }
        proccess={processOptionViewDelete}
        product={selectedProduct}
        onSuccess={handleSuccess}
      />

      {/* View */}
      <ProductListView
        products={products}
        onCreate={doCreate}
        onUpdate={(product) => {
          doUpdate(product);
        }}
        onView={(product) => {
          doView(product);
        }}
        onDelete={(product) => {
          doDelete(product);
        }}
      />
    </>
  );
}