import { IProduct } from "@types";
import createError from "http-errors";
import axios from "axios";

const enhanceWithCurrency = async (
  product: IProduct,
  toCurrency: string
): Promise<IProduct> => {
  const productCurrencyPath = `/Production/product-challenge-price?price=${product.price}&toCurrency=${toCurrency}`;

  const response = await axios.get(productCurrencyPath, {
    baseURL: "https://owlnnjqrs0.execute-api.us-east-2.amazonaws.com",
  });

  if (response.data.statusCode !== 200) {
    throw createError(500, "Incorrect Currency API response");
  }

  const currency = response.data.currency;
  return { ...product, currency };
};

export default enhanceWithCurrency;
