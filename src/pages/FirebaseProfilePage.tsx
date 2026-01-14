import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Package, ShoppingBag, LogOut, Settings, CreditCard, MapPin, Shield, Bell, Edit2, Camera, Gift, Star, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/FirebaseAuthContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const FirebaseProfilePage = () => {
  const { user, signOutUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const handleSignOut = async () => {
    setLoading(true);
    const result = await signOutUser();
    if (!result.error) {
      navigate('/');
    }
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const result = await updateUserProfile({ displayName });
    if (!result.error) {
      setEditing(false);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const userInitials = displayName
    ?.split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-heading">My Account</h1>
              <p className="text-muted-foreground">Manage your profile and preferences</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} disabled={loading}>
              <LogOut className="mr-2 h-4 w-4" />
              {loading ? 'Signing out...' : 'Sign Out'}
            </Button>
          </div>

          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.photoURL || ''} />
                  <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {editing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="max-w-xs"
                        placeholder="Enter your name"
                      />
                      <Button
                        size="sm"
                        onClick={handleUpdateProfile}
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{displayName || 'User'}</h2>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditing(true)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    <Shield className="mr-1 h-3 w-3" />
                    Firebase Account
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Management
                </CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/edit">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/notifications">
                      <Bell className="mr-2 h-4 w-4" />
                      Notification Preferences
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/privacy">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy & Security
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Shopping & Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Shopping & Orders
                </CardTitle>
                <CardDescription>
                  View your orders and manage shopping preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/orders">
                      <Package className="mr-2 h-4 w-4" />
                      Order History
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/addresses">
                      <MapPin className="mr-2 h-4 w-4" />
                      Shipping Addresses
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/payment">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rewards & Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Rewards & Benefits
                </CardTitle>
                <CardDescription>
                  Manage your rewards and gift cards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/rewards">
                      <Star className="mr-2 h-4 w-4" />
                      Welcome Rewards
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/gift-cards">
                      <Gift className="mr-2 h-4 w-4" />
                      Gift Cards
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Support
                </CardTitle>
                <CardDescription>
                  Get help and contact our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile/support">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Your Firebase account information and activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">User ID</label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{user.uid}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Verified</label>
                  <p className="text-sm">
                    {user.emailVerified ? (
                      <Badge variant="default" className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge variant="destructive">Not Verified</Badge>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Sign In</label>
                  <p className="text-sm">
                    {user.metadata.lastSignInTime 
                      ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                      : 'First time sign in'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                  <p className="text-sm">
                    {user.metadata.creationTime 
                      ? new Date(user.metadata.creationTime).toLocaleDateString()
                      : 'Unknown'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FirebaseProfilePage;
