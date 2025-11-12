import { type RouteConfig, route } from "@react-router/dev/routes"

export default [
  // Check if we're on admin subdomain and route accordingly
  route("/", "./pages/Home.tsx"),
  route("/products", "./pages/Products.tsx"),
  route("/products/:slug", "./pages/ProductDetail.tsx"),
  route("/logowanie", "./pages/Login.tsx"),
  route("/rejestracja", "./pages/Register.tsx"),
  
  // Admin panel routes
  route("/users", "./pages/admin/Users.tsx"),
  route("/orders", "./pages/admin/Orders.tsx"),
  route("/settings", "./pages/admin/Settings.tsx"),
] satisfies RouteConfig
