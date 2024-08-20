import { ProductForm } from "@/components/shared/ProductForm";
import React from "react";
import { useParams } from "react-router-dom";

interface AddProductProps {
  mode: "create" | "edit";
}

const AddProduct: React.FC<AddProductProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();

  return <ProductForm mode={mode} id={id} />;
};

export default AddProduct;
