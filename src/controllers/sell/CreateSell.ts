import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

interface SellType {
  user_id: string;
  total: number;
}

interface ProductSellType {
  product_id: number;
  amount: number;
}

interface SellDataType {
  sell: SellType;
  products: ProductSellType[];
}
class CreateSell {
  async handle(request: Request, response: Response) {
    const sellData: SellDataType = request.body;

    const sellRegister = await prismaClient.sells
      .create({
        data: sellData.sell,
      })
      .then((res) => {
        return res;
      });

    const transaction = await prismaClient
      .$transaction(
        sellData.products.map((product) => {
          return prismaClient.sell_products.create({
            data: {
              sell_id: sellRegister.id,
              ...product,
            },
          });
        })
      )
      .then((res) => {
        return response.json(sellRegister);
      })
      .catch((err) => {
        return response.status(400).json({ errorMessage: err });
      });
  }
}

export { CreateSell };
