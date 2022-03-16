import { Request, Response } from "express";
import { pool } from "../../services/pg";

class DeleteProduct {
  async handle(request: Request, response: Response) {
    pool.query(
      `DELETE FROM products WHERE product_id = ${request.query.id}`,
      (err, res) => {
        if (err === undefined) {
          return response.send("Product removed!");
        } else {
          return response.send(err);
        }
      }
    );

    pool.end;
  }
}

export { DeleteProduct };
