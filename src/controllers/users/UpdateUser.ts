import { Request, Response } from "express";
import { pool } from "../../services/pg";
import { createUpdateUserParam } from "../../utils";

class UpdateUser {
  async handle(request: Request, response: Response) {
    const setParam = createUpdateUserParam(request.body);

    pool.query(
      `UPDATE users SET ${setParam} WHERE auth_token = '${request.headers.authorization}'`,
      (err, res) => {
        if (err) {
          return response.status(500).json({ errorCode: err });
        }
        return response.json({ response: "Updated" });
      }
    );
    pool.end;
  }
}

export { UpdateUser };
