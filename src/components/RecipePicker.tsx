import React, { useState, useMemo } from 'react';
import { Recipe } from '../types';
import { ChefHat, Check, Sparkles, ArrowRight, RefreshCw, Flame } from 'lucide-react';

interface RecipePickerProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const COMMON_PANTRY_ITEMS = [
  'Daging Salai',
  'Santan',
  'Cili Api',
  'Kunyit Hidup',
  'Daun Kunyit',
  'Tempoyak',
  'Ikan Patin',
  'Telur Itik',
  'Pucuk Ubi',
  'Rebung',
  'Belimbing Buluh',
  'Petai',
  'Ikan Bilis',
  'Ikan Sembilang',
  'Daun Kaduk',
  'Gula Enau',
  'Beras Pulut',
  'Pisang',
  'Tepung Gandum',
];

export const RecipePicker: React.FC<RecipePickerProps> = ({
  recipes,
  onSelectRecipe,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Daging Salai',
    'Santan',
    'Cili Api',
  ]);

  const toggleIngredient = (item: string) => {
    if (selectedIngredients.includes(item)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== item));
    } else {
      setSelectedIngredients([...selectedIngredients, item]);
    }
  };

  const handleClear = () => {
    setSelectedIngredients([]);
  };

  // Match algorithm
  const matches = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    return recipes
      .map((recipe) => {
        // Collect all ingredient names & main ingredients lowercase
        const allRecipeItems = [
          ...recipe.mainIngredients,
          ...recipe.ingredients.map((i) => i.name),
        ].map((s) => s.toLowerCase());

        let matchCount = 0;
        selectedIngredients.forEach((sel) => {
          const selLower = sel.toLowerCase();
          const found = allRecipeItems.some((item) => item.includes(selLower));
          if (found) matchCount++;
        });

        const score = Math.round((matchCount / Math.max(recipe.mainIngredients.length, 3)) * 100);
        return {
          recipe,
          matchCount,
          score: Math.min(100, score),
        };
      })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount || b.score - a.score)
      .slice(0, 4);
  }, [recipes, selectedIngredients]);

  // Dynamic dialect encouragement
  const dialectAdvice = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return 'Pilih apo barang yang ado dalam dapu atau peti ais kau dulu, baru den tolong cari!';
    }
    if (matches.length > 0) {
      const topMatch = matches[0];
      if (topMatch.matchCount >= 3) {
        return `Apo laie, bahan dah cukuik bona ni! Jom kito buek "${topMatch.recipe.name}". Bau sampai ke laman rumah!`;
      }
      return `Bolehlah ni! Ado sipi-sipi nak jadi "${topMatch.recipe.name}". Tambah sikit garam ngan asam keping, sodap!`;
    }
    return 'Alahai, bahan ni jarang-jarang digandingkan. Cuba tambah santan ngan cili api kampung sikit!';
  }, [selectedIngredients, matches]);

  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-2">
            <ChefHat className="w-4 h-4" />
            <span>Pencari Resepi Pintar Dapur Nogori</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16] mb-3">
            "Apo Nak Masak Hari Ni?"
          </h2>
          <p className="text-sm sm:text-base text-[#5C4D3C] font-normal">
            Pilih bahan mentah yang ada di dapur anda, dan sistem kami akan memadankan resipi kampung Negeri Sembilan yang paling serasi.
          </p>
        </div>

        {/* Interactive Ingredient Selector */}
        <div className="bg-[#F4EFE6] rounded-2xl p-6 sm:p-8 border border-[#E0D5C1] shadow-sm mb-8">
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#735D43]">
              Pilih Bahan Yang Anda Ada ({selectedIngredients.length} Dipilih):
            </div>
            {selectedIngredients.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs font-medium text-[#B33927] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Kosongkan Pilihan</span>
              </button>
            )}
          </div>

          {/* Ingredient Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {COMMON_PANTRY_ITEMS.map((item) => {
              const isSelected = selectedIngredients.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleIngredient(item)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#B33927] text-white shadow-sm font-semibold'
                      : 'bg-white hover:bg-[#EAE2D2] text-[#4A3E31] border border-[#DDD0BC]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>

          {/* Nogori Dialect Commentary Bubble */}
          <div className="p-4 rounded-xl bg-white border border-[#E3D7C1] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF3E8] flex items-center justify-center shrink-0 border border-[#DECFA9]">
              <Sparkles className="w-4 h-4 text-[#B33927]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#8C2D19] uppercase tracking-wider mb-0.5">
                Suara Tok Dapur:
              </div>
              <p className="font-serif italic text-sm text-[#2E251B]">
                "{dialectAdvice}"
              </p>
            </div>
          </div>

        </div>

        {/* Results Showcase */}
        {matches.length > 0 ? (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-4">
              Cadangan Resepi Paling Sepadan ({matches.length} Ditemui):
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {matches.map(({ recipe, matchCount, score }) => (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe)}
                  className="bg-white rounded-xl border border-[#DECFA9] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Match Score & District */}
                    <div className="flex items-center justify-between text-xs text-[#735D43] mb-2 font-medium">
                      <span>{recipe.district}</span>
                      <span className="text-[#B33927] font-semibold tabular-nums">
                        {score}% Cocok
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#1F1B16] group-hover:text-[#B33927] transition-colors leading-snug mb-1">
                      {recipe.name}
                    </h4>

                    <div className="text-xs text-[#8A4A32] font-serif italic mb-3">
                      "{recipe.localName}"
                    </div>

                    <p className="text-xs text-[#5C4D3C] line-clamp-2 leading-relaxed mb-4">
                      {recipe.description}
                    </p>

                    <div className="text-[11px] text-[#735D43] font-medium">
                      <span className="font-semibold text-[#1F1B16]">{matchCount} bahan</span> sepadan dengan pilihan anda.
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EFE8DC] flex items-center justify-between text-xs font-medium text-[#B33927]">
                    <span>Lihat Resepi & Sukatan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl border border-[#E3D7C1] p-6">
            <Flame className="w-8 h-8 text-[#A89882] mx-auto mb-2" />
            <div className="font-serif text-base font-semibold text-[#1F1B16] mb-1">
              Tiada Resepi Sepadan Buat Masa Ini
            </div>
            <p className="text-xs text-[#735D43]">
              Cuba pilih bahan utama asas Negeri Sembilan seperti Santan, Cili Api, atau Daging Salai.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
