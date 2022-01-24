import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { IProduct } from "@types";
import createError from "http-errors";
import enhanceWithCurrency from "./enhanceWithCurrency";
import enhanceWithRating from "./enhanceWithRating";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!(req.query && req.query.toCurrency)) {
    return next(createError(400, "Missing currency param"));
  }

  const toCurrency = (req.query as any).toCurrency;

  const productsApiUrl =
    "https://bojwbhw97e.execute-api.us-east-2.amazonaws.com/Production/eshop-challenge/products";

  try {
    const response = await axios(productsApiUrl);

    if (!(response.data.body && Array.isArray(response.data.body))) {
      next(createError(500, "Incorrect API response"));
    }

    const products = response.data.body;

    // Enhance  with rating property
    const enhancedWithRating: IProduct[] = await Promise.all(
      products.map(async (product: IProduct): Promise<IProduct> => {
        return await enhanceWithRating(product);
      })
    );

    // Enhance with currency property
    const enhancedWithCurrency: IProduct[] = await Promise.all(
      enhancedWithRating.map(async (product: IProduct): Promise<IProduct> => {
        return await enhanceWithCurrency(product, toCurrency);
      })
    );

    res.status(200).send(enhancedWithCurrency);
  } catch (err) {
    next(err);
  }
};

export { getProducts };
