import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import { formatINR } from '@/utils/currency';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    // Navigate to cart page after adding item
    navigate('/cart');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const badgeStyles = {
    new: 'bg-primary text-primary-foreground',
    sale: 'bg-destructive text-destructive-foreground',
    bestseller: 'bg-peach text-secondary-foreground',
    organic: 'bg-mint text-primary-foreground',
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group block card-baby p-0 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl sm:rounded-t-2xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={cn(
              "absolute top-2 sm:top-3 left-2 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold uppercase tracking-wide",
              badgeStyles[product.badge]
            )}
          >
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && !product.badge && (
          <span className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold bg-destructive text-destructive-foreground">
            -{discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className={cn(
            "absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-background transition-all opacity-0 group-hover:opacity-100 touch-manipulation",
            isInWishlist(product.id) && "text-destructive"
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("h-3 w-3 sm:h-4 sm:w-4", isInWishlist(product.id) && "fill-current")} />
        </button>

        {/* Quick Add Button */}
        <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            variant="default"
            size="sm"
            className="w-full gap-1.5 sm:gap-2 text-xs sm:text-sm"
          >
            <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        {product.ageRange && (
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {product.ageRange}
          </span>
        )}

        {/* Title */}
        <h3 className="font-heading font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors text-sm sm:text-base">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3 sm:h-3.5 sm:w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
          <span className="text-base sm:text-lg font-bold text-primary">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <span className="inline-block mt-2 text-xs text-destructive font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
