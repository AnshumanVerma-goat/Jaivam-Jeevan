import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Target, Award, TrendingUp, Droplets, Bug, Leaf, 
  Sparkles, LogOut, Menu, User, ChevronRight,
  Calendar, Flame, Gamepad2, Languages
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import Chatbot from '@/components/Chatbot';
import FarmingGames from '@/components/FarmingGames';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [activeQuests, setActiveQuests] = useState([
    {
      id: '1',
      title: 'Soil Health Check',
      description: 'Test your soil pH and nutrient levels',
      category: 'soil',
      difficulty: 'easy',
      xp: 50,
      duration: '2 days',
      progress: 60,
      icon: Leaf,
    },
    {
      id: '2',
      title: 'Water Conservation',
      description: 'Implement drip irrigation in one section',
      category: 'water',
      difficulty: 'medium',
      xp: 100,
      duration: '5 days',
      progress: 30,
      icon: Droplets,
    },
    {
      id: '3',
      title: 'Organic Pest Control',
      description: 'Use neem-based pesticide instead of chemicals',
      category: 'pest',
      difficulty: 'medium',
      xp: 80,
      duration: '3 days',
      progress: 0,
      icon: Bug,
    },
  ]);

  const stats = {
    sustainabilityScore: 785,
    totalXP: 2450,
    questsCompleted: 12,
    badgesEarned: 5,
    rank: 47,
    streak: 7,
  };

  const recentBadges = [
    { id: '1', name: 'Water Warrior', icon: '💧', earned: true },
    { id: '2', name: 'Soil Savior', icon: '🌱', earned: true },
    { id: '3', name: 'Eco Champion', icon: '🏆', earned: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleStartQuest = (questId: string) => {
    const updatedQuests = activeQuests.map(q => 
      q.id === questId ? { ...q, progress: Math.min(q.progress + 20, 100) } : q
    );
    setActiveQuests(updatedQuests);
  };

  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-700 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    hard: 'bg-red-500/10 text-red-700 border-red-500/20',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Jaivam Jeevan</h1>
              <p className="text-xs text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="px-2 mb-4">
                  <p className="text-sm font-medium mb-2">Language / ഭാഷ</p>
                  <div className="flex gap-2">
                    <Button
                      variant={language === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage('en')}
                      className="flex-1"
                    >
                      English
                    </Button>
                    <Button
                      variant={language === 'ml' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage('ml')}
                      className="flex-1"
                    >
                      മലയാളം
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/farm-selection')}>
                  <Target className="w-4 h-4 mr-2" />
                  Change Farm
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="p-4 pb-24 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in">
          <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-0">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Score</p>
                  <p className="text-2xl font-bold">{stats.sustainabilityScore}</p>
                </div>
                <Trophy className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-accent text-primary-foreground border-0">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Rank</p>
                  <p className="text-2xl font-bold">#{stats.rank}</p>
                </div>
                <TrendingUp className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-xl font-bold flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {stats.streak} days
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-xl font-bold">{stats.badgesEarned}</p>
                </div>
                <Award className="w-6 h-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Badges */}
        <Card className="mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50"
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <p className="text-xs font-medium text-center">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="quests" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quests">{t('quests')}</TabsTrigger>
            <TabsTrigger value="games">{t('games')}</TabsTrigger>
            <TabsTrigger value="leaderboard">{t('leaderboard')}</TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-4 mt-4">
            {activeQuests.map((quest) => {
              const IconComponent = quest.icon;
              return (
                <Card key={quest.id} className="hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold">{quest.title}</h3>
                            <Badge variant="outline" className={difficultyColors[quest.difficulty]}>
                              {quest.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>+{quest.xp} XP</span>
                            <span>•</span>
                            <span>{quest.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{quest.progress}%</span>
                        </div>
                        <Progress value={quest.progress} className="h-2" />
                      </div>

                      <Button 
                        onClick={() => handleStartQuest(quest.id)} 
                        className="w-full"
                        disabled={quest.progress === 100}
                      >
                        {quest.progress === 100 ? 'Completed' : quest.progress > 0 ? 'Continue' : 'Start Quest'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="games" className="mt-4">
            <FarmingGames />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Top Farmers
                </CardTitle>
                <CardDescription>Regional leaderboard for your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Rajesh Kumar', score: 1250, badges: 12, isTop: true },
                    { rank: 2, name: 'Priya Patel', score: 1180, badges: 10, isTop: true },
                    { rank: 3, name: 'Amit Singh', score: 1050, badges: 9, isTop: true },
                    { rank: 47, name: user?.name || 'You', score: stats.sustainabilityScore, badges: stats.badgesEarned, isCurrentUser: true },
                  ].map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        entry.isCurrentUser ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        entry.isTop ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground' : 'bg-muted'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.badges} badges earned</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{entry.score}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Assistant Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
