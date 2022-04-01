import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma/prisma";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  //Authorization in header request verify
  if (authToken) {
    await prismaClient.auth_tokens
      .findUnique({
        where: {
          id: request.headers.authorization,
        },
      })
      .then((res) => {
        return next();
      })
      .catch((err) => {
        return response.status(401).json({ errorMessage: err });
      });
  } else {
    return response.status(401).json({ errorMessage: "Missing auth token." });
  }
}
