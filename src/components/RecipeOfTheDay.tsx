import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, Flame, Heart, ArrowUpRight, Sparkles } from 'lucide-react';

interface RecipeOfTheDayProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
}

export const RecipeOfTheDay: React.FC<RecipeOfTheDayProps> = ({
  recipe,
  onSelectRecipe,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <section className="py-12 bg-[#F3ECE0] border-b border-[#E3D7C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Pilihan Istimewa Hari Ini
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              Resepi Hari Ini
            </h2>
          </div>
          <p className="text-sm text-[#735D43] mt-2 sm:mt-0 font-serif italic">
            "Sedap nyo gulai, bukan pado bumbu banyak, tapi pado sabau mengacau santan."
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECFA9] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Visual Column */}
          <div className="relative lg:col-span-7 aspect-[4/3] lg:aspect-auto min-h-[300px] overflow-hidden bg-stone-900 group">
            <img
              src={recipe.image}
              alt={recipe.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
            
            {/* Overlay Dialect Quote for Mobile */}
            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-medium">Petua Tok Nogori</span>
              <p className="font-serif italic text-sm text-stone-100 mt-0.5">"{recipe.quoteLoghat}"</p>
            </div>

            {/* Favorite Action Pin */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe);
              }}
              className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-[#B33927] rounded-full shadow-md backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
              aria-label={isFavorite ? 'Buang daripada favourite' : 'Simpan ke favourite'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#B33927]' : ''}`} />
            </button>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Metadata without pills */}
              <div className="flex items-center gap-2 text-xs text-[#735D43] font-medium uppercase tracking-wider mb-2">
                <span>{recipe.district}</span>
                <span aria-hidden="true">·</span>
                <span>{recipe.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#B33927] font-semibold">Resepi Warisan</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B16] leading-snug mb-2">
                {recipe.name}
              </h3>

              <div className="text-sm font-serif italic text-[#8A4A32] mb-4">
                Nama Asli: "{recipe.localName}"
              </div>

              <p className="text-sm text-[#5C4D3C] leading-relaxed mb-6">
                {recipe.description}
              </p>

              {/* Dialect Quote Callout on Desktop */}
              <div className="hidden lg:block p-4 rounded-xl bg-[#F4EFE6] border-l-4 border-[#B33927] mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B33927] block mb-1">
                  Petua Orang Lama Nogori
                </span>
                <p className="font-serif italic text-sm text-[#382E22]">
                  "{recipe.quoteLoghat}"
                </p>
              </div>

              {/* Cooking Metrics */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#E8DFC8] mb-6 text-center">
                <div>
                  <div className="text-xs text-[#735D43]">Masa Masak</div>
                  <div className="text-sm font-semibold text-[#1F1B16] flex items-center justify-center gap-1 mt-0.5 tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-[#B33927]" />
                    <span>{recipe.cookTime} min</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#735D43]">Hidangan</div>
                  <div className="text-sm font-semibold text-[#1F1B16] flex items-center justify-center gap-1 mt-0.5 tabular-nums">
                    <Users className="w-3.5 h-3.5 text-[#B33927]" />
                    <span>{recipe.servings} org</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#735D43]">Tahap</div>
                  <div className="text-sm font-semibold text-[#1F1B16] flex items-center justify-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-[#B33927]" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onSelectRecipe(recipe)}
                className="flex-1 py-3 px-5 bg-[#B33927] hover:bg-[#962F20] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masak Resepi Ini</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleFavorite(recipe)}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer flex items-center justify-center ${
                  isFavorite
                    ? 'border-[#B33927] bg-[#B33927]/10 text-[#B33927]'
                    : 'border-[#DECFA9] hover:bg-[#EAE0D0] text-[#4A3E31]'
                }`}
                title="Simpan ke koleksi den"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#B33927]' : ''}`} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
