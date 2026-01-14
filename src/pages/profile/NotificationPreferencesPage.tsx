import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Mail, Smartphone, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const NotificationPreferencesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    email: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      newArrivals: true,
      restockAlerts: false,
    },
    push: {
      orderUpdates: true,
      promotions: false,
      newArrivals: false,
      priceDrops: true,
    },
    sms: {
      orderUpdates: false,
      deliveryUpdates: false,
      promotions: false,
    },
  });

  const handleToggle = (category: 'email' | 'push' | 'sms', preference: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [preference]: !prev[category][preference as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/profile');
    setLoading(false);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            <h1 className="text-2xl font-bold">Notification Preferences</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Manage Your Notifications</CardTitle>
              <CardDescription>Choose how you want to receive updates from us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Email Notifications</h3>
                </div>
                <div className="space-y-3 pl-7">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-orderUpdates">Order Updates</Label>
                    <Switch
                      id="email-orderUpdates"
                      checked={preferences.email.orderUpdates}
                      onCheckedChange={() => handleToggle('email', 'orderUpdates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-promotions">Promotions & Deals</Label>
                    <Switch
                      id="email-promotions"
                      checked={preferences.email.promotions}
                      onCheckedChange={() => handleToggle('email', 'promotions')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newsletter">Monthly Newsletter</Label>
                    <Switch
                      id="email-newsletter"
                      checked={preferences.email.newsletter}
                      onCheckedChange={() => handleToggle('email', 'newsletter')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newArrivals">New Arrivals</Label>
                    <Switch
                      id="email-newArrivals"
                      checked={preferences.email.newArrivals}
                      onCheckedChange={() => handleToggle('email', 'newArrivals')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-restockAlerts">Restock Alerts</Label>
                    <Switch
                      id="email-restockAlerts"
                      checked={preferences.email.restockAlerts}
                      onCheckedChange={() => handleToggle('email', 'restockAlerts')}
                    />
                  </div>
                </div>
              </div>
              <Separator />

              {/* Push Notifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Push Notifications</h3>
                </div>
                <div className="space-y-3 pl-7">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-orderUpdates">Order Updates</Label>
                    <Switch
                      id="push-orderUpdates"
                      checked={preferences.push.orderUpdates}
                      onCheckedChange={() => handleToggle('push', 'orderUpdates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-promotions">Promotions & Deals</Label>
                    <Switch
                      id="push-promotions"
                      checked={preferences.push.promotions}
                      onCheckedChange={() => handleToggle('push', 'promotions')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-newArrivals">New Arrivals</Label>
                    <Switch
                      id="push-newArrivals"
                      checked={preferences.push.newArrivals}
                      onCheckedChange={() => handleToggle('push', 'newArrivals')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-priceDrops">Price Drops</Label>
                    <Switch
                      id="push-priceDrops"
                      checked={preferences.push.priceDrops}
                      onCheckedChange={() => handleToggle('push', 'priceDrops')}
                    />
                  </div>
                </div>
              </div>
              <Separator />

              {/* SMS Notifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">SMS Notifications</h3>
                </div>
                <div className="space-y-3 pl-7">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-orderUpdates">Order Updates</Label>
                    <Switch
                      id="sms-orderUpdates"
                      checked={preferences.sms.orderUpdates}
                      onCheckedChange={() => handleToggle('sms', 'orderUpdates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-deliveryUpdates">Delivery Updates</Label>
                    <Switch
                      id="sms-deliveryUpdates"
                      checked={preferences.sms.deliveryUpdates}
                      onCheckedChange={() => handleToggle('sms', 'deliveryUpdates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-promotions">Promotions & Deals</Label>
                    <Switch
                      id="sms-promotions"
                      checked={preferences.sms.promotions}
                      onCheckedChange={() => handleToggle('sms', 'promotions')}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Preferences'}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPreferencesPage;
