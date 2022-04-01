import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class CreateCategory {
  async handle(request: Request, response: Response) {
    const newCategory: any = {
      category: request.query.name,
    };

    if (newCategory) {
      await prismaClient.categories
        .create({
          data: newCategory,
        })
        .then((res) => {
          return response.json(res);
        })
        .catch((err) => {
          return response.status(400).json({ errorMessage: err });
        });
    } else {
      return response.status(400).json({
        errorMessage: "Missing object of new category in request body",
      });
    }
  }
}

export { CreateCategory };
