import React from 'react';
import { Recipe } from '../types';
import { Heart, Clock, Users, Flame, ArrowRight, UtensilsCrossed } from 'lucide-react';

interface FavoritesViewProps {
  favoriteRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onRemoveFavorite: (recipe: Recipe) => void;
  onExploreRecipes: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteRecipes,
  onSelectRecipe,
  onRemoveFavorite,
  onExploreRecipes,
}) => {
  return (
    <section className="py-14 bg-[#FAF7F2] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Koleksi Peribadi Dapur Anda
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              "Resepi Den Gemar"
            </h2>
          </div>
          <div className="text-sm text-[#735D43] mt-2 md:mt-0 font-medium">
            <span className="font-bold text-[#1F1B16] tabular-nums">{favoriteRecipes.length}</span> hidangan disimpan
          </div>
        </div>

        {favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {favoriteRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="bg-white rounded-2xl border border-[#DECFA9] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(recipe);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#B33927] rounded-full shadow-sm backdrop-blur-sm cursor-pointer"
                      title="Keluarkan dari senarai gemar"
                    >
                      <Heart className="w-4 h-4 fill-[#B33927]" />
                    </button>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#735D43] font-medium uppercase tracking-wider mb-2">
                      <span>{recipe.district}</span>
                      <span aria-hidden="true">·</span>
                      <span>{recipe.category}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1F1B16] group-hover:text-[#B33927] transition-colors leading-snug mb-1">
                      {recipe.name}
                    </h3>

                    <div className="text-xs font-serif italic text-[#8A4A32] mb-3">
                      "{recipe.localName}"
                    </div>

                    <p className="text-xs text-[#5C4D3C] line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-3.5 bg-[#FAF7F2] border-t border-[#EFE8DC] flex items-center justify-between text-xs text-[#5C4D3C]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#B33927]" />
                      {recipe.cookTime} min
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Users className="w-3.5 h-3.5 text-[#B33927]" />
                      {recipe.servings} org
                    </span>
                  </div>

                  <span className="font-semibold text-[#B33927] flex items-center gap-1">
                    <span>Masak Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#DECFA9] p-12 text-center max-w-md mx-auto my-8">
            <Heart className="w-12 h-12 text-[#DECFA9] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1F1B16] mb-1">
              Koleksi Den Masih Kosong
            </h3>
            <p className="text-xs text-[#735D43] leading-relaxed mb-6">
              Tekan lambang hati <Heart className="w-3.5 h-3.5 inline text-[#B33927] fill-[#B33927]" /> pada mana-mana resepi atau kuih tradisional untuk menyimpannya ke dalam koleksi kegemaran anda.
            </p>
            <button
              onClick={onExploreRecipes}
              className="px-5 py-2.5 bg-[#B33927] hover:bg-[#962F20] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Teroka Resepi Nogori
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
