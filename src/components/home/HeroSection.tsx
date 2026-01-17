import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-peach/30 blur-2xl animate-float" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-lavender/30 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-mint/30 blur-xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="container relative py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              Trusted by 100,000+ Parents
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Everything Your{' '}
              <span className="bg-blue-400 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Little One</span>{' '}
              Needs to Bloom
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 px-4 lg:px-0">
              Premium, organic baby products designed with love. From cozy clothing to gentle care essentials, we've got your bundle of joy covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/products" className="gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-10">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-mint-light flex items-center justify-center">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <span className="hidden xs:inline">100% Safe</span>
                <span className="xs:hidden">Safe</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-peach-light flex items-center justify-center">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-peach" />
                </div>
                <span className="hidden xs:inline">Organic Materials</span>
                <span className="xs:hidden">Organic</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lavender-light flex items-center justify-center">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-lavender" />
                </div>
                <span className="hidden xs:inline">Free Shipping 50+</span>
                <span className="xs:hidden">Free Ship</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-square max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              {/* Main Image */}
              <div className="absolute inset-2 sm:inset-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-mint-light to-peach-light p-1.5 sm:p-2 shadow-elevated rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600"
                  alt="Happy baby with toys"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-2 sm:-left-4 top-1/4 bg-background rounded-lg sm:rounded-xl shadow-card p-2 sm:p-3 animate-bounce-gentle">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl">👶</span>
                  <div>
                    <p className="text-xs text-muted-foreground">Happy Babies</p>
                    <p className="font-bold text-xs sm:text-sm">100K+</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 sm:-right-4 bottom-1/4 bg-background rounded-lg sm:rounded-xl shadow-card p-2 sm:p-3 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl">⭐</span>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-bold text-xs sm:text-sm">4.9/5</p>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/4 -bottom-2 sm:-bottom-4 bg-background rounded-lg sm:rounded-xl shadow-card p-2 sm:p-3 animate-bounce-gentle" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl">🌿</span>
                  <div>
                    <p className="text-xs text-muted-foreground">Organic</p>
                    <p className="font-bold text-xs sm:text-sm">100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
