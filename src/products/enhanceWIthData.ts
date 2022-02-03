import { Product, enhancingData } from "@types";
import createError from "http-errors";
import axios from "axios";

const enhanceWithData = async (
  initialData: Product,
  enhancingData: enhancingData
): Promise<Product> => {
  const response = await axios.get(enhancingData.path, {
    baseURL: enhancingData.baseURL,
  });

  if (response.data.statusCode !== 200) {
    throw createError(500, `Incorrect ${enhancingData.type} API response`);
  }

  const key = enhancingData.type;

  return { ...initialData, ...response.data.body[key] };
};

export default enhanceWithData;
