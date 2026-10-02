import React from 'react';
import { Recipe } from '../types';
import { Cookie, Sparkles, Heart, Clock, ArrowUpRight, Leaf } from 'lucide-react';

interface KuihCollectionProps {
  kuihList: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (recipe: Recipe) => void;
}

export const KuihCollection: React.FC<KuihCollectionProps> = ({
  kuihList,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Khazanah Manisan & Pemanis Mulut
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              "Manih-Manih Nogori"
            </h2>
          </div>
          <p className="text-sm text-[#735D43] mt-2 md:mt-0 font-normal max-w-md">
            Keistimewaan kuih-muih Negeri Sembilan terletak pada kemanisan santan kelapa sawit/kelapa tua, pekatnya nira gula enau, dan haruman balutan daun rambai serta daun pisang hutan.
          </p>
        </div>

        {/* Traditional Wrapping Foliage Banner */}
        <div className="bg-[#F4EFE6] rounded-2xl p-5 border border-[#E0D5C1] mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center shrink-0 text-[#2D5A27]">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2D5A27]">
                Warisan Seni Balutan Daun Hutan
              </div>
              <p className="text-xs text-[#5C4D3C] mt-0.5">
                Daun Rambai (Apam Johol) · Daun Pisang Hutan (Kuih Koci & Lopes) · Daun Pandan Wangi (Kuih Cara)
              </p>
            </div>
          </div>
          <div className="text-xs text-[#735D43] font-serif italic text-right hidden lg:block">
            "Balutan daun bukan sekadar sarung, ia memberi bau wangi yang meresap ke dalam tepung."
          </div>
        </div>

        {/* Kuih Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {kuihList.map((kuih) => {
            const isFav = favorites.includes(kuih.id);
            return (
              <div
                key={kuih.id}
                onClick={() => onSelectRecipe(kuih)}
                className="bg-white rounded-2xl border border-[#DECFA9] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                    <img
                      src={kuih.image}
                      alt={kuih.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-serif italic text-xs text-stone-100 line-clamp-1">
                        "{kuih.quoteLoghat}"
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(kuih);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#B33927] rounded-full shadow-sm backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
                      aria-label="Simpan favourite"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B33927]' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#735D43] font-medium uppercase tracking-wider mb-2">
                      <span>{kuih.district}</span>
                      <span aria-hidden="true">·</span>
                      <span>Manisan Tradisi</span>
                      {kuih.isHeirloom && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#B33927] font-semibold">Resepi Tok</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1F1B16] group-hover:text-[#B33927] transition-colors leading-snug mb-1">
                      {kuih.name}
                    </h3>

                    <div className="text-xs font-serif italic text-[#8A4A32] mb-3">
                      "{kuih.localName}"
                    </div>

                    <p className="text-xs text-[#5C4D3C] line-clamp-2 leading-relaxed mb-4">
                      {kuih.description}
                    </p>

                    <div className="text-[11px] text-[#735D43]">
                      <span className="font-semibold text-[#1F1B16]">Bahan utama: </span>
                      {kuih.mainIngredients.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="px-5 sm:px-6 py-3.5 bg-[#FAF7F2] border-t border-[#EFE8DC] flex items-center justify-between text-xs text-[#5C4D3C]">
                  <span className="flex items-center gap-1 tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-[#B33927]" />
                    {kuih.cookTime} minit
                  </span>

                  <span className="flex items-center gap-1 font-semibold text-[#B33927] group-hover:translate-x-0.5 transition-transform">
                    <span>Lihat Cara Buat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
