import { Router } from "express";
import { getProducts } from "@products";

const router = Router();

router.get("/products", getProducts);

export default router;
