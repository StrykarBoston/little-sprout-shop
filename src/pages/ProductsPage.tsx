import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid3X3, LayoutList, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-25', label: 'Under ₹2,500' },
  { value: '25-50', label: '₹2,500 - ₹5,000' },
  { value: '50-100', label: '₹5,000 - ₹10,000' },
  { value: '100+', label: '₹10,000+' },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        result = result.filter((p) => p.price >= min && p.price <= max);
      } else {
        result = result.filter((p) => p.price >= 100);
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (a.badge === 'new' ? -1 : 1));
        break;
      default:
        result.sort((a, b) => (a.badge === 'bestseller' ? -1 : 1));
    }

    return result;
  }, [selectedCategory, priceRange, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    priceRange !== 'all',
  ].filter(Boolean).length;

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            {selectedCategory !== 'all'
              ? categories.find((c) => c.slug === selectedCategory)?.name || 'All Products'
              : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            Discover our curated collection of premium baby products
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-heading font-bold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === 'all'
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                        selectedCategory === category.slug
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-heading font-bold text-foreground mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        priceRange === range.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden gap-2"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-1.5 rounded",
                      viewMode === 'grid' ? "bg-accent" : ""
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-1.5 rounded",
                      viewMode === 'list' ? "bg-accent" : ""
                    )}
                    aria-label="List view"
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {priceRanges.find((r) => r.value === priceRange)?.label}
                    <button onClick={() => setPriceRange('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4 sm:gap-6",
                  viewMode === 'grid'
                    ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                    : "grid-cols-1"
                )}
              >
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <p className="text-muted-foreground mb-4 px-4">
                  No products found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                  }}
                  className="w-full sm:w-auto"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 lg:hidden transition-opacity",
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 max-w-full bg-background z-50 lg:hidden transition-transform overflow-y-auto",
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-lg">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Filter Content */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setIsFilterOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedCategory === 'all'
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.slug);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                      selectedCategory === category.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-foreground mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      setPriceRange(range.value);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      priceRange === range.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
