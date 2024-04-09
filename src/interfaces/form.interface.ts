import { IProduct } from "./product.interface";

export interface ISelectedValues {
  selectedCategory: string;
  selectedProducts: IProduct[];
}
export interface IFilterFormProps {
  categories: string[];
  onSubmit: (
    category: string,
    products: IProduct[],
    selectedProductIDs: number[]
  ) => void;
  initValues: {
    selectedCategory: string;
    selectedCategoryProducts: IProduct[];
    selectedProductIDs: number[];
  };
}

export interface IFormValues {
  selectedCategory: string;
  selectedProducts: number[];
}
