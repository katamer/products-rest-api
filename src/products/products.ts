import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Product, RequestQuery } from "@types";
import createError from "http-errors";
import enhanceWithData from "./enhanceWithData";
import { currencyData, ratingData } from "./enhancingData";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.toCurrency) {
    return next(createError(400, "Missing currency param"));
  }

  const toCurrency = (req.query as RequestQuery).toCurrency as string;

  const productsApiUrl =
    "https://bojwbhw97e.execute-api.us-east-2.amazonaws.com/Production/eshop-challenge/products";

  try {
    const response = await axios(productsApiUrl);

    if (!(response.data.body && Array.isArray(response.data.body))) {
      next(createError(500, "Incorrect API response"));
    }

    const products = response.data.body;

    // Enhance  with rating property
    const enhancedWithRating: Product[] = await Promise.all(
      products.map(async (product: Product): Promise<Product> => {
        return await enhanceWithData(product, ratingData(product.productId));
      })
    );

    // Enhance with currency property
    const enhancedWithCurrency: Product[] = await Promise.all(
      enhancedWithRating.map(async (product: Product): Promise<Product> => {
        return await enhanceWithData(
          product,
          currencyData(product.price, toCurrency)
        );
      })
    );

    res.status(200).send(enhancedWithCurrency);
  } catch (err) {
    next(err);
  }
};

export { getProducts };
