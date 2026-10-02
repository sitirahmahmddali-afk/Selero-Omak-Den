import React, { useState } from 'react';
import { Recipe } from '../types';
import { 
  X, 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  CheckSquare, 
  Square, 
  Volume2, 
  Sparkles, 
  Check, 
  ChefHat, 
  BookmarkCheck,
  Utensils
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!recipe) return null;

  // Servings state
  const [currentServings, setCurrentServings] = useState<number>(recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isPlayingQuote, setIsPlayingQuote] = useState(false);

  const servingMultiplier = currentServings / (recipe.servings || 4);

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleStepComplete = (stepNum: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  // Play quote in browser using SpeechSynthesis if available
  const playSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(recipe.quoteLoghat);
      utterance.lang = 'ms-MY';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingQuote(true);
      utterance.onend = () => setIsPlayingQuote(false);
      utterance.onerror = () => setIsPlayingQuote(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Petua Tok Nogori: "${recipe.quoteLoghat}"`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-4xl rounded-2xl border border-[#DECFA9] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Sticky Action Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8DFC8] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#735D43]">
            <span className="font-semibold text-[#B33927]">{recipe.district}</span>
            <span>·</span>
            <span>{recipe.category}</span>
            {recipe.isHeirloom && (
              <>
                <span>·</span>
                <span className="font-semibold text-[#8C2D19]">Resepi Warisan</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(recipe)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isFavorite
                  ? 'border-[#B33927] bg-[#B33927]/10 text-[#B33927]'
                  : 'border-[#DECFA9] hover:bg-[#F4EFE6] text-[#4A3E31]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#B33927]' : ''}`} />
              <span className="hidden sm:inline">
                {isFavorite ? 'Disimpan Den' : 'Simpan Resepi'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#735D43] hover:text-[#1F1B16] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup tetingkap resepi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* Hero Visual & Title */}
          <div>
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-900 border border-[#DECFA9] shadow-inner mb-6">
              <img
                src={recipe.image}
                alt={recipe.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {recipe.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase font-semibold tracking-wider bg-black/50 backdrop-blur-xs text-amber-200 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                  {recipe.name}
                </h1>
                <div className="font-serif italic text-sm sm:text-base text-amber-200 mt-1">
                  "{recipe.localName}"
                </div>
              </div>
            </div>

            {/* Dialect Voice Quote Bar */}
            <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#DECFA9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#B33927] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C2D19]">
                    Loghat & Petua Tok Orang Lama:
                  </div>
                  <p className="font-serif italic text-sm text-[#2E251B] mt-0.5">
                    "{recipe.quoteLoghat}"
                  </p>
                </div>
              </div>

              <button
                onClick={playSpeech}
                className="self-start sm:self-auto px-3 py-1.5 text-xs font-medium text-[#1F1B16] bg-white hover:bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Volume2 className={`w-3.5 h-3.5 text-[#B33927] ${isPlayingQuote ? 'animate-bounce' : ''}`} />
                <span>{isPlayingQuote ? 'Mendengar...' : 'Dengar Loghat'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-xl border border-[#DECFA9] text-center">
            <div>
              <div className="text-xs text-[#735D43]">Masa Penyediaan</div>
              <div className="text-sm font-semibold text-[#1F1B16] tabular-nums mt-0.5">
                {recipe.prepTime} minit
              </div>
            </div>

            <div>
              <div className="text-xs text-[#735D43]">Masa Memasak</div>
              <div className="text-sm font-semibold text-[#1F1B16] flex items-center justify-center gap-1 tabular-nums mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#B33927]" />
                <span>{recipe.cookTime} minit</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-[#735D43]">Tahap Kesukaran</div>
              <div className="text-sm font-semibold text-[#1F1B16] flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 text-[#B33927]" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-[#735D43]">Jumlah Hidangan</div>
              <div className="flex items-center justify-center gap-2 mt-0.5">
                {[2, 4, 8].map((s) => (
                  <button
                    key={s}
                    onClick={() => setCurrentServings(s)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors cursor-pointer ${
                      currentServings === s
                        ? 'bg-[#B33927] text-white font-bold'
                        : 'bg-[#FAF7F2] text-[#4A3E31] hover:bg-[#EAE0D0]'
                    }`}
                  >
                    {s} org
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cerita Di Sebalik Hidangan */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#1F1B16] flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-[#B33927]" />
              <span>Cerita Di Sebalik Hidangan</span>
            </h3>
            <p className="text-sm text-[#4A3E31] leading-relaxed font-normal">
              {recipe.story}
            </p>
          </div>

          {/* Two-Column: Left (Ingredients Checklist) & Right (Cooking Timeline) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Ingredients */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#DECFA9] shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F2ECE1]">
                <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                  Bahan-Bahan ({currentServings} Orang)
                </h3>
                <span className="text-[11px] text-[#735D43]">Tanda bila siap</span>
              </div>

              <div className="space-y-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[ing.name];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredientCheck(ing.name)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors cursor-pointer select-none ${
                        isChecked ? 'bg-[#FAF7F2] text-[#8A7965] line-through' : 'hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0 text-[#B33927]">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4 text-[#A89882]" />
                        )}
                      </button>
                      <div className="text-xs flex-1">
                        <span className={`font-semibold ${isChecked ? 'text-[#8A7965]' : 'text-[#1F1B16]'}`}>
                          {ing.amount}
                        </span>{' '}
                        <span>{ing.name}</span>
                        {ing.note && (
                          <span className="block text-[10px] text-[#735D43] italic mt-0.5">
                            ({ing.note})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Padanan Hidangan Callout */}
              {recipe.pairings && recipe.pairings.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#F2ECE1]">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#735D43] mb-1.5 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#B33927]" />
                    <span>Padanan Hidangan Sempurna:</span>
                  </div>
                  <ul className="text-xs text-[#4A3E31] space-y-1 list-disc pl-4 marker:text-[#B33927]">
                    {recipe.pairings.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Step-by-Step Timeline */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DECFA9]">
                <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                  Langkah Memasak Turun-Temurun
                </h3>
                <span className="text-[11px] text-[#735D43]">
                  {Object.values(completedSteps).filter(Boolean).length} / {recipe.steps.length} Selesai
                </span>
              </div>

              <div className="space-y-4">
                {recipe.steps.map((step) => {
                  const isDone = !!completedSteps[step.stepNumber];
                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => toggleStepComplete(step.stepNumber)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isDone
                          ? 'bg-[#FAF7F2] border-[#DECFA9] opacity-70'
                          : 'bg-white border-[#DECFA9] hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#FAF3E8] border border-[#DECFA9] text-[#B33927] text-xs font-bold flex items-center justify-center tabular-nums">
                            0{step.stepNumber}
                          </span>
                          <span className="font-serif font-bold text-sm text-[#1F1B16]">
                            {step.title}
                          </span>
                        </div>

                        <button className="text-xs font-medium text-[#735D43] flex items-center gap-1">
                          {isDone ? (
                            <span className="text-[#2D5A27] flex items-center gap-1 font-semibold">
                              <Check className="w-3.5 h-3.5" /> Siap
                            </span>
                          ) : (
                            <span>Tanda siap</span>
                          )}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4A3E31] leading-relaxed pl-8">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-2.5 ml-8 p-2.5 rounded-lg bg-[#FAF7F2] border-l-2 border-[#C4820A] text-[11px] text-[#5C4D3C] italic font-serif">
                          <strong>Petua Tok:</strong> {step.tip}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tip Orang Lama Box */}
              {recipe.oldFolksTips && recipe.oldFolksTips.length > 0 && (
                <div className="p-5 rounded-xl bg-[#F4EFE6] border-l-4 border-[#B33927] space-y-2 mt-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B33927] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Petua & Pantang Larang Dapur Orang Lama</span>
                  </div>
                  <ul className="text-xs text-[#382E22] space-y-1.5 pl-4 list-disc marker:text-[#B33927]">
                    {recipe.oldFolksTips.map((tip, i) => (
                      <li key={i} className="leading-relaxed font-serif italic">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Footer Provenance Note */}
          <div className="pt-6 border-t border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#735D43]">
            <div>
              <span className="font-semibold text-[#1F1B16]">Sumber Rekod Warisan: </span>
              <span className="italic">{recipe.source}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#2D5A27] font-semibold">
              <BookmarkCheck className="w-4 h-4" />
              <span>Disahkan Asli Kulinari Negeri Sembilan</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Close Bar */}
        <div className="p-4 bg-white border-t border-[#E8DFC8] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#735D43] italic">
            "Semoga masakan ini mengeratkan silaturahim sesama keluarga di rumah."
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#1F1B16] hover:bg-[#382E22] rounded-lg transition-colors cursor-pointer"
          >
            Selesai Memasak
          </button>
        </div>

      </div>
    </div>
  );
};
