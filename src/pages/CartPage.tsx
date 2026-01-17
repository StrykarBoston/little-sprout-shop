import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Tag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatINR } from '@/utils/currency';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 4000 ? 0 : 499;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Let's change that!
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Shopping Cart ({items.length} items)
          </h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-card shadow-soft"
              >
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="font-heading font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>

                  {item.product.brand && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.product.brand}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary">
                      {formatINR(item.product.price)}
                    </span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatINR(item.product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="text-lg font-bold text-foreground">
                    {formatINR(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card shadow-soft p-6 space-y-6">
              <h2 className="font-heading font-bold text-lg text-foreground">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button variant="secondary">Apply</Button>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium">{formatINR(tax)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground bg-mint-light p-3 rounded-lg">
                    Add {formatINR(4000 - subtotal)} more for free shipping!
                  </p>
                )}

                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="font-heading font-bold text-foreground">
                      Total
                    </span>
                    <span className="font-bold text-xl text-primary">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
