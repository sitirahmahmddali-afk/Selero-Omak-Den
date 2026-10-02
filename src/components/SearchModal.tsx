import React, { useState, useEffect, useRef } from 'react';
import { Recipe, HeritageArticle } from '../types';
import { Search, X, Clock, ArrowRight, BookOpen, Cookie, Flame } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  stories: HeritageArticle[];
  onSelectRecipe: (recipe: Recipe) => void;
  onSelectStory: (story: HeritageArticle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  recipes,
  stories,
  onSelectRecipe,
  onSelectStory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = searchTerm.trim().toLowerCase();

  const matchedRecipes = q
    ? recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.localName.toLowerCase().includes(q) ||
          r.district.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.mainIngredients.some((i) => i.toLowerCase().includes(q))
      ).slice(0, 6)
    : [];

  const matchedStories = q
    ? stories.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-[#DECFA9] shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#E8DFC8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#735D43] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari resepi, bahan (cili api, santan, daging salai), daerah, kuih..."
            className="w-full bg-transparent text-sm text-[#1F1B16] placeholder-[#8A7965] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#735D43] hover:text-[#1F1B16]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium text-[#735D43] hover:text-[#1F1B16] px-2 py-1 rounded bg-[#FAF7F2] border border-[#DDD0BC]"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {q ? (
            <>
              {/* Matched Recipes */}
              {matchedRecipes.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#735D43] mb-3">
                    Resepi & Kuih Ditemui ({matchedRecipes.length})
                  </div>
                  <div className="space-y-2">
                    {matchedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        onClick={() => {
                          onSelectRecipe(recipe);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-[#F3EDE2] rounded-xl border border-[#DECFA9] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-stone-900 overflow-hidden shrink-0">
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#1F1B16] truncate">
                              {recipe.name}
                            </div>
                            <div className="text-[11px] text-[#735D43]">
                              {recipe.district} · {recipe.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#B33927] font-medium shrink-0">
                          <span>{recipe.cookTime} min</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Stories */}
              {matchedStories.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#735D43] mb-3">
                    Cerita Warisan Ditemui ({matchedStories.length})
                  </div>
                  <div className="space-y-2">
                    {matchedStories.map((story) => (
                      <div
                        key={story.id}
                        onClick={() => {
                          onSelectStory(story);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-[#F3EDE2] rounded-xl border border-[#DECFA9] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <BookOpen className="w-5 h-5 text-[#B33927] shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#1F1B16] truncate">
                              {story.title}
                            </div>
                            <div className="text-[11px] text-[#735D43] truncate">
                              {story.summary}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B33927] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedRecipes.length === 0 && matchedStories.length === 0 && (
                <div className="text-center py-8 text-[#735D43]">
                  <p className="text-sm font-serif">Tiada padanan untuk "{searchTerm}".</p>
                  <p className="text-xs text-[#A89882] mt-1">Cuba kata kunci seperti "daging salai", "apam", "kuala pilah", atau "tempoyak".</p>
                </div>
              )}
            </>
          ) : (
            /* Quick Suggestions */
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#735D43] mb-3">
                Carian Pantas Popular
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Daging Salai',
                  'Masak Lemak Cili Api',
                  'Apam Johol',
                  'Kuih Sopang',
                  'Sambal Hitam',
                  'Tempoyak Jelebu',
                  'Kuala Pilah',
                  'Rembau',
                  'Pucuk Ubi',
                  'Gula Enau',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1.5 bg-white hover:bg-[#F3EDE2] border border-[#DDD0BC] text-xs font-medium text-[#4A3E31] rounded-lg transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
