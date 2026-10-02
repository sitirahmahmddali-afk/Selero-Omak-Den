export type CategoryType = 
  | 'Semua'
  | 'Gulai & Lauk'
  | 'Kuih Tradisional'
  | 'Sambal & Cecah'
  | 'Sarapan & Hidangan Perayaan'
  | 'Sayur & Kerabu';

export type DistrictType =
  | 'Semua'
  | 'Kuala Pilah'
  | 'Rembau'
  | 'Jelebu'
  | 'Seremban'
  | 'Tampin'
  | 'Jempol'
  | 'Port Dickson';

export type DifficultyType = 'Semua' | 'Mudah' | 'Sederhana' | 'Mahir';

export interface IngredientItem {
  name: string;
  amount: string;
  note?: string;
  isMain?: boolean;
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface Recipe {
  id: string;
  name: string;
  localName: string; // Dialect / local title
  category: 'Gulai & Lauk' | 'Kuih Tradisional' | 'Sambal & Cecah' | 'Sarapan & Hidangan Perayaan' | 'Sayur & Kerabu';
  district: 'Kuala Pilah' | 'Rembau' | 'Jelebu' | 'Seremban' | 'Tampin' | 'Jempol' | 'Port Dickson';
  description: string;
  story: string;
  image: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Mudah' | 'Sederhana' | 'Mahir';
  mainIngredients: string[];
  ingredients: IngredientItem[];
  steps: CookingStep[];
  oldFolksTips: string[];
  pairings: string[];
  quoteLoghat: string;
  tags: string[];
  source: string;
  isVerified: boolean;
  isHeirloom: boolean;
  isKuih?: boolean;
}

export interface DistrictInfo {
  id: string;
  name: DistrictType;
  title: string;
  nickname: string;
  description: string;
  culturalStory: string;
  specialties: string[];
  kuihSpecialties: string[];
  heritageSites: string[];
  recipeCount: number;
  accentColor: string;
}

export interface HeritageArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Adat & Budaya' | 'Dapur Pusaka' | 'Seni Memasak' | 'Kisah Tok';
  readTime: string;
  author: string;
  date: string;
  image: string;
  summary: string;
  content: string[];
  pullQuote: string;
  sourceRef: string;
}

export interface UserSubmittedRecipe {
  id: string;
  name: string;
  familyName: string;
  district: string;
  story: string;
  ingredients: string;
  steps: string;
  submittedAt: string;
  status: 'Dalam Semakan' | 'Diterima';
}
