import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class ReadSellForId {
  async handle(request: Request, response: Response) {
    const sellId: any = request.query.id;

    prismaClient.sell_products
      .findMany({
        where: {
          sell_id: sellId,
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

export { ReadSellForId };
