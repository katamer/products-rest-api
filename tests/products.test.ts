import chai from "chai";
import supertest from "supertest";
import { SuperTest, Test } from "supertest";
import app from "@server";
import { beforeEach, Done } from "mocha";
import { IProduct } from "@types";

const expect = chai.expect;

describe("Products Routes", function () {
  let agent: SuperTest<Test>;

  beforeEach((done: Done) => {
    agent = supertest.agent(app);
    done();
  });

  const getProductsPath = "/products";

  describe("GET /products", function () {
    describe("GET /products?toCurrency=nok - happy path", function () {
      it("should return 200 OK with JSON response", async function () {
        const response = await agent.get(`${getProductsPath}?toCurrency=nok`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
      });

      it("response should contain array of products with correct properties", async function () {
        const response = await agent.get(`${getProductsPath}?toCurrency=nok`);
        response.body.map((product: IProduct) => {
          expect(product).to.include.all.keys("rating", "currency");
        });
      });
    });
  });

  describe("GET /products - negative path", function () {
    it("should return error with correct error message and error status", async function () {
      const response = await agent.get(`${getProductsPath}`);
      const error = JSON.parse(response.text);
      expect(response.status).to.equal(400);
      expect(error.error).to.equal("Missing currency param");
    });
  });
});
