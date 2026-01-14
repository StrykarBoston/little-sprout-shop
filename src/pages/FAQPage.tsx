import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Baby, Shield, FileText, Users, MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle, ChevronDown, Eye, ChevronUp, HelpCircle, Package, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/FirebaseAuthContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Product } from '@/types';

const FAQPage = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      id: 'general',
      name: 'General Questions',
      icon: HelpCircle,
      color: 'bg-blue-100 text-blue-600',
      questions: [
        {
          q: 'What is Little Sprout Shop?',
          a: 'Little Sprout Shop is your trusted online destination for safe, sustainable, and affordable baby products. We offer everything from clothing and diapers to toys and feeding essentials, all carefully selected for quality and safety.'
        },
        {
          q: 'Where do you ship?',
          a: 'We currently ship throughout the United States. Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. Free shipping is available on orders over $50.'
        },
        {
          q: 'How can I track my order?',
          a: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.'
        },
        {
          q: 'Do you have physical stores?',
          a: 'Yes! We have flagship stores in San Francisco, New York, and Los Angeles. You can find our store locations and hours on our website.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Products & Quality',
      icon: Package,
      color: 'bg-green-100 text-green-600',
      questions: [
        {
          q: 'Are your products safe for babies?',
          a: 'Absolutely! All our products meet or exceed US safety standards. We conduct rigorous testing on every item and only use materials that are BPA-free, phthalate-free, and non-toxic.'
        },
        {
          q: 'What materials do you use?',
          a: 'We prioritize organic and sustainable materials including organic cotton, bamboo, natural rubber, and recycled plastics. All materials are clearly listed on product pages.'
        },
        {
          q: 'How do I choose the right size?',
          a: 'We provide detailed size guides on every product page. You can also filter by age range and use our size calculator for the most accurate fit.'
        },
        {
          q: 'Do you offer product warranties?',
          a: 'Yes! All products come with a 1-year warranty against manufacturing defects. Some premium items have extended warranties up to 3 years.'
        }
      ]
    },
    {
      id: 'payment',
      name: 'Payment & Pricing',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and buy now, pay later options through Affirm.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard SSL encryption and are PCI compliant. Your payment information is never stored on our servers.'
        },
        {
          q: 'Do you offer payment plans?',
          a: 'Yes! We partner with Affirm to offer payment plans for purchases over $100. You can choose 3, 6, or 12-month payment options at checkout.'
        },
        {
          q: 'Why was my payment declined?',
          a: 'Payments can be declined for various reasons: insufficient funds, incorrect billing information, or bank security measures. Please check with your bank or try a different payment method.'
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      icon: Truck,
      color: 'bg-orange-100 text-orange-600',
      questions: [
        {
          q: 'How much does shipping cost?',
          a: 'Standard shipping is $5.99, express shipping is $15.99. Orders over $50 qualify for free standard shipping. International shipping rates vary by location.'
        },
        {
          q: 'How long does delivery take?',
          a: 'Standard shipping: 5-7 business days. Express shipping: 2-3 business days. International shipping: 10-20 business days depending on location.'
        },
        {
          q: 'Can I change my shipping address?',
          a: 'You can change your shipping address within 2 hours of placing an order. After that, please contact customer service immediately.'
        },
        {
          q: 'What if my package is lost or damaged?',
          a: 'We insure all packages. If your order is lost or arrives damaged, contact us immediately and we\'ll send a replacement or issue a full refund.'
        }
      ]
    },
    {
      id: 'returns',
      name: 'Returns & Exchanges',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer 30-day hassle-free returns on most items. Products must be unused, in original packaging, and with proof of purchase.'
        },
        {
          q: 'How do I return an item?',
          a: 'Initiate a return through your account or contact customer service. We\'ll email you a prepaid shipping label. Once received, refunds process within 3-5 business days.'
        },
        {
          q: 'Are there any return fees?',
          a: 'Standard returns have no fees. However, return shipping costs may apply unless the item is defective or we made an error.'
        },
        {
          q: 'Can I exchange items?',
          a: 'Yes! You can exchange for different sizes or colors within 30 days. Exchanges for different products are treated as returns plus new purchases.'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <div className="bg-gradient-to-br from-mint-light/30 to-peach-light/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about Little Sprout Shop
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg h-12"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {searchTerm && (
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              Found {filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} results for "{searchTerm}"
            </p>
          </div>
        )}

        {/* FAQ Categories */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant="secondary">
                        {category.questions.length} questions
                      </Badge>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                
                {expandedCategory === category.id && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {category.questions.map((item, index) => (
                        <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                          <div
                            className="cursor-pointer py-3"
                            onClick={() => toggleQuestion(index)}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium pr-4">{item.q}</h4>
                              {expandedQuestion === index ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                          </div>
                          {expandedQuestion === index && (
                            <div className="pt-3 text-muted-foreground leading-relaxed">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Still Need Help Section */}
        {filteredCategories.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <HelpCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find answers matching your search. Try different keywords or contact our support team.
              </p>
              <Button size="lg">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="mailto:support@littlesproutshop.com">
                Email Support
              </a>
            </Button>
            <Button size="lg" variant="outline">
              Live Chat
            </Button>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Support Hours: Monday-Friday 9AM-6PM EST</p>
            <p>Response Time: Within 24 hours</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
