import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";
import { pool } from "../../services/pg";
import { createUpdateUserParam } from "../../utils";

class UpdateUser {
  async handle(request: Request, response: Response) {
    const userId: any = request.query.id;

    console.log(userId);

    prismaClient.users
      .update({
        data: request.body,
        where: {
          id: userId,
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

export { UpdateUser };
