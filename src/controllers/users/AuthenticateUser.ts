import { Request, Response } from "express";
import { pool } from "../../services/pg";
import * as bcrypt from "bcrypt";

interface UserType {
  nickname: string;
  fullname: string;
  email: string;
  password: string;
  auth_token: string;
}

class AuthenticateUser {
  async handle(request: Request, response: Response) {
    pool.query<UserType>(
      `SELECT * FROM users WHERE email='${request.query.email}'`,
      (err, res) => {
        const isMatch = bcrypt
          .compare(request.headers.authorization, res.rows[0].password)
          .then((comparation) => {
            if (comparation) {
              return response.json({ token: res.rows });
            } else {
              return response.status(401).json({ errorCode: "Wrong password" });
            }
          });
      }
    );
    pool.end;
  }
}

export { AuthenticateUser };
