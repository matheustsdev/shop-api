import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class DeleteProduct {
  async handle(request: Request, response: Response) {
    if (request.query.id) {
      prismaClient.products
        .delete({
          where: { id: Number(request.query.id) },
        })
        .then((res) => {
          return response.status(200).json({ response: res });
        })
        .catch((err) => {
          return response.status(400).json({ errorMessage: err });
        });
    } else {
      return response.status(400).json({ errorMessage: "Missing id in query" });
    }
  }
}

export { DeleteProduct };
