import React from 'react';
import { Heart, Sparkles, BookOpen, Compass, ShieldCheck, SlidersHorizontal } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenSubmit: () => void;
  onOpenCMS?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubmit, onOpenCMS }) => {
  return (
    <footer className="bg-[#171310] text-[#E8DFC8] border-t border-[#382E22] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2E251B]">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
              Selero Omak Den
            </div>
            
            <p className="font-serif italic text-base text-[#E6C687]">
              "Menjago raso. Menjago cerito. Menjago warisan."
            </p>

            <p className="text-xs sm:text-sm text-[#A89882] leading-relaxed max-w-sm">
              Muzium digital interaktif gastronomi Negeri Sembilan. Didokumentasikan untuk memelihara warisan kulinari Minangkabau dan Adat Perpatih agar kekal hidup di lidah generasi muda.
            </p>

            <div className="pt-2 text-xs text-[#735D43] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B33927]" />
              <span>Inisiatif Pemuliharaan Warisan Budaya Komuniti</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E6C687]">
              Penerokaan
            </div>
            <ul className="space-y-2 text-xs text-[#C7BBA8]">
              <li>
                <button
                  onClick={() => onNavigate('resepi')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Koleksi Resepi Tradisi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kuih')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Manih-Manih Nogori (Kuih-Muih)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('peta')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Jelajah 7 Daerah & Luak
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('picker')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Apa Nak Masak Hari Ni?
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cerita')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cerito Dapur & Adat Perpatih
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('statistik')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard Data Warisan
                </button>
              </li>
              {onOpenCMS && (
                <li className="pt-2">
                  <button
                    onClick={onOpenCMS}
                    className="text-[#E6C687] hover:text-white transition-colors cursor-pointer font-semibold flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Panel Pengurusan CMS</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Sources & Contribution */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E6C687]">
              Rujukan & Komuniti
            </div>
            <p className="text-xs text-[#A89882] leading-relaxed">
              Resipi dan amalan masakan dikumpulkan daripada temubual tokoh warisan kampung, penyelidikan Lembaga Muzium Negeri Sembilan, dan catatan resipi pusaka Ibu Soko.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onOpenSubmit}
                className="px-4 py-2.5 bg-[#2E251B] hover:bg-[#3D3123] border border-[#DECFA9]/20 text-[#FAF7F2] text-xs font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>Cadangkan Resepi Keluarga Anda</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#735D43]">
          <div>
            &copy; {new Date().getFullYear()} Selero Omak Den. Koleksi Digital Warisan Masakan Negeri Sembilan.
          </div>
          <div className="flex items-center gap-1 text-[#A89882]">
            <span>Dibina dengan rasa cinta untuk masakan kampung</span>
            <Heart className="w-3.5 h-3.5 text-[#B33927] fill-[#B33927] inline ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
};
