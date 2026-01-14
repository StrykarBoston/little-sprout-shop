import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Edit2, Trash2, Save, X, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple' | 'google';
  isDefault: boolean;
  cardNumber?: string;
  cardholderName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  brand?: string;
  last4?: string;
  email?: string;
}

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      isDefault: true,
      cardNumber: '•••• •••• •••• 4242',
      cardholderName: 'John Doe',
      expiryMonth: '12',
      expiryYear: '2025',
      brand: 'visa',
      last4: '4242'
    },
    {
      id: '2',
      type: 'paypal',
      isDefault: false,
      email: 'john.doe@example.com'
    }
  ]);

  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'card' | 'paypal' | 'apple' | 'google'>('card');

  const [formData, setFormData] = useState<Partial<PaymentMethod>>({
    type: 'card',
    isDefault: false,
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData(method);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingMethod(null);
    setFormData({
      type: selectedType,
      isDefault: false,
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      email: ''
    });
    setIsAddingNew(true);
  };

  const handleSave = () => {
    if (editingMethod) {
      setPaymentMethods(prev => prev.map(method => 
        method.id === editingMethod.id 
          ? { ...formData, id: editingMethod.id } as PaymentMethod
          : method
      ));
    } else {
      const newMethod: PaymentMethod = {
        ...formData,
        id: Date.now().toString()
      } as PaymentMethod;
      setPaymentMethods(prev => [...prev, newMethod]);
    }
    setEditingMethod(null);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setEditingMethod(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    setMethodToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (methodToDelete) {
      setPaymentMethods(prev => prev.filter(method => method.id !== methodToDelete));
      setDeleteDialogOpen(false);
      setMethodToDelete(null);
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const getCardBrand = (brand: string) => {
    const brands: { [key: string]: string } = {
      visa: 'Visa',
      mastercard: 'Mastercard',
      amex: 'American Express',
      discover: 'Discover'
    };
    return brands[brand] || brand;
  };

  const getPaymentIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'paypal': return <span className="text-blue-600 font-bold">PayPal</span>;
      case 'apple': return <span className="text-black"> Apple Pay</span>;
      case 'google': return <span className="text-blue-500">G</span>;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

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
            <h1 className="text-2xl font-bold">Payment Methods</h1>
          </div>

          {/* Security Notice */}
          <Card className="mb-6 border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Payment Processing</p>
                  <p className="text-xs text-blue-700">Your payment information is encrypted and securely stored</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add New Payment Method */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedType} onValueChange={(value: 'card' | 'paypal' | 'apple' | 'google') => setSelectedType(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple">Apple Pay</SelectItem>
                  <SelectItem value="google">Google Pay</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddNew} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>

          {/* Payment Method Form */}
          {(isAddingNew || editingMethod) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  {isAddingNew ? 'Add Payment Method' : 'Edit Payment Method'}
                </CardTitle>
                <CardDescription>
                  {isAddingNew ? 'Enter your payment method details' : 'Update your payment method'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(formData.type === 'card') ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber || ''}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        value={formData.cardholderName || ''}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Expiry Month</Label>
                        <Select value={formData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                                {(i + 1).toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Expiry Year</Label>
                        <Select value={formData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={i} value={(new Date().getFullYear() + i).toString()}>
                                {new Date().getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv || ''}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Payment Method
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Methods List */}
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="relative">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPaymentIcon(method.type)}
                        <h3 className="font-semibold">
                          {method.type === 'card' 
                            ? `${getCardBrand(method.brand || '')} •••• ${method.last4}`
                            : method.type.charAt(0).toUpperCase() + method.type.slice(1)
                          }
                        </h3>
                        {method.isDefault && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {method.type === 'card' ? (
                          <>
                            <p>{method.cardholderName}</p>
                            <p>Expires {method.expiryMonth}/{method.expiryYear}</p>
                          </>
                        ) : (
                          <p>{method.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(method)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(method.id)}
                          className="text-destructive hover:text-destructive"
                          disabled={method.isDefault}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this payment method? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentMethodsPage;
