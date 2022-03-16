import { NextFunction, Request, Response } from "express";
import { pool } from "../services/pg";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  //Authorization in header request verify
  if (authToken) {
    pool.query(
      `SELECT * FROM users WHERE auth_token='${authToken}'`,
      (err, res) => {
        if (err) {
          //Error in query

          return response.status(401).json({ errorCode: err });
        } else {
          if (res.rowCount < 1) {
            // None user found in query

            return response.status(401).json({ errorCode: "Missing user." });
          } else {
            //Sucess

            return next();
          }
        }
      }
    );
  } else {
    return response.status(401).json({ errorCode: "Missing auth token." });
  }
}
