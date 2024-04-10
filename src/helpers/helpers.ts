import { IProduct } from "@/interfaces/product.interface";
import Highcharts from "highcharts";

/**
 * Converts a category string to human-readable format.
 * @param {string} category - The category string to convert.
 * @returns {string} The human-readable category string.
 */
export const categoryToHumanReadable = (category: string): string => {
  const words = category.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};

/**
 * Generates Highcharts options for a bar chart.
 * @param {IProduct[]} products - Array of products to display on the chart.
 * @param {string} category - The category of products.
 * @returns {Highcharts.Options} Highcharts options for the bar chart.
 */
export const generateBarChartOptions = (
  products: IProduct[],
  category: string
): Highcharts.Options => {
  const categoryName = categoryToHumanReadable(category);
  return {
    chart: {
      type: "column",
    },
    title: {
      text: "Products in selected Category",
      align: "left",
    },
    xAxis: {
      categories: products.map((product) => product.title),
      crosshair: true,
      accessibility: {
        description: "Products",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: categoryName,
      },
    },

    plotOptions: {
      column: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: "column",
        name: categoryToHumanReadable(category),
        data: products.map((product) => product.price),
      },
    ],
  };
};

/**
 * Generates Highcharts options for a pie chart representing stock quantity for a category.
 * @param {IProduct[]} products - Array of products to display on the chart.
 * @param {string} category - The category of products.
 * @returns {Highcharts.Options} Highcharts options for the pie chart.
 */
export const generatePieChartOptionsForCategory = (
  products: IProduct[],
  category: string
): Highcharts.Options => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: `Stock Quantity for ${categoryToHumanReadable(category)}`,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Stock Quantity",
        data: products.map((product) => ({
          name: product.title,
          y: product.stock,
        })),
      },
    ],
  };

  return options;
};

/**
 * Generates Highcharts options for a pie chart representing product counts for each category.
 * @param {IProduct[]} products - Array of products.
 * @param {string[]} categories - Array of category names.
 * @returns {Highcharts.Options} Highcharts options for the pie chart.
 */
export const generatePieChartForCategory = (
  products: IProduct[],
  categories: string[]
): Highcharts.Options => {
  const categoryCountMap: { [key: string]: number } = categories.reduce(
    (acc, category) => {
      acc[category as keyof { [key: string]: number }] = 0;
      return acc;
    },
    {} as { [key: string]: number }
  );

  products.forEach((product) => {
    const { category } = product;
    if (category && category in categoryCountMap) {
      categoryCountMap[category]++;
    }
  });

  const data = Object.entries(categoryCountMap).map(([name, y]) => ({
    name,
    y,
  }));

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: `Product count for categories`,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Product count",
        data,
      },
    ],
  };

  return options;
};
