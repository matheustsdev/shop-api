import { prisma } from "@prisma/client";
import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class DeleteUser {
  async handle(request: Request, response: Response) {
    const userId: any = request.query.id;

    try {
      await prismaClient.users
        .delete({
          where: {
            id: userId,
          },
        })
        .then(() => {
          prismaClient.auth_tokens;

          response.json({ response: "User deleted" });
        })
        .catch((err) => {
          return response.status(400).json({ errorMessage: err });
        });
    } catch (err) {
      return response.status(400).json({ errorMessage: err });
    }
  }
}

export { DeleteUser };
