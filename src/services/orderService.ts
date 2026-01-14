// Order Service - Simulates backend order processing
// In a real application, this would connect to a backend API

export interface OrderRequest {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }>;
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
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  message: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Simulate order creation
export const createOrder = async (orderRequest: OrderRequest): Promise<OrderResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate unique order ID
  const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
  const orderNumber = `ORD-2024-${orderId}`;
  
  // Calculate totals
  const subtotal = orderRequest.subtotal || 0;
  const shipping = orderRequest.shipping || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  // Simulate order processing
  const orderResponse: OrderResponse = {
    success: true,
    orderId,
    orderNumber,
    status: 'confirmed',
    message: 'Order successfully created and confirmed',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    trackingNumber: `1Z999AA${Math.random().toString(36).substring(2, 10).toUpperCase()}`
  };
  
  // Log order details (in real app, this would be sent to backend)
  console.log('Order created:', {
    orderId,
    orderNumber,
    total,
    items: orderRequest.items.length
  });
  
  return orderResponse;
};

// Get order details by ID
export const getOrderById = async (orderId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock order data
  const mockOrder = {
    id: orderId,
    orderNumber: `ORD-2024-${orderId}`,
    status: 'confirmed' as const,
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
      name: 'John Doe',
      street: '123 Baby Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'United States'
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Baby Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'United States'
    },
    paymentMethod: {
      type: 'card' as const,
      last4: '4242',
      brand: 'Visa'
    },
    createdAt: new Date().toISOString(),
    estimatedDelivery: '2024-01-25',
    trackingNumber: '1Z999AA1234567890'
  };
  
  return mockOrder;
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: 'processing' | 'confirmed' | 'shipped' | 'delivered'): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Order ${orderId} status updated to: ${status}`);
  return true;
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (orderId: string, email: string) => {
  // Simulate email service delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Order confirmation email sent to ${email} for order ${orderId}`);
  return true;
};

// Send shipping notification
export const sendShippingNotification = async (orderId: string, email: string) => {
  // Simulate notification service delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Shipping notification sent to ${email} for order ${orderId}`);
  return true;
};
