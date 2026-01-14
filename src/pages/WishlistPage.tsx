import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/context/WishlistContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Product } from '@/types';


const WishlistPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item: Product) => {
    addToCart(item);
  };

  const handleAddSelectedToCart = () => {
    const selectedWishlistItems = wishlistItems.filter(item => 
      selectedItems.includes(item.id)
    );
    selectedWishlistItems.forEach(item => {
      addToCart(item);
    });
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            Save your favorite items for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding items you love to your wishlist
              </p>
              <Button asChild>
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === wishlistItems.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                  <span className="text-sm">
                    Select All ({wishlistItems.length} items)
                  </span>
                </label>
              </div>
              
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleAddSelectedToCart}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add Selected to Cart ({selectedItems.length})
                  </Button>
                </div>
              )}
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    {/* Checkbox */}
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, item.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          }
                        }}
                        className="rounded border-2 border-primary"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="relative mb-4">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </Link>
                      {!item.inStock && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {item.category} • {item.size && `Size: ${item.size}`} • {item.color && `Color: ${item.color}`}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">${item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                          className="flex-1"
                        >
                          <ShoppingBag className="mr-1 h-3 w-3" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveItem(item.id)}
                          className="px-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <Card className="inline-block">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Continue Shopping</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Discover more amazing baby products
                  </p>
                  <Button asChild>
                    <Link to="/products">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
