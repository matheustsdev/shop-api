import { Request, Response } from "express";
import { pool } from "../../services/pg";
import { convertCategoryId } from "../../utils";

interface AddProductType {
  title: string;
  price: number;
  image_url: string;
  description: string;
  category_id: number;
  stock: number;
}

class CreateProduct {
  async handle(request: Request, response: Response) {
    const newProduct: AddProductType = request.body;

    pool.query(
      `INSERT INTO products (title, price, image_url, description, category_id, stock) VALUES (
    '${newProduct.title}', 
    ${newProduct.price},
    '${newProduct.image_url}',
    '${newProduct.description}',
    ${convertCategoryId(newProduct.category_id)},
    ${newProduct.stock}
    )`,
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

export { CreateProduct };
