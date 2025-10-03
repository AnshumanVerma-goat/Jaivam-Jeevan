import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Target, Award, TrendingUp, Droplets, Sprout, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/10">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-3xl mb-6 animate-pulse-glow">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            Jaivam Jeevan
          </h1>
          
          <p className="text-xl text-muted-foreground mb-3">
            Gamified Platform for Sustainable Farming
          </p>
          
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Transform your farming practices into an exciting journey. Complete quests, earn badges, 
            and climb the leaderboard while making your farm more sustainable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Get Started
              <Sprout className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="hover:shadow-xl transition-all border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Quests</h3>
                <p className="text-muted-foreground">
                  Get customized farming missions based on your crop type, location, and farm size. 
                  Each quest is designed to improve your sustainability.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Complete quests to earn XP, unlock badges, and increase your sustainability score. 
                  Track your progress with beautiful dashboards.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compete & Learn</h3>
                <p className="text-muted-foreground">
                  Join the regional leaderboard and compete with fellow farmers. 
                  Share best practices and grow together as a community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Water Conservation</h3>
                <p className="text-sm text-muted-foreground">
                  Learn and implement efficient irrigation techniques to save water and reduce costs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Organic Practices</h3>
                <p className="text-sm text-muted-foreground">
                  Transition to sustainable, chemical-free farming with guided missions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sprout className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Soil Health</h3>
                <p className="text-sm text-muted-foreground">
                  Improve soil quality and biodiversity for long-term farm productivity.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other farmers, share knowledge, and grow together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Sustainable Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of farmers who are transforming their practices and increasing their sustainability scores.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12"
            onClick={() => navigate('/auth')}
          >
            Join Now - It's Free
            <Leaf className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Jaivam Jeevan - Empowering Sustainable Agriculture</p>
          <p className="mt-2">Smart India Hackathon 2025 | Team CloudX Chasers</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
