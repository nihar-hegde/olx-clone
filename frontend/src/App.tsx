import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Navbar } from "./components/shared/Navbar";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./Providers/AuthProvider";
import { ProtectedRoute } from "./components/auth/protectedRoutes";
import Layout from "./components/Layout";
import AddProduct from "./pages/AddProduct";
import PurchasedProducts from "./pages/PurchasedProducts";
import PostedProducts from "./pages/PostedProducts";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/add-product"
                element={<AddProduct mode="create" />}
              />
              <Route
                path="/edit-product/:id"
                element={<AddProduct mode="edit" />}
              />
              <Route
                path="/purchased-products"
                element={<PurchasedProducts />}
              />
              <Route path="/posted-products" element={<PostedProducts />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
