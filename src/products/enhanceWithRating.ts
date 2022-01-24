import { IProduct } from "@types";
import createError from "http-errors";
import axios from "axios";

const enhanceWithRating = async (product: IProduct): Promise<IProduct> => {
  const proudctRatingsPath = `/Production/product-rating?productId=${product.productId}`;
  const response = await axios.get(proudctRatingsPath, {
    baseURL: "https://ot03ty7nhg.execute-api.us-east-2.amazonaws.com",
  });

  if (response.data.statusCode !== 200) {
    throw createError(500, "Incorrect Rating API response");
  }

  const rating = response.data.rating;
  return { ...product, rating };
};

export default enhanceWithRating;
