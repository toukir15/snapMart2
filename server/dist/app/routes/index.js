"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const shop_route_1 = require("../modules/Shop/shop.route");
const cupon_route_1 = require("../modules/Cupon/cupon.route");
const product_route_1 = require("../modules/Product/product.route");
const category_route_1 = require("../modules/Category/category.route");
const cart_route_1 = require("../modules/Cart/cart.route");
const cartItem_route_1 = require("../modules/CartItem/cartItem.route");
const follow_route_1 = require("../modules/Follow/follow.route");
const review_routes_1 = require("../modules/Review/review.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/cupon",
        route: cupon_route_1.CuponRoutes,
    },
    {
        path: "/shop",
        route: shop_route_1.ShopRoutes,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/category",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/cart",
        route: cart_route_1.CartRoutes,
    },
    {
        path: "/review",
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: "/cart-item",
        route: cartItem_route_1.CartItemRoutes,
    },
    {
        path: "/follow",
        route: follow_route_1.FollowRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
