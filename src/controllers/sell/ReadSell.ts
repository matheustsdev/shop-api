import { Request, Response } from "express";
import { pool } from "../../services/pg";

class ReadSell {
  async handle(request: Request, response: Response) {
    pool.query(
      `SELECT * FROM sell_register INNER JOIN products ON sell_register.product_fk = products.product_id WHERE sell_ref='${request.query.sell_ref}'`,
      (err, res) => {
        return response.status(200).json(res.rows);
      }
    );

    pool.end;
  }
}

export { ReadSell };
