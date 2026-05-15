"use client";

import { useState } from "react";

import Alert from "@/components/ui/Alert";

import CreateProductModal from "./components/Create";
import ProductListView from "./components/ProductListView";
import ViewProductModal from "./components/View";

import { useProductList } from "./hooks/useProductList";

export default function ProductList() {
  const {
    products,
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

  const handleSuccess = (
    message: string,
  ) => {
    setAlert({
      type: "success",
      msg: message,
    });
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
        process="create"
        onSuccess={handleSuccess}
      />

      <ViewProductModal
        isOpen={isViewOpen}
        onClose={() =>
          setIsViewOpen(false)
        }
        proccess="view"
        productId="1"
      />

      {/* View */}
      <ProductListView
        products={products}
        onCreate={() =>
          setIsCreateOpen(true)
        }
        onUpdate={() =>
          setIsCreateOpen(true)
        }
        onView={() =>
          setIsViewOpen(true)
        }
        onDelete={() =>
          setIsViewOpen(true)
        }
      />
    </>
  );
}