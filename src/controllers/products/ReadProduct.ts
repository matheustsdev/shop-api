import { Request, Response } from "express";
import { pool } from "../../services/pg";
import { convertCategoryId } from "../../utils";

class ReadProduct {
  async handle(request: Request, response: Response) {
    // To fetch all products
    if (!request.query.category) {
      pool.query(`SELECT * FROM products`, (err, res) => {
        return response.json(res.rows);
      });
      pool.end;

      // To fetch for category
    } else {
      const category_id: number = convertCategoryId(request.query.category);
      pool.query(
        `SELECT * FROM products WHERE category_id = ${category_id}`,
        (err, res) => {
          return response.json(res.rows);
        }
      );
      pool.end;
    }
  }
}

export { ReadProduct };
