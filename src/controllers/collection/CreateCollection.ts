import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

interface CollectionType {
  name: string;
  banner_img: string;
  body: string;
  products: number[];
}

class CreateCollection {
  async handle(request: Request, response: Response) {
    const data: CollectionType = request.body;

    const collectionlRegister = await prismaClient.collection
      .create({
        data: {
          name: data.name,
          banner_img: data.banner_img,
          body: data.body,
        },
      })
      .then((res) => {
        return res;
      });

    const transaction = await prismaClient
      .$transaction(
        data.products.map((id) => {
          return prismaClient.collection_products.create({
            data: {
              collection_id: collectionlRegister.id,
              product_id: id,
            },
          });
        })
      )
      .then((res) => {
        return response.json(collectionlRegister);
      })
      .catch((err) => {
        return response.status(400).json({ errorMessage: err });
      });
  }
}

export { CreateCollection };
