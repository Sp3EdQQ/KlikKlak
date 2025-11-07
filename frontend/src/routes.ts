import { type RouteConfig, route } from "@react-router/dev/routes"

export default [
  route("/", "./pages/Home.tsx"),
  route("/products", "./pages/Products.tsx"),
  route("/products/:slug", "./pages/ProductDetail.tsx"),
  route("/logowanie", "./pages/Login.tsx"),
  route("/rejestracja", "./pages/Register.tsx"),
] satisfies RouteConfig
