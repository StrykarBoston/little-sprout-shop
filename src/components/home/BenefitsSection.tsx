import { Truck, RefreshCw, Shield, HeadphonesIcon } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders over ₹4,000. Fast and reliable shipping.',
    color: 'bg-mint-light text-primary',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. No questions asked.',
    color: 'bg-peach-light text-peach',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All products tested and certified for baby safety.',
    color: 'bg-lavender-light text-lavender',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our parenting experts are here to help anytime.',
    color: 'bg-soft-yellow text-yellow-600',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group text-center p-6 rounded-2xl bg-card hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
