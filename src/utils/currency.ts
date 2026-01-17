// Currency conversion utilities for Indian market
export const INR_EXCHANGE_RATE = 83; // 1 USD = 83 INR (approximate)

export const formatINR = (price: number): string => {
  const inrPrice = price * INR_EXCHANGE_RATE;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(inrPrice);
};

export const formatUSD = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Indian states for shipping
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Mumbai', 'Kolkata',
  'Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Vadodara', 'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur'
];

// Indian cities for major delivery zones
export const MAJOR_INDIAN_CITIES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Vadodara', 'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur'
];

// Indian phone number format
export const formatIndianPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Indian pin code validation
export const validateIndianPinCode = (pinCode: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pinCode);
};

// Common Indian payment methods
export const INDIAN_PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Wallet', icon: '👛' },
];
