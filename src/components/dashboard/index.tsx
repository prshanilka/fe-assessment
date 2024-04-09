import React, { useState, useEffect } from "react";
import FilterForm from "./FilterForm";
import { fetchCategories, fetchAllProducts } from "@/services/api";
import { Backdrop, CircularProgress, Grid, Paper, styled } from "@mui/material";
import { IProduct } from "@/interfaces/product.interface";
import Chart from "./Chart";
import {
  generateBarChartOptions,
  generatePieChartForCategory,
  generatePieChartOptionsForCategory,
} from "@/helpers/helpers";

const Dashboard: React.FC = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState<
    IProduct[]
  >([]);
  const [selectedProductIDs, setSelectedProductIDs] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e) => {
        throw new Error(e);
      });
    fetchAllProducts()
      .then((product) => setAllProducts(product.products))
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  const processData = async (
    category: string,
    products: IProduct[],
    selectedProductIDs: number[]
  ) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategoryProducts(products);
      setSelectedCategory(category);
      setSelectedProductIDs(selectedProductIDs);
      setLoading(false);
    }, 3000);
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    height: "100%",
    [theme.breakpoints.up("md")]: {
      height: "80vh",
    },
  }));

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "#000000fc",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={3} sx={{ pt: 5 }}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <FilterForm
              categories={categories}
              onSubmit={processData}
              initValues={{
                selectedCategory,
                selectedCategoryProducts,
                selectedProductIDs,
              }}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            {selectedProductIDs.length > 0 &&
            selectedCategoryProducts.length > 0 &&
            selectedCategory ? (
              <Chart
                options={generateBarChartOptions(
                  selectedCategoryProducts.filter((product) =>
                    selectedProductIDs.includes(product.id)
                  ),
                  selectedCategory
                )}
              />
            ) : selectedCategory ? (
              <Chart
                options={generatePieChartOptionsForCategory(
                  selectedCategoryProducts,
                  selectedCategory
                )}
              />
            ) : (
              <Chart
                options={generatePieChartForCategory(allProducts, categories)}
              />
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
