import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class ReadCollection {
  async handle(request: Request, response: Response) {
    await prismaClient.collection
      .findFirst({
        select: {
          id: true,
          collection_products: {
            select: {
              product: true,
            },
          },
          name: true,
          banner_img: true,
          body: true,
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

export { ReadCollection };
