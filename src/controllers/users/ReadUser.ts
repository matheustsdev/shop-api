import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";
import { pool } from "../../services/pg";

class ReadUser {
  async handle(request: Request, response: Response) {
    try {
      prismaClient.auth_tokens
        .findUnique({
          where: {
            id: request.headers.authorization,
          },
          select: {
            user: true,
          },
        })
        .then((res) => {
          if (res === null) {
            return response
              .status(400)
              .json({ errorMessage: "User not found" });
          } else {
            return response.json(res.user);
          }
        })
        .catch((err) => {
          return response.status(400).json({ errorMessage: err });
        });
    } catch (err) {
      return response.status(400).json({ errorMessage: err });
    }
  }
}

export { ReadUser };
