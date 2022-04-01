import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class ReadSellForUser {
  async handle(request: Request, response: Response) {
    const userId: any = request.query.id;

    prismaClient.sells
      .findMany({
        where: {
          user_id: userId,
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

export { ReadSellForUser };
