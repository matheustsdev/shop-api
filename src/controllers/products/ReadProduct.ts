import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class ReadProduct {
  async handle(request: Request, response: Response) {
    await prismaClient.products
      .findMany({
        select: {
          id: true,
          description: true,
          img_url: true,
          price: true,
          stock: true,
          title: true,
          category: true,
          category_id: false,
        },
      })
      .then((res) => {
        return response.json(res);
      })
      .catch((err) => {
        return response.status(400).json({ errorMessage: err });
      });
  }
}

export { ReadProduct };
