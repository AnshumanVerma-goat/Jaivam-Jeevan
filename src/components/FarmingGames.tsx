import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Droplets, Bug, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const FarmingGames = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [matchingScore, setMatchingScore] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const quizQuestions = [
    {
      question: 'Which is the best time to water plants?',
      options: ['Early morning', 'Noon', 'Late evening', 'Night'],
      correct: 0,
    },
    {
      question: 'What does organic farming avoid?',
      options: ['Water', 'Sunlight', 'Chemical pesticides', 'Soil'],
      correct: 2,
    },
    {
      question: 'Which crop is good for Kerala soil?',
      options: ['Wheat', 'Rice', 'Barley', 'Corn'],
      correct: 1,
    },
  ];

  const matchingPairs = [
    { id: 1, text: 'Neem Oil', match: 5, icon: Bug, matched: false },
    { id: 2, text: 'Drip System', match: 6, icon: Droplets, matched: false },
    { id: 3, text: 'Compost', match: 7, icon: Leaf, matched: false },
    { id: 4, text: 'Crop Rotation', match: 8, icon: Leaf, matched: false },
    { id: 5, text: 'Pest Control', match: 1, icon: Bug, matched: false },
    { id: 6, text: 'Water Saving', match: 2, icon: Droplets, matched: false },
    { id: 7, text: 'Soil Health', match: 3, icon: Leaf, matched: false },
    { id: 8, text: 'Prevent Disease', match: 4, icon: Leaf, matched: false },
  ];

  const [cards, setCards] = useState(matchingPairs);

  const handleQuizAnswer = (answerIndex: number) => {
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 10);
      toast.success('Correct! +10 XP', { icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> });
    } else {
      toast.error('Wrong answer! Try again', { icon: <XCircle className="w-4 h-4 text-red-500" /> });
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 1000);
    } else {
      setTimeout(() => {
        toast.success(`Quiz completed! Total score: ${quizScore + (answerIndex === quizQuestions[currentQuestion].correct ? 10 : 0)} XP`);
        setCurrentQuestion(0);
        setQuizScore(0);
      }, 1000);
    }
  };

  const handleCardClick = (cardId: number) => {
    const clickedCard = cards.find(c => c.id === cardId);
    if (clickedCard?.matched) return;

    if (selectedCard === null) {
      setSelectedCard(cardId);
    } else {
      const firstCard = cards.find(c => c.id === selectedCard);
      const secondCard = cards.find(c => c.id === cardId);

      if (firstCard?.match === cardId || secondCard?.match === selectedCard) {
        setCards(prev =>
          prev.map(c =>
            c.id === selectedCard || c.id === cardId ? { ...c, matched: true } : c
          )
        );
        setMatchingScore(prev => prev + 20);
        toast.success('Match found! +20 XP', { icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> });
      } else {
        toast.error('Not a match! Try again');
      }
      setSelectedCard(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Farming Games</CardTitle>
          <CardDescription>Learn sustainable farming through fun games</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quiz">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quiz">Knowledge Quiz</TabsTrigger>
              <TabsTrigger value="matching">Match Game</TabsTrigger>
            </TabsList>

            <TabsContent value="quiz" className="space-y-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </p>
                <p className="text-sm font-bold text-primary">Score: {quizScore} XP</p>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 text-lg">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  <div className="grid gap-2">
                    {quizQuestions[currentQuestion].options.map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => handleQuizAnswer(idx)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matching" className="space-y-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">Match the farming practices</p>
                <p className="text-sm font-bold text-primary">Score: {matchingScore} XP</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <Button
                      key={card.id}
                      variant={card.matched ? 'default' : selectedCard === card.id ? 'secondary' : 'outline'}
                      className={`h-24 flex-col gap-2 ${card.matched ? 'opacity-50' : ''}`}
                      onClick={() => handleCardClick(card.id)}
                      disabled={card.matched}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs">{card.text}</span>
                    </Button>
                  );
                })}
              </div>

              {cards.every(c => c.matched) && (
                <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-bold text-lg">Congratulations! 🎉</p>
                    <p className="text-sm opacity-90">All matches found! Total: {matchingScore} XP</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmingGames;
