import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Star, Trophy, Zap, Crown, Percent, Calendar, TrendingUp, Award, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface RewardTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  minPoints: number;
  maxPoints?: number;
  benefits: string[];
  color: string;
  current?: boolean;
  locked?: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'discount' | 'freebie' | 'exclusive';
  available: boolean;
  claimed?: boolean;
  expiryDate?: string;
}

interface Transaction {
  id: string;
  type: 'earned' | 'redeemed';
  description: string;
  points: number;
  date: string;
  reference?: string;
}

const WelcomeRewardsPage = () => {
  const navigate = useNavigate();
  const [userPoints] = useState(1250);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const currentTierIndex = 1; // Silver tier (0: Bronze, 1: Silver, 2: Gold, 3: Platinum)

  const rewardTiers: RewardTier[] = [
    {
      id: 'bronze',
      name: 'Bronze Member',
      icon: <Award className="h-5 w-5" />,
      minPoints: 0,
      maxPoints: 499,
      benefits: ['5% cashback', 'Free shipping on orders $50+', 'Birthday discount'],
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      locked: currentTierIndex < 0
    },
    {
      id: 'silver',
      name: 'Silver Member',
      icon: <Star className="h-5 w-5" />,
      minPoints: 500,
      maxPoints: 1499,
      benefits: ['10% cashback', 'Free shipping on orders $35+', 'Birthday discount', 'Early access to sales'],
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      current: currentTierIndex === 1
    },
    {
      id: 'gold',
      name: 'Gold Member',
      icon: <Trophy className="h-5 w-5" />,
      minPoints: 1500,
      maxPoints: 2999,
      benefits: ['15% cashback', 'Free shipping on all orders', 'Birthday discount', 'Early access to sales', 'Exclusive products'],
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      locked: currentTierIndex < 2
    },
    {
      id: 'platinum',
      name: 'Platinum Member',
      icon: <Crown className="h-5 w-5" />,
      minPoints: 3000,
      benefits: ['20% cashback', 'Free shipping on all orders', 'Birthday discount', 'Early access to sales', 'Exclusive products', 'Personal shopper'],
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      locked: currentTierIndex < 3
    }
  ];

  const availableRewards: Reward[] = [
    {
      id: '1',
      title: '10% Off Next Purchase',
      description: 'Get 10% discount on your next order',
      points: 100,
      category: 'discount',
      available: true
    },
    {
      id: '2',
      title: 'Free Shipping',
      description: 'Free shipping on your next order',
      points: 50,
      category: 'discount',
      available: true
    },
    {
      id: '3',
      title: 'Baby Bodysuit',
      description: 'Free baby bodysuit with any purchase over $50',
      points: 200,
      category: 'freebie',
      available: true
    },
    {
      id: '4',
      title: 'VIP Sale Access',
      description: 'Get early access to our next big sale',
      points: 150,
      category: 'exclusive',
      available: userPoints >= 1500,
      expiryDate: '2024-02-15'
    },
    {
      id: '5',
      title: 'Personalized Recommendations',
      description: 'Get personalized product recommendations',
      points: 300,
      category: 'exclusive',
      available: userPoints >= 1500
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'earned',
      description: 'Purchase completed',
      points: 50,
      date: '2024-01-20',
      reference: 'ORD-2024-001'
    },
    {
      id: '2',
      type: 'redeemed',
      description: '10% Off Reward',
      points: -100,
      date: '2024-01-18',
      reference: 'REW-10OFF'
    },
    {
      id: '3',
      type: 'earned',
      description: 'Welcome bonus',
      points: 100,
      date: '2024-01-15'
    },
    {
      id: '4',
      type: 'earned',
      description: 'Product review',
      points: 25,
      date: '2024-01-12'
    }
  ];

  const currentTier = rewardTiers[currentTierIndex];
  const nextTier = rewardTiers[currentTierIndex + 1];
  const progressToNext = nextTier 
    ? ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const handleClaimReward = (rewardId: string) => {
    setSelectedReward(rewardId);
    // Simulate claiming reward
    setTimeout(() => {
      setSelectedReward(null);
      alert('Reward claimed successfully!');
    }, 1000);
  };

  const getCategoryIcon = (category: Reward['category']) => {
    switch (category) {
      case 'discount': return <Percent className="h-4 w-4" />;
      case 'freebie': return <Gift className="h-4 w-4" />;
      case 'exclusive': return <Lock className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: Reward['category']) => {
    switch (category) {
      case 'discount': return 'bg-green-100 text-green-800';
      case 'freebie': return 'bg-blue-100 text-blue-800';
      case 'exclusive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-2xl font-bold">Welcome Rewards</h1>
          </div>

          {/* Current Status */}
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {currentTier.icon}
                    <h2 className="text-xl font-semibold text-purple-900">{currentTier.name}</h2>
                  </div>
                  <p className="text-3xl font-bold text-purple-900">{userPoints} Points</p>
                  <p className="text-sm text-purple-700 mt-1">
                    {nextTier ? `${nextTier.minPoints - userPoints} points to ${nextTier.name}` : 'Maximum tier reached!'}
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-16 w-16 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-purple-700">Member since Jan 2024</p>
                </div>
              </div>
              {nextTier && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-purple-700 mb-1">
                    <span>Progress to {nextTier.name}</span>
                    <span>{Math.round(progressToNext)}%</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reward Tiers */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Reward Tiers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewardTiers.map((tier) => (
                <Card 
                  key={tier.id} 
                  className={`${tier.color} ${tier.locked ? 'opacity-60' : ''} ${tier.current ? 'ring-2 ring-purple-400' : ''}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                      {tier.locked ? <Lock className="h-6 w-6" /> : tier.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{tier.name}</h3>
                    <p className="text-sm mb-3">
                      {tier.minPoints === 0 ? 'Start' : `${tier.minPoints} points`}
                      {tier.maxPoints && ` - ${tier.maxPoints} points`}
                    </p>
                    <div className="space-y-1">
                      {tier.benefits.slice(0, 2).map((benefit, index) => (
                        <p key={index} className="text-xs">{benefit}</p>
                      ))}
                    </div>
                    {tier.current && (
                      <Badge className="mt-2 bg-purple-600 text-white">Current</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Available Rewards */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
              <div className="space-y-4">
                {availableRewards.map((reward) => (
                  <Card key={reward.id} className={!reward.available ? 'opacity-60' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getCategoryColor(reward.category)}>
                              {getCategoryIcon(reward.category)}
                              {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                            </Badge>
                            {reward.expiryDate && (
                              <span className="text-xs text-muted-foreground">
                                Expires {new Date(reward.expiryDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold mb-1">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-semibold">{reward.points} points</span>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={!reward.available || userPoints < reward.points || selectedReward === reward.id}
                        >
                          {selectedReward === reward.id ? 'Claiming...' : 
                           !reward.available ? 'Locked' : 
                           userPoints < reward.points ? 'Not enough points' : 'Claim'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                            {transaction.reference && ` • ${transaction.reference}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="text-center">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* How to Earn */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">How to Earn Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Make a purchase</span>
                    <span className="text-sm font-semibold">1 point per $1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Write a review</span>
                    <span className="text-sm font-semibold">25 points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Refer a friend</span>
                    <span className="text-sm font-semibold">100 points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Birthday bonus</span>
                    <span className="text-sm font-semibold">50 points</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomeRewardsPage;
