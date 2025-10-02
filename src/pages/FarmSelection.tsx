import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tractor, MapPin, Leaf, Plus } from 'lucide-react';

const FarmSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    cropType: '',
    soilType: '',
  });

  // Mock existing farms in Kerala
  const existingFarms = [
    { id: '1', name: 'Backwater Farm', location: 'Alappuzha', size: 3, cropType: 'Rice' },
    { id: '2', name: 'Hill View Plantation', location: 'Wayanad', size: 5, cropType: 'Coffee' },
  ];

  const handleSelectFarm = (farmId: string) => {
    localStorage.setItem('currentFarm', farmId);
    toast.success('Farm selected successfully!');
    navigate('/dashboard');
  };

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.size || !formData.cropType || !formData.soilType) {
      toast.error('Please fill in all fields');
      return;
    }

    const newFarmId = Date.now().toString();
    localStorage.setItem('currentFarm', newFarmId);
    toast.success('Farm created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/10 p-4">
      <div className="max-w-4xl mx-auto pt-8 pb-20">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Select Your Farm</h1>
          <p className="text-muted-foreground">Choose an existing farm or create a new one to start your journey</p>
        </div>

        {!isCreating ? (
          <div className="space-y-6 animate-slide-up">
            <div className="grid gap-4">
              {existingFarms.map((farm) => (
                <Card
                  key={farm.id}
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary"
                  onClick={() => handleSelectFarm(farm.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                          <Tractor className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{farm.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {farm.location}
                            </span>
                            <span>{farm.size} acres</span>
                            <span className="flex items-center gap-1">
                              <Leaf className="w-3 h-3" />
                              {farm.cropType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Select</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-dashed hover:border-primary transition-all cursor-pointer" onClick={() => setIsCreating(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-3 py-8">
                  <Plus className="w-6 h-6 text-primary" />
                  <span className="text-lg font-medium text-primary">Create New Farm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Create New Farm</CardTitle>
              <CardDescription>Tell us about your farm to get personalized quests</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateFarm} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Farm Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Green Valley Farm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (District in Kerala)</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                      <SelectItem value="kollam">Kollam</SelectItem>
                      <SelectItem value="alappuzha">Alappuzha</SelectItem>
                      <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
                      <SelectItem value="kottayam">Kottayam</SelectItem>
                      <SelectItem value="idukki">Idukki</SelectItem>
                      <SelectItem value="ernakulam">Ernakulam</SelectItem>
                      <SelectItem value="thrissur">Thrissur</SelectItem>
                      <SelectItem value="palakkad">Palakkad</SelectItem>
                      <SelectItem value="malappuram">Malappuram</SelectItem>
                      <SelectItem value="kozhikode">Kozhikode</SelectItem>
                      <SelectItem value="wayanad">Wayanad</SelectItem>
                      <SelectItem value="kannur">Kannur</SelectItem>
                      <SelectItem value="kasaragod">Kasaragod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Farm Size (acres)</Label>
                  <Input
                    id="size"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType">Primary Crop</Label>
                  <Select value={formData.cropType} onValueChange={(value) => setFormData({ ...formData, cropType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice (Paddy)</SelectItem>
                      <SelectItem value="coconut">Coconut</SelectItem>
                      <SelectItem value="rubber">Rubber</SelectItem>
                      <SelectItem value="pepper">Pepper</SelectItem>
                      <SelectItem value="cardamom">Cardamom</SelectItem>
                      <SelectItem value="tapioca">Tapioca</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                      <SelectItem value="tea">Tea</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alluvial">Alluvial</SelectItem>
                      <SelectItem value="black">Black Soil</SelectItem>
                      <SelectItem value="red">Red Soil</SelectItem>
                      <SelectItem value="laterite">Laterite</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Farm
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmSelection;
