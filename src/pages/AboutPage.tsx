import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Baby, Shield, Leaf, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/FirebaseAuthContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Product } from '@/types';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c3ca?w=200&h=200&fit=crop&crop=face",
      bio: "Mom of two and passionate about creating safe, sustainable baby products."
    },
    {
      name: "Michael Chen",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Specializes in ergonomic and innovative baby product design."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Ensures every family has the best shopping experience with us."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Little Sprout Born",
      description: "Started with a mission to provide safe, affordable baby products"
    },
    {
      year: "2020",
      title: "First Store Opening",
      description: "Opened our flagship store in San Francisco"
    },
    {
      year: "2021",
      title: "Eco-Friendly Line",
      description: "Launched our sustainable product collection"
    },
    {
      year: "2023",
      title: "National Expansion",
      description: "Expanded to serve families across the United States"
    },
    {
      year: "2024",
      title: "100,000+ Happy Families",
      description: "Reached our milestone of serving over 100,000 families"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-mint-light/30 to-peach-light/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              About Little Sprout Shop
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make parenting easier by providing safe, sustainable, 
              and affordable baby products that grow with your little ones.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Mission Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              To create a world where every parent has access to high-quality, safe, and 
              environmentally-friendly baby products without breaking the bank.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Safety First</h3>
                <p className="text-sm text-muted-foreground">
                  All products meet or exceed safety standards. We test everything rigorously.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Leaf className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Sustainable materials and practices to protect our children's future.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Parent-Designed</h3>
                <p className="text-sm text-muted-foreground">
                  Created by parents, for parents. We understand real needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  Premium materials and craftsmanship that lasts through multiple children.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Little Sprout Shop began in 2019 when founder Sarah Johnson, a new mother, 
                  struggled to find baby products that were both safe and affordable. 
                  Frustrated by the lack of options, she decided to create her own.
                </p>
                <p>
                  What started as a small collection of organic cotton onesies has grown into 
                  a comprehensive range of baby products, all designed with the same core principles: 
                  safety, sustainability, and affordability.
                </p>
                <p>
                  Today, we're proud to serve over 100,000 families across the country, 
                  helping them give their little ones the best start in life.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Our story"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Journey</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100,000+</div>
                <p className="text-muted-foreground">Happy Families</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Products</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
                <p className="text-muted-foreground">Customer Rating</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of thousands of families who trust Little Sprout Shop for their baby needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
