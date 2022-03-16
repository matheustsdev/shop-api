import { Request, Response } from "express";
import { pool } from "../../services/pg";
import { encryptString } from "../../utils";

interface UserType {
  nickname: string;
  fullname: string;
  email: string;
  password: string;
}

class CreateUser {
  async handle(request: Request, response: Response) {
    const newUser: UserType = request.body;
    const encryptedPassword = await encryptString(
      newUser.password,
      newUser.fullname
    );

    const auth_token = await encryptString(newUser.password, newUser.password);

    pool.query(
      `INSERT INTO users (nickname, fullname, email, password, auth_token) VALUES (
    '${newUser.nickname}', 
    '${newUser.fullname}',
    '${newUser.email}',
    '${encryptedPassword}',
    '${auth_token}')`,
      (err, res) => {
        if (err === undefined) {
          return response.json(res);
        } else {
          return response.send(err);
        }
      }
    );

    pool.end;
  }
}

export { CreateUser };
