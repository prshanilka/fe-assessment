// FilterForm.tsx
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, Field, FieldProps } from "formik";
import {
  Button,
  FormControl,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { IProduct } from "@/interfaces/product.interface";
import { fetchProductsByCategory } from "@/services/api";
import { categoryToHumanReadable } from "@/helpers/helpers";
import "./filter-form.scss";
import { IFilterFormProps, IFormValues } from "@/interfaces/form.interface";

const FilterForm: React.FC<IFilterFormProps> = ({
  categories,
  onSubmit,
  initValues: {
    selectedCategory,
    selectedCategoryProducts,
    selectedProductIDs,
  },
}) => {
  const [products, setProducts] = useState<IProduct[]>(
    selectedCategoryProducts
  );

  const fetchProductData = async (category: string) => {
    try {
      const productsData = await fetchProductsByCategory({
        category,
      });
      setProducts(productsData.products);
    } catch (error) {
      throw new Error("Failed");
    }
  };

  const handleSubmit = (
    values: IFormValues,
    actions: FormikHelpers<IFormValues>
  ) => {
    actions.resetForm();
    onSubmit(values.selectedCategory, products, values.selectedProducts);
    actions.setSubmitting(false);
  };
  return (
    <Formik<IFormValues>
      initialValues={{
        selectedCategory,
        selectedProducts: selectedProductIDs,
      }}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, isValid, dirty, resetForm }) => (
        <Form className="sidebar-form">
          <Box className="top-wrapper" sx={{ pr: 2, pl: 2, pt: 4 }}>
            <Typography variant="h3">Filter</Typography>
            <Button
              type="button"
              className="clear-btn"
              onClick={() => {
                resetForm();
                setProducts([]);
                onSubmit("", [], []);
              }}
              disabled={!values.selectedCategory}
            >
              Clear
            </Button>
          </Box>

          <Field name="selectedCategory">
            {({ field, form }: FieldProps<string>) => (
              <FormControl className="form-control">
                <Autocomplete
                  {...field}
                  fullWidth
                  id="tags-outlined"
                  options={categories}
                  getOptionLabel={(option) => categoryToHumanReadable(option)}
                  filterSelectedOptions
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      form.setFieldValue(field.name, newValue);
                      form.setFieldValue("selectedProducts", []);
                      fetchProductData(newValue as string);
                    } else {
                      resetForm();
                      setProducts([]);
                      onSubmit("", [], []);
                    }
                  }}
                  onBlur={field.onBlur}
                  value={field.value || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      placeholder="Select a Category"
                    />
                  )}
                />
              </FormControl>
            )}
          </Field>
          <Field name="selectedProducts">
            {({ field, form }: FieldProps<number[]>) => (
              <FormControl className="form-control">
                <Autocomplete
                  {...field}
                  fullWidth
                  multiple
                  id="selected-products-chip"
                  options={products?.map((product) => product.id)}
                  getOptionLabel={(option: number) => {
                    return products.find((p) => p.id === option)?.title ?? "";
                  }}
                  filterSelectedOptions
                  value={field.value}
                  onChange={(_event, newValue) => {
                    form.setFieldValue(field.name, newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Products"
                      placeholder="Select products"
                    />
                  )}
                  disabled={!values.selectedCategory && !products.length}
                />
              </FormControl>
            )}
          </Field>
          <Box className="submit-wrapper">
            <Button
              type="submit"
              className="submit-btn"
              disabled={
                isSubmitting || !isValid || !dirty || !values.selectedCategory
              }
              variant="contained"
            >
              Run Report
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
