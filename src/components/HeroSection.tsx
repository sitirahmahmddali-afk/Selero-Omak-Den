import React from 'react';
import { ArrowRight, Compass, Sparkles, ChefHat } from 'lucide-react';

interface HeroSectionProps {
  onExploreRecipes: () => void;
  onExploreMap: () => void;
  onOpenPicker: () => void;
  totalRecipes: number;
  totalKuih: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreRecipes,
  onExploreMap,
  onOpenPicker,
  totalRecipes,
  totalKuih,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#1E1915] text-[#FAF7F2]">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/raso_hero_dapur_1790906658789.jpg"
          alt="Dapur kampung tradisional Negeri Sembilan"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/70 to-[#1A1612]/30" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-amber-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-3xl">
          
          {/* Subtle Editorial Kicker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6C687] font-medium mb-4">
            <span>Muzium Digital Masakan & Kuih Tradisional</span>
            <span aria-hidden="true">·</span>
            <span>Adat Perpatih & Minangkabau</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF7F2] leading-[1.08] mb-6">
            Selero Omak Den
          </h1>

          {/* Subheadline & Quote */}
          <p className="text-xl sm:text-2xl text-[#E8DFC8] font-serif italic mb-4 leading-snug">
            Resepi, Cerito & Warisan Raso Negeri Sembilan
          </p>

          <p className="text-base sm:text-lg text-[#C7BBA8] leading-relaxed mb-8 max-w-2xl font-normal">
            Dari dapur kayu kampung, salai sabut kelapa berbara, hingga rempah gulai kuning tanpa bawang. 
            Meneroka keaslian gastronomi sembilan luak turun-temurun ke generasi seterusnya.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={onExploreRecipes}
              className="px-6 py-3.5 bg-[#B33927] hover:bg-[#962F20] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Teroka Resepi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreMap}
              className="px-5 py-3.5 bg-[#2B231B]/90 hover:bg-[#3B3026] text-[#FAF7F2] text-sm font-medium rounded-lg border border-[#6E5B45]/40 hover:border-[#E6C687]/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#E6C687]" />
              <span>Jelajah Nogori</span>
            </button>

            <button
              onClick={onOpenPicker}
              className="px-5 py-3.5 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] text-sm font-medium rounded-lg backdrop-blur-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ChefHat className="w-4 h-4 text-amber-300" />
              <span>Apa Nak Masak Hari Ni?</span>
            </button>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="pt-8 border-t border-[#4A3D2F]/70 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C687] tabular-nums">
                {totalRecipes}
              </div>
              <div className="text-xs text-[#A89882] uppercase tracking-wider mt-0.5">
                Resepi Pusaka
              </div>
            </div>

            <div>
              <div className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C687] tabular-nums">
                {totalKuih}
              </div>
              <div className="text-xs text-[#A89882] uppercase tracking-wider mt-0.5">
                Kuih Tradisional
              </div>
            </div>

            <div>
              <div className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C687] tabular-nums">
                7
              </div>
              <div className="text-xs text-[#A89882] uppercase tracking-wider mt-0.5">
                Daerah & Luak
              </div>
            </div>

            <div>
              <div className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C687] tabular-nums">
                100%
              </div>
              <div className="text-xs text-[#A89882] uppercase tracking-wider mt-0.5">
                Citarasa Asli
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
