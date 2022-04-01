import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prismaClient from "../../prisma/prisma";

class AuthenticateUser {
  async handle(request: Request, response: Response) {
    const email: any = request.query.email;

    const user = await prismaClient.users
      .findUnique({
        where: {
          email,
        },
      })
      .then((res) => {
        return res;
      });

    const isMatch = await bcrypt
      .compare(request.headers.authorization, user.password)
      .then((comparation) => {
        return comparation;
      });

    if (isMatch) {
      prismaClient.auth_tokens
        .findFirst({
          where: {
            user_id: user.id,
          },
        })
        .then((res) => {
          return response.json({
            ...user,
            auth_token: res.id,
          });
        });
    } else {
      return response.status(401).json({ errorMessage: "Wrong password" });
    }
  }
}

export { AuthenticateUser };
