import axios from "axios";
import cheerio from "cheerio";

interface Product {
  name: string;
  price: string;
}

export const scrapeData = async (url: string): Promise<Product[]> => {
  try {
    console.log(`Scraping ${url}...`);
    const response = await axios.get(url);
    const { data: html } = response;
    const $ = cheerio.load(html);

    console.log("Scraping product data...");

    const classes = {
      product: ".c-product__item",
      info: ".c-product__infos",
    };

    const productContainer = $(classes.product);
    console.log(`Found ${productContainer.length} products`);

    const productName = productContainer.find(classes.info).find("h2");
    console.log(`Retrieving names for ${productName.length} products...`);

    const productPrice = productContainer.find(classes.info).find("p");
    console.log(`Retrieving prices for ${productPrice.length} products...`);

    const products: Product[] = [];

    productName.each((index, element) => {
      const name = $(element).text();
      const price = $(productPrice[index]).text();
      products.push({ name, price });
    });

    console.log("Scraped products:", products);
    return products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error scraping ${url}:`,
        error.message,
        error.response?.status,
      );
    } else {
      console.error(`Unexpected error scraping ${url}:`, error);
    }
    throw error;
  }
};
