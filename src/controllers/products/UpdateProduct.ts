import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class UpdateProduct {
  async handle(request: Request, response: Response) {
    const product_id = Number(request.query.id[0]);
    console.log(product_id);
    if (request.query.id && request.body) {
      prismaClient.products
        .update({
          where: { id: product_id },
          data: request.body,
        })
        .then(() => {
          return response.json({
            response: "Sucess",
          });
        })
        .catch((err) => response.status(400).json({ errorMessage: err }));
    } else {
      return response.status(400).json({
        errorMessage: "Missing id in query or data in body",
      });
    }
  }
}

export { UpdateProduct };
