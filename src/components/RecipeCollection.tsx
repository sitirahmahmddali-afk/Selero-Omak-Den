import React, { useState, useMemo } from 'react';
import { Recipe, CategoryType, DistrictType, DifficultyType } from '../types';
import { 
  Search, 
  Filter, 
  Heart, 
  Clock, 
  Users, 
  Flame, 
  LayoutGrid, 
  List, 
  X, 
  ArrowUpRight,
  RotateCcw
} from 'lucide-react';

interface RecipeCollectionProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (recipe: Recipe) => void;
  initialDistrictFilter?: string;
  initialCategoryFilter?: string;
}

export const RecipeCollection: React.FC<RecipeCollectionProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  initialDistrictFilter = 'Semua',
  initialCategoryFilter = 'Semua',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    (initialCategoryFilter as CategoryType) || 'Semua'
  );
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictType>(
    (initialDistrictFilter as DistrictType) || 'Semua'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyType>('Semua');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'popular' | 'time' | 'name'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: CategoryType[] = [
    'Semua',
    'Gulai & Lauk',
    'Kuih Tradisional',
    'Sambal & Cecah',
    'Sarapan & Hidangan Perayaan',
    'Sayur & Kerabu',
  ];

  const districts: DistrictType[] = [
    'Semua',
    'Kuala Pilah',
    'Rembau',
    'Jelebu',
    'Seremban',
    'Tampin',
    'Jempol',
    'Port Dickson',
  ];

  const difficulties: DifficultyType[] = ['Semua', 'Mudah', 'Sederhana', 'Mahir'];

  // Filter & Search Logic
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = recipe.name.toLowerCase().includes(q);
        const inLocalName = recipe.localName.toLowerCase().includes(q);
        const inDistrict = recipe.district.toLowerCase().includes(q);
        const inDesc = recipe.description.toLowerCase().includes(q);
        const inIngredients = recipe.mainIngredients.some((i) => i.toLowerCase().includes(q));
        if (!inName && !inLocalName && !inDistrict && !inDesc && !inIngredients) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'Semua' && recipe.category !== selectedCategory) {
        return false;
      }

      // District
      if (selectedDistrict !== 'Semua' && recipe.district !== selectedDistrict) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'Semua' && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      // Time Range
      if (selectedTimeRange === 'fast' && recipe.cookTime > 30) return false;
      if (selectedTimeRange === 'medium' && (recipe.cookTime <= 30 || recipe.cookTime > 60)) return false;
      if (selectedTimeRange === 'slow' && recipe.cookTime <= 60) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'time') {
        return a.cookTime - b.cookTime;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default 'popular' (heirloom first, then verified)
      return (b.isHeirloom ? 1 : 0) - (a.isHeirloom ? 1 : 0);
    });
  }, [
    recipes,
    searchQuery,
    selectedCategory,
    selectedDistrict,
    selectedDifficulty,
    selectedTimeRange,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setSelectedDistrict('Semua');
    setSelectedDifficulty('Semua');
    setSelectedTimeRange('Semua');
    setSortBy('popular');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'Semua' ||
    selectedDistrict !== 'Semua' ||
    selectedDifficulty !== 'Semua' ||
    selectedTimeRange !== 'Semua';

  return (
    <section className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8DFC8]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Koleksi Kulinari Warisan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              Koleksi Resepi Nogori
            </h2>
          </div>
          <div className="text-sm text-[#735D43] mt-2 md:mt-0 font-medium">
            Memaparkan <span className="font-bold text-[#1F1B16] tabular-nums">{filteredRecipes.length}</span> daripada {recipes.length} hidangan
          </div>
        </div>

        {/* Search & Main Filter Bar */}
        <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs mb-8 space-y-4">
          
          {/* Top Row: Search Input & View Toggle & Reset */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#735D43]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari resepi, bahan (cili api, santan, rebung), atau daerah..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl text-sm text-[#1F1B16] placeholder-[#8A7965] focus:outline-none focus:border-[#B33927] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#735D43] hover:text-[#1F1B16]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'time' | 'name')}
                className="px-3 py-2.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl text-xs font-medium text-[#4A3E31] focus:outline-none focus:border-[#B33927] cursor-pointer"
              >
                <option value="popular">Paling Popular & Warisan</option>
                <option value="time">Masa Memasak Terpantas</option>
                <option value="name">Nama Resepi (A - Z)</option>
              </select>

              <div className="hidden sm:flex items-center bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-[#B33927] shadow-xs' : 'text-[#735D43]'
                  }`}
                  title="Paparan Kad Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-[#B33927] shadow-xs' : 'text-[#735D43]'
                  }`}
                  title="Paparan Senarai"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 text-xs font-medium text-[#B33927] bg-[#B33927]/10 hover:bg-[#B33927]/20 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Set semula semua penapis"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Set Semula</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="pt-2 border-t border-[#F2ECE1]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#B33927] text-white shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#4A3E31] hover:bg-[#F0E6D2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Dropdowns: District, Difficulty, Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* District Filter */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Daerah / Luak
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value as DistrictType)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'Semua' ? 'Semua Daerah' : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Tahap Kesukaran
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyType)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === 'Semua' ? 'Semua Tahap' : diff}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Filter */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Masa Memasak
              </label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
              >
                <option value="Semua">Semua Masa</option>
                <option value="fast">Pantas (&le; 30 minit)</option>
                <option value="medium">Sederhana (31 - 60 minit)</option>
                <option value="slow">Perlahan / Tradisi (&gt; 60 minit)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Recipe Grid / List */}
        {filteredRecipes.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredRecipes.map((recipe) => {
                const isFav = favorites.includes(recipe.id);
                return (
                  <div
                    key={recipe.id}
                    onClick={() => onSelectRecipe(recipe)}
                    className="bg-white rounded-2xl border border-[#DECFA9] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Area */}
                      <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Dialect quote badge bottom of image */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <p className="font-serif italic text-xs text-stone-100 line-clamp-1">
                            "{recipe.quoteLoghat}"
                          </p>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(recipe);
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#B33927] rounded-full shadow-sm backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
                          aria-label={isFav ? 'Buang daripada favourite' : 'Simpan ke favourite'}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B33927]' : ''}`} />
                        </button>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 sm:p-6">
                        {/* Zero-pill metadata */}
                        <div className="flex items-center gap-1.5 text-xs text-[#735D43] font-medium uppercase tracking-wider mb-2">
                          <span>{recipe.district}</span>
                          <span aria-hidden="true">·</span>
                          <span>{recipe.category}</span>
                          {recipe.isHeirloom && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#B33927] font-semibold">Resepi Tok</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#1F1B16] group-hover:text-[#B33927] transition-colors leading-snug mb-1">
                          {recipe.name}
                        </h3>

                        <div className="text-xs font-serif italic text-[#8A4A32] mb-3">
                          "{recipe.localName}"
                        </div>

                        <p className="text-xs sm:text-sm text-[#5C4D3C] line-clamp-2 leading-relaxed mb-4">
                          {recipe.description}
                        </p>

                        {/* Main ingredients summary */}
                        <div className="text-[11px] text-[#735D43] mb-4">
                          <span className="font-semibold text-[#1F1B16]">Bahan utama: </span>
                          {recipe.mainIngredients.slice(0, 4).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Metrics */}
                    <div className="px-5 sm:px-6 py-3.5 bg-[#FAF7F2] border-t border-[#EFE8DC] flex items-center justify-between text-xs text-[#5C4D3C]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-medium tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#B33927]" />
                          {recipe.cookTime} min
                        </span>
                        <span className="flex items-center gap-1 font-medium tabular-nums">
                          <Users className="w-3.5 h-3.5 text-[#B33927]" />
                          {recipe.servings} org
                        </span>
                      </div>

                      <div className="flex items-center gap-1 font-medium text-[#1F1B16]">
                        <Flame className="w-3.5 h-3.5 text-[#B33927]" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* List Mode */
            <div className="space-y-3">
              {filteredRecipes.map((recipe) => {
                const isFav = favorites.includes(recipe.id);
                return (
                  <div
                    key={recipe.id}
                    onClick={() => onSelectRecipe(recipe)}
                    className="bg-white rounded-xl border border-[#DECFA9] p-4 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-stone-900 overflow-hidden shrink-0">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#735D43]">
                          <span>{recipe.district}</span>
                          <span>·</span>
                          <span>{recipe.category}</span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#1F1B16] group-hover:text-[#B33927] transition-colors">
                          {recipe.name}
                        </h4>
                        <div className="text-xs font-serif italic text-[#8A4A32]">
                          "{recipe.localName}"
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 text-xs text-[#5C4D3C] pt-2 sm:pt-0 border-t sm:border-0 border-[#EFE8DC]">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#B33927]" />
                          {recipe.cookTime} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-[#B33927]" />
                          {recipe.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(recipe);
                          }}
                          className="p-2 text-[#B33927] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B33927]' : ''}`} />
                        </button>
                        <ArrowUpRight className="w-4 h-4 text-[#735D43] group-hover:text-[#B33927] transition-colors" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-[#DECFA9] p-12 text-center max-w-lg mx-auto">
            <Search className="w-10 h-10 text-[#A89882] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1F1B16] mb-1">
              Tiada Resepi Ditemui
            </h3>
            <p className="text-xs text-[#735D43] mb-6">
              Cuba kurangkan penapis atau gunakan kata carian lain seperti "daging salai", "apam", atau "tempoyak".
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#B33927] hover:bg-[#962F20] rounded-lg transition-colors cursor-pointer"
            >
              Set Semula Semua Penapis
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
