import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, CreditCard, ArrowLeft, Home, FileText, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/FirebaseAuthContext';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: {
    type: 'card' | 'paypal' | 'apple' | 'google';
    last4: string;
    brand: string;
  };
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details
    const fetchOrderDetails = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock order data - in real app, this would come from API
      const mockOrder: OrderDetails = {
        id: orderId || 'ORD-2024-001234',
        orderNumber: `ORD-2024-${orderId || '001234'}`,
        status: 'confirmed',
        items: [
          {
            id: '1',
            name: 'Organic Cotton Baby Onesie',
            price: 24.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1546484396-6e2b325c2f7?w=400&h=400',
            size: '6-9 months',
            color: 'Pink'
          },
          {
            id: '2',
            name: 'Soft Baby Blanket',
            price: 34.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1546484396-6e2b325c2f7?w=400&h=400',
            size: 'One Size',
            color: 'Cream'
          }
        ],
        subtotal: 84.97,
        shipping: 0,
        tax: 6.80,
        total: 91.77,
        shippingAddress: {
          name: user?.displayName || 'John Doe',
          street: '123 Baby Lane',
          city: 'San Francisco',
          state: 'CA',
          zip: '94102',
          country: 'United States'
        },
        billingAddress: {
          name: user?.displayName || 'John Doe',
          street: '123 Baby Lane',
          city: 'San Francisco',
          state: 'CA',
          zip: '94102',
          country: 'United States'
        },
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'Visa'
        },
        createdAt: new Date().toISOString(),
        estimatedDelivery: '2024-01-25',
        trackingNumber: '1Z999AA1234567890'
      };
      
      setOrder(mockOrder);
      setLoading(false);
      
      // Clear cart after successful order
      clearCart();
    };

    fetchOrderDetails();
  }, [orderId, user, clearCart]);

  const getStatusBadge = (status: OrderDetails['status']) => {
    const variants = {
      processing: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-purple-100 text-purple-800'
    };
    return variants[status];
  };

  const getStatusText = (status: OrderDetails['status']) => {
    const texts = {
      processing: 'Processing',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered'
    };
    return texts[status];
  };

  const getStatusIcon = (status: OrderDetails['status']) => {
    const icons = {
      processing: <Package className="h-4 w-4" />,
      confirmed: <CheckCircle className="h-4 w-4" />,
      shipped: <Truck className="h-4 w-4" />,
      delivered: <CheckCircle className="h-4 w-4" />
    };
    return icons[status];
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading your order details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">We couldn't find your order details.</p>
            <Button onClick={() => navigate('/profile')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase</p>
            <p className="text-sm text-muted-foreground">Your order has been received and is being processed.</p>
          </div>

          {/* Order Number */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Order Number</h2>
                  <p className="text-2xl font-bold text-primary">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusBadge(order.status)}>
                    <span className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Order Items */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` • Color: ${item.color}`}
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-semibold text-primary">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping & Billing Info */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="font-medium capitalize">{order.paymentMethod.brand} ending in {order.paymentMethod.last4}</p>
                  <p className="text-sm text-muted-foreground">Payment processed securely</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Timeline */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Processing</p>
                    <p className="text-sm text-muted-foreground">Estimated: {order.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Shipped</p>
                    <p className="text-sm text-muted-foreground">Tracking: {order.trackingNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Delivered</p>
                    <p className="text-sm text-muted-foreground">Estimated: {order.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/products')}>
              <Home className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
            <Button onClick={() => navigate('/profile')}>
              <FileText className="mr-2 h-4 w-4" />
              View Order History
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile/support')}>
              <Phone className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
