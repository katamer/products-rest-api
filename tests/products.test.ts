import chai from "chai";
import supertest from "supertest";
import { SuperTest, Test, Response } from "supertest";
import app from "@server";
import { beforeEach, Done } from "mocha";
import { Product } from "@types";
import { servicesUrls } from "@constants";
import nock from "nock";
import { productsFixture, currencyFixture, ratingFixture } from "./fixtures";

const expect = chai.expect;

describe("Products Routes", function () {
  let agent: SuperTest<Test>;

  beforeEach((done: Done) => {
    agent = supertest.agent(app);
    done();
  });

  const getProductsPath = "/products";

  describe("GET /products", () => {
    describe("GET /products POSITIVE PATH", () => {
      nock(servicesUrls.PRODUCTS_API_URL)
        .persist()
        .get("/Production/eshop-challenge/products")
        .reply(200, productsFixture);

      nock(servicesUrls.CURRENCY_API_URL)
        .persist()
        .get("/Production/product-challenge-price")
        .query({ toCurrency: "nok", price: 653 })
        .reply(200, currencyFixture);

      nock(servicesUrls.RATING_API_URL)
        .persist()
        .get("/Production/product-rating")
        .query({ productId: 668620 })
        .reply(200, ratingFixture);

      it("should return 200 OK with successful items", async () => {
        await agent
          .get(`${getProductsPath}`)
          .query({ toCurrency: "nok" })
          .expect(200)
          .then((res: Response) => {
            expect(res.body).to.be.an("array");
          });
      });

      it("response should contain array of products with correct properties", async () => {
        await agent
          .get(`${getProductsPath}`)
          .query({ toCurrency: "nok" })
          .expect(200)
          .then((res: Response) =>
            res.body.map((product: Product) => {
              expect(product).to.include.all.keys(
                "rating",
                "currency",
                "price"
              );
            })
          );
      });
    });
  });

  describe("GET /products - NEGATIVE PATH", function () {
    nock("https://bojwbhw97e.execute-api.us-east-2.amazonaws.com")
      .get("/Production/eshop-challenge/products")
      .query(true)
      .reply(200, productsFixture);

    it("should return error with correct error message and 400 status", async function () {
      const response = await agent.get(`${getProductsPath}`);
      const error = JSON.parse(response.text);
      expect(response.status).to.equal(400);
      expect(error.error).to.equal("Missing currency param");
    });
  });
});
