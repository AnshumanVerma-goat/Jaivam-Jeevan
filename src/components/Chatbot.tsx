import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const predefinedQA = {
  en: [
    { q: 'What is organic farming?', a: 'Organic farming is a method that relies on natural processes, avoiding synthetic chemicals and GMOs. It focuses on soil health, biodiversity, and ecological balance.' },
    { q: 'How can I improve soil health?', a: 'You can improve soil health by using compost, practicing crop rotation, avoiding over-tilling, and adding organic matter regularly.' },
    { q: 'What are the benefits of drip irrigation?', a: 'Drip irrigation saves water (up to 60%), reduces weed growth, prevents soil erosion, and delivers nutrients directly to plant roots.' },
    { q: 'How do I control pests naturally?', a: 'Use neem oil, companion planting, introduce beneficial insects, maintain plant health, and practice crop rotation.' },
    { q: 'What is crop rotation?', a: 'Crop rotation is planting different crops in the same area across seasons to improve soil health, reduce pests, and increase yields.' },
  ],
  ml: [
    { q: 'ഓർഗാനിക് കൃഷി എന്താണ്?', a: 'കൃത്രിമ രാസവസ്തുക്കളും ജിഎംഒകളും ഒഴിവാക്കി പ്രകൃതിദത്ത പ്രക്രിയകളെ ആശ്രയിക്കുന്ന ഒരു കൃഷിരീതിയാണ് ഓർഗാനിക് കൃഷി.' },
    { q: 'മണ്ണിന്റെ ആരോഗ്യം എങ്ങനെ മെച്ചപ്പെടുത്താം?', a: 'കമ്പോസ്റ്റ് ഉപയോഗിച്ചും, വിള മാറ്റിക്കൊണ്ടും, അമിത ഉഴൽ ഒഴിവാക്കിയും ജൈവവസ്തുക്കൾ ചേർത്തും മണ്ണിന്റെ ആരോഗ്യം മെച്ചപ്പെടുത്താം.' },
    { q: 'തുള്ളി നനയ്ക്കൽ സംവിധാനത്തിന്റെ പ്രയോജനങ്ങൾ?', a: 'വെള്ളം ലാഭിക്കുന്നു (60% വരെ), കളകളുടെ വളർച്ച കുറയ്ക്കുന്നു, മണ്ണൊലിപ്പ് തടയുന്നു, പോഷകങ്ങൾ നേരിട്ട് വേരുകളിലേക്ക് എത്തിക്കുന്നു.' },
    { q: 'പ്രകൃതിദത്തമായി കീടങ്ങളെ നിയന്ത്രിക്കാം?', a: 'വേപ്പെണ്ണ ഉപയോഗിക്കുക, സഹചാരിത്വ കൃഷി, ഗുണകരമായ പ്രാണികളെ കൊണ്ടുവരിക, ചെടികളുടെ ആരോഗ്യം നിലനിർത്തുക.' },
    { q: 'വിള മാറ്റിക്കൃഷി എന്താണ്?', a: 'മണ്ണിന്റെ ആരോഗ്യം മെച്ചപ്പെടുത്താനും കീടങ്ങൾ കുറയ്ക്കാനും വിളവ് വർദ്ധിപ്പിക്കാനും വിവിധ സീസണുകളിൽ വ്യത്യസ്ത വിളകൾ കൃഷി ചെയ്യുന്നതാണ്.' },
  ],
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I\'m your farming assistant. How can I help you today?', isBot: true },
  ]);
  const { language } = useLanguage();

  const handleQuestionClick = (question: string, answer: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: question, isBot: false },
      { id: (Date.now() + 1).toString(), text: answer, isBot: true },
    ]);
  };

  const currentQA = predefinedQA[language];

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl animate-pulse-glow z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-lg">Farm Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4 space-y-2">
              <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
              <div className="space-y-2">
                {currentQA.slice(0, 3).map((qa, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full text-xs h-auto py-2 text-left justify-start"
                    onClick={() => handleQuestionClick(qa.q, qa.a)}
                  >
                    {qa.q}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
