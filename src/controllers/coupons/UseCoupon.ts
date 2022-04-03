import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

interface CouponType {
  id: number;
  coupon: string;
  discount: number;
}

class UseCoupon {
  async handle(request: Request, response: Response) {
    const couponName: any = request.query.name;

    const coupon: CouponType | any = await prismaClient.coupon
      .findFirst({
        where: {
          coupon: couponName,
        },
      })
      .then((res: CouponType) => {
        prismaClient.coupon
          .delete({
            where: {
              id: res.id,
            },
          })
          .then(() => {
            return coupon;
          });

        return response.json(res);
      })
      .catch((err) => {
        return response.status(400).json({ errorMessage: err });
      });
  }
}

export { UseCoupon };
