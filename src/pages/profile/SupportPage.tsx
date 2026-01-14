import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, Search, Send, ChevronDown, ChevronUp, FileText, Package, CreditCard, Truck, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdated: string;
  messages: number;
}

const SupportPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    orderNumber: '',
    email: ''
  });

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by going to the Order History page in your profile. Click on the "Track" button next to your order to see real-time updates. You\'ll also receive email notifications with tracking information once your order ships.',
      helpful: 45
    },
    {
      id: '2',
      category: 'orders',
      question: 'Can I cancel or modify my order?',
      answer: 'Orders can be cancelled or modified within 2 hours of placement. After this time, the order enters our fulfillment process and cannot be changed. Please contact our support team immediately if you need to make changes.',
      helpful: 32
    },
    {
      id: '3',
      category: 'shipping',
      question: 'What are the shipping options and costs?',
      answer: 'We offer standard shipping (5-7 business days) for $5.99, express shipping (2-3 business days) for $12.99, and overnight shipping for $24.99. Orders over $75 qualify for free standard shipping.',
      helpful: 28
    },
    {
      id: '4',
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with receipt. Some items like personalized products or final sale items cannot be returned.',
      helpful: 56
    },
    {
      id: '5',
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and gift cards. All payments are processed securely.',
      helpful: 41
    },
    {
      id: '6',
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. The link expires after 24 hours for security reasons.',
      helpful: 38
    },
    {
      id: '7',
      category: 'products',
      question: 'How do I know if a product is in stock?',
      answer: 'Product availability is shown on each product page. Green "In Stock" means we have the item ready to ship. "Low Stock" means limited quantities available. "Out of Stock" means the item is temporarily unavailable.',
      helpful: 22
    },
    {
      id: '8',
      category: 'rewards',
      question: 'How do the Welcome Rewards work?',
      answer: 'Earn 1 point for every $1 spent, plus bonus points for reviews, referrals, and birthdays. Points can be redeemed for discounts, free products, and exclusive perks. Higher tiers unlock better benefits.',
      helpful: 35
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      subject: 'Missing item in order #12345',
      category: 'orders',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-19',
      messages: 3
    },
    {
      id: '2',
      subject: 'Question about return policy',
      category: 'returns',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-20',
      messages: 2
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'orders', name: 'Orders', icon: <Package className="h-4 w-4" /> },
    { id: 'shipping', name: 'Shipping', icon: <Truck className="h-4 w-4" /> },
    { id: 'returns', name: 'Returns', icon: <FileText className="h-4 w-4" /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'account', name: 'Account', icon: <User className="h-4 w-4" /> },
    { id: 'products', name: 'Products', icon: <Package className="h-4 w-4" /> },
    { id: 'rewards', name: 'Rewards', icon: <Shield className="h-4 w-4" /> }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: SupportTicket['status']) => {
    const variants = {
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status]}>{status.replace('-', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    const variants = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[priority]}>{priority}</Badge>;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitSupport = () => {
    // Simulate submitting support request
    alert('Support ticket created successfully! We\'ll respond within 24 hours.');
    setShowContactForm(false);
    setFormData({
      subject: '',
      category: '',
      priority: 'medium',
      message: '',
      orderNumber: '',
      email: ''
    });
  };

  const handleFAQHelpful = (faqId: string) => {
    // Simulate marking FAQ as helpful
    console.log(`FAQ ${faqId} marked as helpful`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/profile')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            <h1 className="text-2xl font-bold">Help & Support</h1>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowContactForm(true)}>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Online</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground">1-800-BABY-SHOP</p>
                <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@littlesprout.com</p>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>Find quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* FAQ List */}
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg">
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full text-left">
                            <span className="font-medium">{faq.question}</span>
                            <Badge variant="outline" className="ml-2">
                              {categories.find(c => c.id === faq.category)?.name}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-muted-foreground mb-3">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {faq.helpful} people found this helpful
                            </span>
                            <Button variant="outline" size="sm" onClick={() => handleFAQHelpful(faq.id)}>
                              👍 Helpful
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No FAQs found matching your search.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Support Tickets */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Recent Support Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{ticket.subject}</h4>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        {getPriorityBadge(ticket.priority)}
                        <span>•</span>
                        <span>{ticket.messages} messages</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    View All Tickets
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Form */}
              {showContactForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Send us a message and we'll get back to you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c.id !== 'all').map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Order Number (Optional)</Label>
                      <Input
                        id="orderNumber"
                        value={formData.orderNumber}
                        onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                        placeholder="ORD-2024-001"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please describe your issue in detail..."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSubmitSupport} className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" onClick={() => setShowContactForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!showContactForm && (
                <Button onClick={() => setShowContactForm(true)} className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Create Support Ticket
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
