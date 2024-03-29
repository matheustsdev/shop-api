import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class CreateProduct {
  async handle(request: Request, response: Response) {
    const newProduct = request.body;

    if (newProduct) {
      await prismaClient.products
        .create({
          data: newProduct,
        })
        .then((res) => {
          return response.json(res);
        })
        .catch((err) => {
          return response.status(400).json({ errorMessage: err });
        });
    } else {
      return response.status(400).json({
        errorMessage: "Missing object of new product in request body",
      });
    }
  }
}

export { CreateProduct };
