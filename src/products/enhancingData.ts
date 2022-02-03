import { enhancingData } from "@types";
import { servicesUrls } from "@constants";

export const ratingData = (id: number): enhancingData => ({
  type: "rating",
  baseURL: servicesUrls["RATING_API_URL"],
  path: `/Production/product-rating?productId=${id}`,
});

export const currencyData = (
  price: number,
  toCurrency: string
): enhancingData => ({
  type: "currency",
  baseURL: servicesUrls["CURRENCY_API_URL"],
  path: `/Production/product-challenge-price?price=${price}&toCurrency=${toCurrency}`,
});
