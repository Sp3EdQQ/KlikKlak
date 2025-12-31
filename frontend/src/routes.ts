import { type RouteConfig, route } from "@react-router/dev/routes"

export default [
  // Main routes with lazy loading
  route("/", "./pages/Home.tsx"),
  route("/products/:slug", "./pages/ProductDetail.tsx"),
  route("/category/:id", "./pages/Category.tsx"),
  route("/search", "./pages/Search.tsx"),
  route("/wishlist", "./pages/Wishlist.tsx"),
  route("/login", "./pages/Login.tsx"),
  route("/logowanie", "./pages/Login.tsx", { id: "pages/Login-pl" }),
  route("/rejestracja", "./pages/Register.tsx"),
  route("/cart", "./pages/Cart.tsx"),

  // Admin panel routes - lazy loaded
  route("/AdminLogin", "./pages/admin/Login.tsx"),
  route("/AdminUsers", "./pages/admin/Users.tsx"),
  route("/AdminCategories", "./pages/admin/Categories.tsx"),
  route("/AdminProducts", "./pages/admin/Products.tsx"),
  route("/AdminTags", "./pages/admin/Tags.tsx"),
  route("/AdminOrders", "./pages/admin/Orders.tsx"),
  route("/AdminSettings", "./pages/admin/Settings.tsx")
] satisfies RouteConfig
