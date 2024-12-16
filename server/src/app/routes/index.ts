import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ShopRoutes } from "../modules/Shop/shop.route";
import { CuponRoutes } from "../modules/Cupon/cupon.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { CartRoutes } from "../modules/Cart/cart.route";
import { CartItemRoutes } from "../modules/CartItem/cartItem.route";
import { FollowRoutes } from "../modules/Follow/follow.route";
import { ReviewRoutes } from "../modules/Review/review.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/cupon",
    route: CuponRoutes,
  },
  {
    path: "/shop",
    route: ShopRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/cart-item",
    route: CartItemRoutes,
  },
  {
    path: "/follow",
    route: FollowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
