import { type RouteConfig, route } from "@react-router/dev/routes"

export default [
  // Check if we're on admin subdomain and route accordingly
  route("/", "./pages/Home.tsx"),
  route("/products", "./pages/Products.tsx"),
  route("/products/:slug", "./pages/ProductDetail.tsx"),
  route("/category/:id", "./pages/Category.tsx"),
  route("/login", "./pages/Login.tsx"),
  route("/register", "./pages/Register.tsx"),

  // Admin panel routes
  route("/AdminLogin", "./pages/admin/Login.tsx"),
  route("/AdminUsers", "./pages/admin/Users.tsx"),
  route("/AdminCategories", "./pages/admin/Categories.tsx"),
  route("/AdminProducts", "./pages/admin/Products.tsx"),
  route("/AdminTags", "./pages/admin/Tags.tsx"),
  route("/AdminOrders", "./pages/admin/Orders.tsx"),
  route("/AdminSettings", "./pages/admin/Settings.tsx"),
] satisfies RouteConfig
