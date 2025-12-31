// import { Router, Route, RootRoute } from "@tanstack/react-router";
// import App from "../App";
// import Home from "../pages/home";
// import Products from "../pages/products";
// import Cart from "../pages/cart";
// import Checkout from "../pages/checkout";
// import Login from "../pages/login";
// import Orders from "../pages/orders";

// const rootRoute = new RootRoute({
//   component: App,
// });

// const homeRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: Home,
// });

// const productsRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/products",
//   component: Products,
// });

// const cartRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/cart",
//   component: Cart,
// });

// const checkoutRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/checkout",
//   component: Checkout,
// });

// const loginRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/login",
//   component: Login,
// });

// const ordersRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/orders",
//   component: Orders,
// });

// const routeTree = rootRoute.addChildren([
//   homeRoute,
//   productsRoute,
//   cartRoute,
//   checkoutRoute,
//   loginRoute,
//   ordersRoute,
// ]);

// export const router = new Router({ routeTree });

// declare module "@tanstack/react-router" {
//   interface Register {
//     router: router;
//   }
// }
import {
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";

import App from "../App";
import Home from "../pages/home";
import Products from "../pages/products";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Login from "../pages/login";
import Register from "../pages/register";
import Orders from "../pages/orders";
import AdminPanel from "../pages/admin";
// import Orders from "../pages/orders";
import RoleRoute from "../components/RoleRoute";



// Root layout
const rootRoute = new RootRoute({
  component: App,
});

// Routes
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
});

const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});

const checkoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <RoleRoute role="owner">
      <AdminPanel />
    </RoleRoute>
  ),
});

// CUSTOMER
const ordersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <RoleRoute role="customer">
      <Orders />
    </RoleRoute>
  ),
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  cartRoute,
  checkoutRoute,
  loginRoute,
  registerRoute,
  ordersRoute,
  adminRoute,
]);

// Router
export const router = new Router({
  routeTree,
});
