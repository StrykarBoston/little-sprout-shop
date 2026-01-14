import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Baby, 
  Truck, 
  Shield, 
  FileText, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  ChevronDown,
  MessageCircle,
  Send,
  Building,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/FirebaseAuthContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Product } from '@/types';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@littlesproutshop.com',
      description: 'Response within 24 hours',
      hours: '24/7'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '1-800-SPROUT-1',
      description: 'Speak with our team',
      hours: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Available on website',
      description: 'Instant assistance',
      hours: '24/7'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '1234 Market Street, Suite 500',
      phone: '(415) 555-0123',
      hours: 'Mon-Fri 9AM-6PM',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
    },
    {
      city: 'New York',
      address: '567 5th Avenue, Floor 12',
      phone: '(212) 555-0456',
      hours: 'Mon-Fri 9AM-6PM',
      image: 'https://images.unsplash.com/photo-1496442226665-8b4b1bc609b6?w=400&h=300&fit=crop'
    },
    {
      city: 'Los Angeles',
      address: '8900 Sunset Boulevard, Suite 200',
      phone: '(310) 555-0789',
      hours: 'Mon-Fri 9AM-6PM',
      image: 'https://images.unsplash.com/photo-1519741497674-611481ab3ae2?w=400&h=300&fit=crop'
    }
  ];

  const faqItems = [
    {
      question: 'How quickly will I receive a response?',
      answer: 'Email responses within 24 hours, phone support available during business hours, live chat instant.'
    },
    {
      question: 'Can I track my order through customer service?',
      answer: 'Yes! Our team can help track any order and provide real-time updates.'
    },
    {
      question: 'Do you offer product recommendations?',
      answer: 'Absolutely! Our specialists can help you find the perfect products based on your needs.'
    },
    {
      question: 'What if I need to change my order?',
      answer: 'Contact us within 2 hours of placing your order for modifications.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // In real app, this would send to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <div className="bg-gradient-to-br from-mint-light/30 to-peach-light/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold font-heading mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              We're here to help! Reach out through any of the channels below
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Quick Contact Methods */}
          <div>
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                      <p className="text-primary font-medium mb-2">{method.value}</p>
                      <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{method.hours}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form and Office Locations */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full p-3 border rounded-md"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Status</option>
                      <option value="return">Return/Exchange</option>
                      <option value="product">Product Question</option>
                      <option value="shipping">Shipping Issue</option>
                      <option value="account">Account Help</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <Label>Preferred Contact Method</Label>
                    <RadioGroup 
                      value={formData.contactMethod} 
                      onValueChange={(value) => handleInputChange('contactMethod', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email-contact" />
                        <Label htmlFor="email-contact" className="cursor-pointer">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone-contact" />
                        <Label htmlFor="phone-contact" className="cursor-pointer">
                          Phone
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Our Offices</h3>
              <div className="space-y-4">
                {officeLocations.map((office, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex">
                      <img
                        src={office.image}
                        alt={`${office.city} office`}
                        className="w-24 h-24 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Building className="h-4 w-4 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">{office.city}</h4>
                            <p className="text-sm text-muted-foreground">{office.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-6 text-center">
              Quick Answers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-2">{item.question}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Follow us on social media for parenting tips, product updates, and exclusive offers!
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="outline">
                Facebook
              </Button>
              <Button size="lg" variant="outline">
                Instagram
              </Button>
              <Button size="lg" variant="outline">
                Pinterest
              </Button>
              <Button size="lg" variant="outline">
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
