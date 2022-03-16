import { Request, Response } from "express";
import { pool } from "../../services/pg";
import { createUpdateProductParam } from "../../utils";

class UpdateProduct {
  async handle(request: Request, response: Response) {
    const setParam = createUpdateProductParam(request.body);

    pool.query(
      `UPDATE products SET ${setParam} WHERE product_id = ${request.query.id}`,
      (err, res) => {
        return response.send("Updated");
      }
    );
    pool.end;
  }
}

export { UpdateProduct };
