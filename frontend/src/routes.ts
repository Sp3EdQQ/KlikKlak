import { type RouteConfig, route } from "@react-router/dev/routes"

export default [
  route("/", "./pages/Home.tsx"),
  route("/products", "./pages/Products.tsx"),
] satisfies RouteConfig
