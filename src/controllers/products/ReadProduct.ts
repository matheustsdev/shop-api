import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class ReadProduct {
  async handle(request: Request, response: Response) {
    await prismaClient.products
      .findMany()
      .then((res) => {
        return response.json(res);
      })
      .catch((err) => {
        return response.status(400).json({ errorMessage: err });
      });
  }
}

export { ReadProduct };
