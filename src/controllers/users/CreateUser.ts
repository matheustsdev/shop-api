import { randomUUID } from "crypto";
import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";
import { encryptString } from "../../utils";

interface UserType {
  nickname?: string;
  fullname: string;
  email: string;
  password: string;
}

class CreateUser {
  async handle(request: Request, response: Response) {
    const requestBody: UserType = request.body;

    const encryptedPassword = await encryptString(
      requestBody.password,
      requestBody.fullname
    );

    const userUuid = randomUUID();
    const tokenUuid = randomUUID();

    const newUser = {
      id: userUuid,
      fullname: requestBody.fullname,
      email: requestBody.email,
      password: encryptedPassword,
    };

    const newToken: any = {
      id: tokenUuid,
      user_id: userUuid,
    };

    if (requestBody) {
      prismaClient.users
        .create({
          data: newUser,
        })
        .then((res) => {
          prismaClient.auth_tokens
            .create({
              data: newToken,
            })
            .then(() => {
              return response.json(res);
            });
        })
        .catch((err) => {
          return response.status(400).json({
            errorMessage: err,
          });
        });
    } else {
      return response.status(400).json({
        errorMessage: "Missing object of new user in request body",
      });
    }
  }
}

export { CreateUser };
