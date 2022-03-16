import { RandomUUIDOptions } from "crypto";
import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../../services/pg";
import { convertCategoryId } from "../../utils";

interface SellType {
  product_fk: number;
  sell_date: string;
  sell_ref: string;
}

class CreateSell {
  async handle(request: Request, response: Response) {
    const newSell: SellType = request.body;

    pool.query(
      `INSERT INTO sell_register (user_fk, product_fk, sell_date, sell_ref) VALUES (
            (SELECT (user_id) FROM users WHERE auth_token = '${request.headers.authorization}'), ${newSell.product_fk}, '${newSell.sell_date}', '${newSell.sell_ref}')`,
      (err, res) => {
        if (err === undefined) {
          return response.send(res);
        } else {
          return response.send(err);
        }
      }
    );

    pool.end;
  }
}

export { CreateSell };
