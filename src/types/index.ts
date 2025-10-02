export interface User {
  id: string;
  email: string;
  name: string;
  currentFarmId?: string;
}

export interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  size: number;
  cropType: string;
  soilType: string;
  createdAt: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'soil' | 'water' | 'pest' | 'organic' | 'biodiversity';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  duration: string;
  completed: boolean;
  progress: number;
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
  category: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  score: number;
  badges: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

export interface FarmerStats {
  sustainabilityScore: number;
  totalXP: number;
  questsCompleted: number;
  badgesEarned: number;
  rank: number;
  streak: number;
}
