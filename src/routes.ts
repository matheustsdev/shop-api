import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { UpdateProduct } from "./controllers/products/UpdateProduct";
import { CreateProduct } from "./controllers/products/CreateProduct";
import { DeleteProduct } from "./controllers/products/DeleteProduct";
import { ReadProduct } from "./controllers/products/ReadProduct";
import { CreateUser } from "./controllers/users/CreateUser";
import { ReadUser } from "./controllers/users/ReadUser";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { UpdateUser } from "./controllers/users/UpdateUser";
import { DeleteUser } from "./controllers/users/DeleteUser";
import { AuthenticateUser } from "./controllers/users/AuthenticateUser";
import { CreateSell } from "./controllers/sell/CreateSell";
import { ReadSell } from "./controllers/sell/ReadSell";

dotenv.config();

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.json(request.query);
});

// CRUD Products

router.post("/add/product", new CreateProduct().handle);

router.delete("/remove/product", new DeleteProduct().handle);

router.put("/update/product", new UpdateProduct().handle);

router.get("/products", new ReadProduct().handle);

// CRUD Users

router.post("/add/user", new CreateUser().handle);

router.get("/user", ensureAuthenticated, new ReadUser().handle);

router.put("/update/user", ensureAuthenticated, new UpdateUser().handle);

router.delete("/remove/user", ensureAuthenticated, new DeleteUser().handle);

// Authenticate

router.get("/auth", new AuthenticateUser().handle);

// CRUD Sell Register

router.post("/add/sell", ensureAuthenticated, new CreateSell().handle);

router.get("/sell", ensureAuthenticated, new ReadSell().handle);

export { router };
