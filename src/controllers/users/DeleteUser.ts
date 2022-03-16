import { Request, Response } from "express";
import { pool } from "../../services/pg";

class DeleteUser {
  async handle(request: Request, response: Response) {
    pool.query(
      `DELETE FROM users WHERE auth_token = '${request.headers.authorization}'`,
      (err, res) => {
        if (err === undefined) {
          return response.json({ response: "User deleted." });
        } else {
          return response.status(500).json({ erroCode: err });
        }
      }
    );

    pool.end;
  }
}

export { DeleteUser };
