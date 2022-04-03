import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

class CreateCoupon {
  async handle(request: Request, response: Response) {
    const newCoupon = request.body;

    if (newCoupon) {
      await prismaClient.coupon
        .create({
          data: newCoupon,
        })
        .then((res) => {
          return response.json(res);
        })
        .catch((err) => {
          return response.status(400).json({ errorMessage: err });
        });
    } else {
      return response.status(400).json({
        errorMessage: "Missing object of new coupon in request body",
      });
    }
  }
}

export { CreateCoupon };
