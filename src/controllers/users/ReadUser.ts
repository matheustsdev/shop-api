import { Request, Response } from "express";
import { pool } from "../../services/pg";

class ReadUser {
  async handle(request: Request, response: Response) {
    pool.query(
      `SELECT * FROM users WHERE auth_token='${request.headers.authorization}'`,
      (err, res) => {
        return response.status(200).json(res.rows);
      }
    );

    pool.end;
  }
}

export { ReadUser };
