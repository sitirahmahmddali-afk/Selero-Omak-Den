import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Menu, 
  X, 
  Music, 
  PlusCircle, 
  Sparkles,
  Compass,
  UtensilsCrossed,
  BookOpen,
  BarChart3,
  Cookie,
  SlidersHorizontal,
  ArrowLeft
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenSubmitRecipe: () => void;
  onToggleAudio: () => void;
  isPlayingAudio: boolean;
  isCMSActive: boolean;
  onToggleCMS: () => void;
  pendingSubmissionsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenSearch,
  onOpenSubmitRecipe,
  onToggleAudio,
  isPlayingAudio,
  isCMSActive,
  onToggleCMS,
  pendingSubmissionsCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Utama' },
    { id: 'resepi', label: 'Koleksi Resepi' },
    { id: 'kuih', label: 'Kuih-Muih' },
    { id: 'peta', label: 'Jelajah Nogori' },
    { id: 'picker', label: 'Apa Nak Masak?' },
    { id: 'cerita', label: 'Cerito Warisan' },
    { id: 'statistik', label: 'Statistik' },
    { id: 'favourite', label: 'Resepi Den' },
  ];

  const handleNavClick = (id: string) => {
    if (isCMSActive) {
      onToggleCMS();
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#1F1B16] group-hover:text-[#B33927] transition-colors">
                Selero Omak Den
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A3E31]">
            {navItems.map((item) => {
              const isActive = !isCMSActive && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 transition-colors cursor-pointer text-sm tracking-wide ${
                    isActive
                      ? 'text-[#B33927] font-semibold'
                      : 'text-[#5C4D3C] hover:text-[#1F1B16]'
                  }`}
                >
                  {item.label}
                  {item.id === 'favourite' && favoritesCount > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center text-[10px] font-bold text-white bg-[#B33927] rounded-full w-4 h-4">
                      {favoritesCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B33927] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick search button */}
            {!isCMSActive && (
              <button
                onClick={onOpenSearch}
                className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-[#4A3E31] bg-[#F3EDE2] hover:bg-[#EAE0D0] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                title="Cari resepi atau bahan"
                aria-label="Cari resepi"
              >
                <Search className="w-4 h-4 text-[#735D43]" />
                <span className="hidden sm:inline">Cari...</span>
              </button>
            )}

            {/* Audio Ambience Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#B33927] text-white shadow-sm'
                  : 'bg-[#F3EDE2] text-[#4A3E31] hover:bg-[#EAE0D0]'
              }`}
              title="Pasang alunan Suasana Nogori"
              aria-label="Toggle Suasana Nogori"
            >
              <Music className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              <span className="hidden md:inline">
                {isPlayingAudio ? 'Muzik Meriah On 🎵' : 'Alunan Meriah'}
              </span>
            </button>

            {/* CMS / Admin Portal Management Button */}
            <button
              onClick={onToggleCMS}
              className={`relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isCMSActive
                  ? 'bg-[#B33927] text-white shadow-sm ring-2 ring-[#B33927]/30'
                  : 'bg-[#171310] text-[#E6C687] hover:bg-[#251E17] border border-[#DECFA9]/40'
              }`}
              title="Buka CMS untuk urus sendiri kandungan portal"
            >
              {isCMSActive ? (
                <>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Portal</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span className="hidden sm:inline">Urus Portal (CMS)</span>
                  <span className="sm:hidden">CMS</span>
                  {pendingSubmissionsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-900 text-[10px] font-bold flex items-center justify-center">
                      {pendingSubmissionsCount}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Propose / Heirloom Recipe Action */}
            {!isCMSActive && (
              <button
                onClick={onOpenSubmitRecipe}
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#1F1B16] hover:bg-[#382E22] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Tambah Resepi Tok</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A3E31] hover:text-[#1F1B16] rounded-md focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFC8] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                !isCMSActive && activeTab === item.id
                  ? 'bg-[#F3EDE2] text-[#B33927] font-semibold'
                  : 'text-[#4A3E31] hover:bg-[#F3EDE2]'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'favourite' && favoritesCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#B33927] text-white font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E8DFC8] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleCMS();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-[#E6C687] bg-[#171310] rounded-lg flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E6C687]" />
              <span>{isCMSActive ? 'Kembali ke Paparan Portal' : 'Buka Panel Pengurusan CMS'}</span>
            </button>

            {!isCMSActive && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSubmitRecipe();
                }}
                className="w-full py-2.5 px-4 text-xs font-medium text-center text-white bg-[#B33927] rounded-lg"
              >
                + Tambah Resepi Tok
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
