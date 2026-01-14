import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Plus, Eye, EyeOff, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface GiftCard {
  id: string;
  cardNumber: string;
  balance: number;
  initialBalance: number;
  status: 'active' | 'expired' | 'used';
  expiryDate: string;
  purchaseDate: string;
  lastUsed?: string;
  pin?: string;
}

const GiftCardsPage = () => {
  const navigate = useNavigate();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([
    {
      id: '1',
      cardNumber: 'GC-1234-5678-9012',
      balance: 45.99,
      initialBalance: 100.00,
      status: 'active',
      expiryDate: '2024-12-31',
      purchaseDate: '2024-01-15',
      lastUsed: '2024-01-20',
      pin: '1234'
    },
    {
      id: '2',
      cardNumber: 'GC-2345-6789-0123',
      balance: 0.00,
      initialBalance: 50.00,
      status: 'used',
      expiryDate: '2024-06-30',
      purchaseDate: '2023-12-01',
      lastUsed: '2024-01-10',
      pin: '5678'
    },
    {
      id: '3',
      cardNumber: 'GC-3456-7890-1234',
      balance: 25.00,
      initialBalance: 25.00,
      status: 'expired',
      expiryDate: '2023-12-31',
      purchaseDate: '2023-06-15'
    }
  ]);

  const [showPin, setShowPin] = useState<{ [key: string]: boolean }>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemPin, setRedeemPin] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('25');

  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    amount: '25',
    message: '',
    deliveryDate: '',
    senderName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePinVisibility = (cardId: string) => {
    setShowPin(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const getStatusBadge = (status: GiftCard['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      used: 'bg-gray-100 text-gray-800',
      expired: 'bg-red-100 text-red-800'
    };

    const icons = {
      active: <CheckCircle className="h-3 w-3 mr-1" />,
      used: <CheckCircle className="h-3 w-3 mr-1" />,
      expired: <XCircle className="h-3 w-3 mr-1" />
    };

    return (
      <Badge className={variants[status]}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handlePurchaseGiftCard = () => {
    // Simulate purchase
    const newCard: GiftCard = {
      id: Date.now().toString(),
      cardNumber: `GC-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      balance: parseFloat(formData.amount),
      initialBalance: parseFloat(formData.amount),
      status: 'active',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      purchaseDate: new Date().toISOString().split('T')[0],
      pin: Math.floor(1000 + Math.random() * 9000).toString()
    };
    setGiftCards(prev => [...prev, newCard]);
    setIsAddingNew(false);
    setFormData({
      recipientEmail: '',
      recipientName: '',
      amount: '25',
      message: '',
      deliveryDate: '',
      senderName: ''
    });
  };

  const handleRedeemGiftCard = () => {
    // Simulate redemption
    const card = giftCards.find(gc => gc.cardNumber === redeemCode && gc.pin === redeemPin);
    if (card && card.status === 'active') {
      setGiftCards(prev => prev.map(gc => 
        gc.id === card.id 
          ? { ...gc, balance: 0, status: 'used', lastUsed: new Date().toISOString().split('T')[0] }
          : gc
      ));
      setRedeemDialogOpen(false);
      setRedeemCode('');
      setRedeemPin('');
      alert('Gift card redeemed successfully!');
    } else {
      alert('Invalid gift card code or PIN');
    }
  };

  const totalBalance = giftCards
    .filter(card => card.status === 'active')
    .reduce((sum, card) => sum + card.balance, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/profile')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            <h1 className="text-2xl font-bold">Gift Cards</h1>
          </div>

          {/* Summary Card */}
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-purple-900">Total Available Balance</h2>
                  <p className="text-3xl font-bold text-purple-900">${totalBalance.toFixed(2)}</p>
                  <p className="text-sm text-purple-700 mt-1">
                    {giftCards.filter(card => card.status === 'active').length} active gift cards
                  </p>
                </div>
                <Gift className="h-16 w-16 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button onClick={handleAddNew} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Purchase Gift Card
            </Button>
            <Button variant="outline" onClick={() => setRedeemDialogOpen(true)} className="flex-1">
              <Gift className="h-4 w-4 mr-2" />
              Redeem Gift Card
            </Button>
          </div>

          {/* Purchase Gift Card Form */}
          {isAddingNew && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Purchase Gift Card</CardTitle>
                <CardDescription>Send a gift card to someone special</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail">Recipient Email</Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      value={formData.recipientEmail}
                      onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Gift Card Amount</Label>
                  <Select value={formData.amount} onValueChange={(value) => handleInputChange('amount', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">$25</SelectItem>
                      <SelectItem value="50">$50</SelectItem>
                      <SelectItem value="75">$75</SelectItem>
                      <SelectItem value="100">$100</SelectItem>
                      <SelectItem value="150">$150</SelectItem>
                      <SelectItem value="200">$200</SelectItem>
                      <SelectItem value="custom">Custom Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.amount === 'custom' && (
                  <div className="space-y-2">
                    <Label htmlFor="customAmount">Custom Amount</Label>
                    <Input
                      id="customAmount"
                      type="number"
                      placeholder="Enter amount"
                      min="10"
                      max="500"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Happy Birthday! Hope you enjoy shopping for your little one!"
                    className="w-full min-h-[80px] p-3 border rounded-md resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Your Name</Label>
                    <Input
                      id="senderName"
                      value={formData.senderName}
                      onChange={(e) => handleInputChange('senderName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handlePurchaseGiftCard}>
                    Purchase Gift Card - ${formData.amount}
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gift Cards List */}
          <div className="space-y-4">
            {giftCards.map((card) => (
              <Card key={card.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Gift className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold">{card.cardNumber}</h3>
                        {getStatusBadge(card.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Balance</p>
                          <p className="font-semibold text-lg">${card.balance.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Initial Value</p>
                          <p className="font-medium">${card.initialBalance.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p className="font-medium">{new Date(card.expiryDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">PIN</p>
                          <div className="flex items-center gap-2">
                            <span className="font-medium font-mono">
                              {showPin[card.id] ? card.pin : '••••'}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePinVisibility(card.id)}
                            >
                              {showPin[card.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-muted-foreground">
                        <p>Purchased: {new Date(card.purchaseDate).toLocaleDateString()}</p>
                        {card.lastUsed && <p>Last used: {new Date(card.lastUsed).toLocaleDateString()}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {card.status === 'active' && (
                        <Button size="sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Use Card
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Redeem Gift Card Dialog */}
          <AlertDialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Redeem Gift Card</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter your gift card number and PIN to add the balance to your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="redeemCode">Gift Card Number</Label>
                  <Input
                    id="redeemCode"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                    placeholder="GC-1234-5678-9012"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="redeemPin">PIN</Label>
                  <Input
                    id="redeemPin"
                    value={redeemPin}
                    onChange={(e) => setRedeemPin(e.target.value)}
                    placeholder="1234"
                    maxLength={4}
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRedeemGiftCard}>Redeem Card</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GiftCardsPage;
