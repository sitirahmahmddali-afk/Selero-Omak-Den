import React, { useState } from 'react';
import { Recipe } from '../types';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Flame, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  UtensilsCrossed, 
  Cookie,
  Heart
} from 'lucide-react';

interface HeritageDashboardProps {
  recipes: Recipe[];
  favoritesCount: number;
  onFilterCategory?: (category: string) => void;
  onFilterDistrict?: (district: string) => void;
}

export const HeritageDashboard: React.FC<HeritageDashboardProps> = ({
  recipes,
  favoritesCount,
  onFilterCategory,
  onFilterDistrict,
}) => {
  const [activeDonutSegment, setActiveDonutSegment] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Aggregations
  const totalRecipes = recipes.length;
  const totalKuih = recipes.filter((r) => r.category === 'Kuih Tradisional').length;
  const totalDishes = recipes.filter((r) => r.category !== 'Kuih Tradisional').length;

  // Category counts
  const categoryCounts: Record<string, number> = {};
  recipes.forEach((r) => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat,
    count,
    percentage: Math.round((count / totalRecipes) * 100),
  }));

  // District counts
  const districtCounts: Record<string, number> = {
    'Kuala Pilah': 0,
    'Rembau': 0,
    'Jelebu': 0,
    'Seremban': 0,
    'Tampin': 0,
    'Jempol': 0,
    'Port Dickson': 0,
  };
  recipes.forEach((r) => {
    if (districtCounts[r.district] !== undefined) {
      districtCounts[r.district]++;
    }
  });

  const districtData = Object.entries(districtCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Ingredient Frequency
  const ingredientCounts: Record<string, number> = {
    'Cili Api Kampung': 18,
    'Santan Kelapa Segar': 17,
    'Kunyit Hidup': 14,
    'Daun Kunyit': 11,
    'Gula Enau Kuala Pilah': 9,
    'Tempoyak Durian': 7,
    'Asam Keping Gelugur': 8,
    'Daging Salai': 5,
  };

  const ingredientData = Object.entries(ingredientCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Difficulty counts
  const difficultyCounts = {
    'Mudah': recipes.filter((r) => r.difficulty === 'Mudah').length,
    'Sederhana': recipes.filter((r) => r.difficulty === 'Sederhana').length,
    'Mahir': recipes.filter((r) => r.difficulty === 'Mahir').length,
  };

  // Palette for charts
  const categoryColors: Record<string, string> = {
    'Gulai & Lauk': '#B33927',
    'Kuih Tradisional': '#C4820A',
    'Sambal & Cecah': '#8C2D19',
    'Sarapan & Hidangan Perayaan': '#2D5A27',
    'Sayur & Kerabu': '#4A6B35',
  };

  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Data & Analitik Warisan Makanan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              Dashboard Gastronomi Nogori
            </h2>
          </div>
          <p className="text-sm text-[#735D43] mt-2 md:mt-0 font-normal max-w-md">
            Statistik dan taburan resipi, kuih tradisional, pecahan daerah, serta kekerapan penggunaan ramuan asli Negeri Sembilan.
          </p>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          
          <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between text-[#735D43] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Jumlah Resepi</span>
              <BookOpen className="w-4 h-4 text-[#B33927]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1F1B16] tabular-nums">
              {totalRecipes}
            </div>
            <div className="text-[11px] text-[#735D43] mt-1 font-medium">
              12 Lauk & Gulai · 10 Kuih
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between text-[#735D43] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Kuih Warisan</span>
              <Cookie className="w-4 h-4 text-[#C4820A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1F1B16] tabular-nums">
              {totalKuih}
            </div>
            <div className="text-[11px] text-[#735D43] mt-1 font-medium">
              Pemanis mulut kampung
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between text-[#735D43] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Luak & Daerah</span>
              <MapPin className="w-4 h-4 text-[#2D5A27]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1F1B16] tabular-nums">
              7
            </div>
            <div className="text-[11px] text-[#735D43] mt-1 font-medium">
              Kuala Pilah peneraju resepi
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between text-[#735D43] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Bahan Asli</span>
              <Sparkles className="w-4 h-4 text-[#8C2D19]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1F1B16] tabular-nums">
              86
            </div>
            <div className="text-[11px] text-[#735D43] mt-1 font-medium">
              Cili api & santan mendahului
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-[#735D43] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Disimpan Den</span>
              <Heart className="w-4 h-4 text-[#B33927]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#B33927] tabular-nums">
              {favoritesCount}
            </div>
            <div className="text-[11px] text-[#735D43] mt-1 font-medium">
              Koleksi peribadi anda
            </div>
          </div>

        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Chart 1: Donut Chart - Categories */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F2ECE1]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                  Pecahan Mengikut Kategori
                </h3>
                <span className="text-xs text-[#735D43]">Klik pada mana-mana kategori untuk menapis</span>
              </div>
              <PieIcon className="w-4 h-4 text-[#735D43]" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* SVG Donut Visual */}
              <div className="relative w-44 h-44 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {(() => {
                    let cumulative = 0;
                    return categoryData.map((cat, idx) => {
                      const color = categoryColors[cat.name] || '#8C2D19';
                      const strokeDash = `${cat.percentage} ${100 - cat.percentage}`;
                      const strokeOffset = -cumulative;
                      cumulative += cat.percentage;
                      const isHovered = activeDonutSegment === cat.name;

                      return (
                        <circle
                          key={cat.name}
                          cx="50"
                          cy="50"
                          r="35"
                          fill="transparent"
                          stroke={color}
                          strokeWidth={isHovered ? "14" : "12"}
                          strokeDasharray={strokeDash}
                          strokeDashoffset={strokeOffset}
                          pathLength="100"
                          className="transition-all duration-300 cursor-pointer"
                          onMouseEnter={() => setActiveDonutSegment(cat.name)}
                          onMouseLeave={() => setActiveDonutSegment(null)}
                          onClick={() => onFilterCategory && onFilterCategory(cat.name)}
                        />
                      );
                    });
                  })()}
                </svg>
                {/* Donut Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs text-[#735D43] font-medium">Jumlah</span>
                  <span className="font-serif text-2xl font-bold text-[#1F1B16] tabular-nums">
                    {totalRecipes}
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 space-y-2 w-full">
                {categoryData.map((cat) => {
                  const color = categoryColors[cat.name] || '#8C2D19';
                  const isHovered = activeDonutSegment === cat.name;
                  return (
                    <div
                      key={cat.name}
                      onMouseEnter={() => setActiveDonutSegment(cat.name)}
                      onMouseLeave={() => setActiveDonutSegment(null)}
                      onClick={() => onFilterCategory && onFilterCategory(cat.name)}
                      className={`flex items-center justify-between text-xs p-2 rounded-lg transition-colors cursor-pointer ${
                        isHovered ? 'bg-[#FAF7F2] font-semibold' : 'hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[#1F1B16] truncate max-w-[170px]">{cat.name}</span>
                      </div>
                      <div className="text-[#735D43] tabular-nums">
                        <span className="font-bold text-[#1F1B16]">{cat.count}</span> ({cat.percentage}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart 2: Vertical Bar Chart - Districts */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F2ECE1]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                  Taburan Resepi Mengikut Daerah
                </h3>
                <span className="text-xs text-[#735D43]">Jumlah resipi unik yang direkodkan</span>
              </div>
              <BarChart3 className="w-4 h-4 text-[#735D43]" />
            </div>

            <div className="h-52 flex items-end justify-between gap-3 pt-4 px-2">
              {districtData.map((d) => {
                const maxCount = Math.max(...districtData.map((x) => x.count), 1);
                const heightPercent = Math.round((d.count / maxCount) * 100);
                const isHovered = hoveredBar === d.name;

                return (
                  <div
                    key={d.name}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(d.name)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => onFilterDistrict && onFilterDistrict(d.name)}
                  >
                    <span className="text-[11px] font-bold text-[#1F1B16] mb-1 tabular-nums">
                      {d.count}
                    </span>
                    <div className="w-full max-w-[32px] bg-[#F2ECE1] rounded-t-md h-full flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#B33927] group-hover:bg-[#8C2D19] rounded-t-md transition-all duration-300"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#735D43] group-hover:text-[#1F1B16] font-medium mt-2 truncate max-w-[42px] text-center">
                      {d.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Row 2: Horizontal Bar Chart (Ingredients) & Difficulty Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart 3: Horizontal Bar Chart - Top Ingredients */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#F2ECE1]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                  Kekerapan Penggunaan Bahan Asli
                </h3>
                <span className="text-xs text-[#735D43]">Ramuan utama yang membentuk profil rasa Negeri Sembilan</span>
              </div>
            </div>

            <div className="space-y-3">
              {ingredientData.map((item) => {
                const maxIng = Math.max(...ingredientData.map((x) => x.count));
                const widthPercent = Math.round((item.count / maxIng) * 100);

                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#1F1B16] font-medium">
                      <span>{item.name}</span>
                      <span className="text-[#735D43] tabular-nums font-semibold">
                        {item.count} hidangan
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#EBE4D5]">
                      <div
                        className="h-full bg-gradient-to-r from-[#B33927] to-[#E6C687] rounded-full"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 4: Difficulty Breakdown */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#DECFA9] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#F2ECE1]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                    Tahap Kesukaran
                  </h3>
                  <span className="text-xs text-[#735D43]">Klasifikasi kemahiran memasak</span>
                </div>
                <Flame className="w-4 h-4 text-[#B33927]" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-[#2D5A27]">Mudah (Pemula)</span>
                    <span className="font-bold tabular-nums text-[#1F1B16]">
                      {difficultyCounts['Mudah']} Resepi
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2D5A27] rounded-full"
                      style={{ width: `${(difficultyCounts['Mudah'] / totalRecipes) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-[#C4820A]">Sederhana (Mahir Kampung)</span>
                    <span className="font-bold tabular-nums text-[#1F1B16]">
                      {difficultyCounts['Sederhana']} Resepi
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C4820A] rounded-full"
                      style={{ width: `${(difficultyCounts['Sederhana'] / totalRecipes) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-[#B33927]">Mahir (Kawah Kenduri / Salai)</span>
                    <span className="font-bold tabular-nums text-[#1F1B16]">
                      {difficultyCounts['Mahir']} Resepi
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B33927] rounded-full"
                      style={{ width: `${(difficultyCounts['Mahir'] / totalRecipes) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#DECFA9] text-xs text-[#5C4D3C] font-serif italic">
              "Resepi tahap mahir seperti Sambal Daun Kayu dan Rendang Minang Tok memerlukan kesabaran mengacau kawah hingga berjam-jam lamanya."
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
