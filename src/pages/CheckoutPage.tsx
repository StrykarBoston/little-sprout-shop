import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Shield, 
  MapPin,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/FirebaseAuthContext';
import { createOrder, OrderRequest } from '@/services/orderService';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items: cartItems, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    if (calculateSubtotal() > 50) return 0;
    return shippingMethod === 'express' ? 15.99 : 5.99;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }

    // Validate form inputs
    if (!shippingInfo.firstName.trim() || !shippingInfo.lastName.trim() || 
        !shippingInfo.email.trim() || !shippingInfo.address.trim() || 
        !shippingInfo.city.trim() || !shippingInfo.state.trim() || 
        !shippingInfo.zipCode.trim()) {
      alert('Please fill in all required shipping information fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (shippingInfo.phone && !phoneRegex.test(shippingInfo.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Payment validation for card payments
    if (paymentMethod === 'card') {
      const cardNumberRegex = /^[\d\s]+$/;
      if (!paymentInfo.cardNumber.trim() || !cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid card number.');
        return;
      }

      const cvvRegex = /^\d{3,4}$/;
      if (!paymentInfo.cvv.trim() || !cvvRegex.test(paymentInfo.cvv)) {
        alert('Please enter a valid CVV.');
        return;
      }

      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!paymentInfo.expiryDate.trim() || !expiryRegex.test(paymentInfo.expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY).');
        return;
      }
    }
    
    // Show loading state
    const submitButton = e.currentTarget as HTMLButtonElement;
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent inline-block mr-2"></div> Processing...';
    submitButton.disabled = true;
    
    try {
      // Prepare order data
      const orderRequest: OrderRequest = {
        items: cartItems.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          size: item.product.size,
          color: item.product.color
        })),
        shippingAddress: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zip: shippingInfo.zipCode,
          country: shippingInfo.country
        },
        billingAddress: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zip: shippingInfo.zipCode,
          country: shippingInfo.country
        },
        paymentMethod: {
          type: paymentMethod as 'card' | 'paypal' | 'apple' | 'google',
          last4: paymentInfo.cardNumber.slice(-4),
          brand: paymentInfo.cardName
        },
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal()
      };
      
      // Create order via service
      const orderResponse = await createOrder(orderRequest);
      
      if (orderResponse.success) {
        // Clear cart after successful order
        clearCart();
        // Redirect to order confirmation page
        navigate(`/order-confirmation/${orderResponse.orderId}`);
        
        // Send confirmation email (in real app)
        if (user?.email) {
          // await sendOrderConfirmationEmail(orderResponse.orderId, user.email);
        }
      } else {
        // Handle error
        alert('Order processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred while processing your order. Please try again.');
    } finally {
      // Restore button state
      if (submitButton) {
        submitButton.innerHTML = originalText || 'Place Order';
        submitButton.disabled = false;
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items to your cart before proceeding to checkout.</p>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold font-heading mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Standard Shipping</span>
                      <span className="font-medium">
                        {calculateSubtotal() > 50 ? 'FREE' : '$5.99'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      5-7 business days
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-medium">$15.99</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      2-3 business days
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="cursor-pointer">
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'card' && (
                <>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cardName"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary ({cartItems.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.product.size}  {item.product.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {calculateSubtotal() < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Free Shipping Alert:</strong> Add ${(50 - calculateSubtotal()).toFixed(2)} 
                    more to qualify for free shipping!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Place Order Button */}
          <form onSubmit={handleCheckout}>
            <Button type="submit" className="w-full" size="lg">
              <Shield className="mr-2 h-5 w-5" />
              Place Order  ${calculateTotal().toFixed(2)}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              By placing this order, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>

          {/* Security Badge */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Shield className="mx-auto h-8 w-8 text-green-600" />
                <p className="text-sm font-medium">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
