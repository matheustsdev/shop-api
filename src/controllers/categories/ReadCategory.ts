import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class ReadCategory {
  async handle(request: Request, response: Response) {
    await prismaClient.categories
      .findMany()
      .then((res) => {
        return response.json(res);
      })
      .catch((err) => {
        return response.status(400).json({ errorMessage: err });
      });
  }
}

export { ReadCategory };
