import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FirebaseAuthProvider } from "@/context/FirebaseAuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import FirebaseProtectedRoute from "@/components/auth/FirebaseProtectedRoute";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import FirebaseProfilePage from "./pages/FirebaseProfilePage";
import FirebaseLoginPage from "./components/auth/FirebaseLoginPage";
import FirebaseSignupPage from "./components/auth/FirebaseSignupPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import ReturnsPage from "./pages/ReturnsPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import ContactPage from "./pages/ContactPage";
import PrivacyTermsPage from "./pages/PrivacyTermsPage";
import WishlistPage from "./pages/WishlistPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import NotificationPreferencesPage from "./pages/profile/NotificationPreferencesPage";
import PrivacySecurityPage from "./pages/profile/PrivacySecurityPage";
import OrderHistoryPage from "./pages/profile/OrderHistoryPage";
import ShippingAddressesPage from "./pages/profile/ShippingAddressesPage";
import PaymentMethodsPage from "./pages/profile/PaymentMethodsPage";
import GiftCardsPage from "./pages/profile/GiftCardsPage";
import WelcomeRewardsPage from "./pages/profile/WelcomeRewardsPage";
import SupportPage from "./pages/profile/SupportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirebaseAuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping" element={<ShippingInfoPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/size-guide" element={<SizeGuidePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-terms" element={<PrivacyTermsPage />} />
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
              <Route 
                path="/profile/edit" 
                element={
                  <FirebaseProtectedRoute>
                    <EditProfilePage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/notifications" 
                element={
                  <FirebaseProtectedRoute>
                    <NotificationPreferencesPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/privacy" 
                element={
                  <FirebaseProtectedRoute>
                    <PrivacySecurityPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/orders" 
                element={
                  <FirebaseProtectedRoute>
                    <OrderHistoryPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/addresses" 
                element={
                  <FirebaseProtectedRoute>
                    <ShippingAddressesPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/payment" 
                element={
                  <FirebaseProtectedRoute>
                    <PaymentMethodsPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/gift-cards" 
                element={
                  <FirebaseProtectedRoute>
                    <GiftCardsPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/rewards" 
                element={
                  <FirebaseProtectedRoute>
                    <WelcomeRewardsPage />
                  </FirebaseProtectedRoute>
                } 
              />
              <Route 
                path="/profile/support" 
                element={
                  <FirebaseProtectedRoute>
                    <SupportPage />
                  </FirebaseProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </CartProvider>
  </FirebaseAuthProvider>
</QueryClientProvider>
);

export default App;
