import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FirebaseAuthProvider } from "@/context/FirebaseAuthContext";
import FirebaseProtectedRoute from "@/components/auth/FirebaseProtectedRoute";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import FirebaseProfilePage from "./pages/FirebaseProfilePage";
import FirebaseLoginPage from "./components/auth/FirebaseLoginPage";
import FirebaseSignupPage from "./components/auth/FirebaseSignupPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirebaseAuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<FirebaseLoginPage />} />
              <Route path="/signup" element={<FirebaseSignupPage />} />
              <Route 
                path="/profile" 
                element={
                  <FirebaseProtectedRoute>
                    <FirebaseProfilePage />
                  </FirebaseProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </FirebaseAuthProvider>
  </QueryClientProvider>
);

export default App;
