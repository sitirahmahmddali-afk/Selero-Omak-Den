import React, { useState } from 'react';
import { DISTRICTS_DATA } from '../data/districts';
import { DistrictInfo } from '../types';
import { MapPin, Utensils, Sparkles, ArrowRight, Landmark } from 'lucide-react';

interface InteractiveMapProps {
  onFilterByDistrict: (districtName: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onFilterByDistrict,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(DISTRICTS_DATA[0]);
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);

  // SVG coordinates and custom polygon shapes simulating Negeri Sembilan's geography
  // Jelebu in the north, Seremban west-central, Kuala Pilah central-east, Jempol far-east,
  // Port Dickson south-west coast, Rembau south-central, Tampin south-east border.
  const districtShapes = [
    {
      id: 'jelebu',
      name: 'Jelebu',
      path: 'M 180,40 L 320,50 L 360,130 L 290,190 L 190,150 L 140,90 Z',
      labelX: 240,
      labelY: 110,
    },
    {
      id: 'seremban',
      name: 'Seremban',
      path: 'M 100,140 L 190,150 L 220,220 L 140,260 L 90,200 Z',
      labelX: 145,
      labelY: 195,
    },
    {
      id: 'port-dickson',
      name: 'Port Dickson',
      path: 'M 50,220 L 140,260 L 150,330 L 80,360 L 40,280 Z',
      labelX: 95,
      labelY: 295,
    },
    {
      id: 'kuala-pilah',
      name: 'Kuala Pilah',
      path: 'M 220,200 L 290,190 L 340,260 L 290,320 L 210,290 Z',
      labelX: 265,
      labelY: 255,
    },
    {
      id: 'jempol',
      name: 'Jempol',
      path: 'M 320,50 L 440,80 L 470,220 L 370,270 L 340,260 L 360,130 Z',
      labelX: 400,
      labelY: 170,
    },
    {
      id: 'rembau',
      name: 'Rembau',
      path: 'M 160,280 L 210,290 L 230,360 L 170,380 L 140,320 Z',
      labelX: 185,
      labelY: 335,
    },
    {
      id: 'tampin',
      name: 'Tampin',
      path: 'M 230,330 L 290,320 L 370,270 L 340,390 L 250,400 Z',
      labelX: 295,
      labelY: 360,
    },
  ];

  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Peta Gastronomi & Luak Beradat
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              Jelajah Nogori
            </h2>
          </div>
          <p className="text-sm text-[#735D43] mt-2 md:mt-0 font-normal max-w-md">
            Klik pada mana-mana daerah untuk meneroka kepakaran kulinari, kuih tradisi, dan cerita budaya Adat Perpatih.
          </p>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SVG Map Canvas */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#735D43] mb-3">
              <span className="font-semibold uppercase tracking-wider">Peta 7 Daerah Negeri Sembilan</span>
              <span className="italic">Sentuh kawasan untuk memilih</span>
            </div>

            <div className="relative aspect-[4/3] w-full bg-[#FAF7F2] rounded-xl border border-[#EBE4D5] overflow-hidden flex items-center justify-center p-2">
              
              {/* Subtle background compass / grid lines */}
              <div className="absolute top-3 right-3 text-[10px] text-[#A89882] font-mono tracking-widest uppercase">
                UTARA ↑
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] text-[#A89882] font-mono tracking-widest uppercase">
                SELAT MELAKA ∿
              </div>

              <svg
                viewBox="0 0 520 440"
                className="w-full h-full max-h-[420px] select-none"
              >
                {/* Coastline indication */}
                <path
                  d="M 20,200 Q 60,300 90,420"
                  fill="none"
                  stroke="#CAD2C5"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {districtShapes.map((shape) => {
                  const districtData = DISTRICTS_DATA.find((d) => d.id === shape.id);
                  const isSelected = selectedDistrict.id === shape.id;
                  const isHovered = hoveredDistrictId === shape.id;

                  return (
                    <g key={shape.id} className="cursor-pointer">
                      <path
                        d={shape.path}
                        onClick={() => districtData && setSelectedDistrict(districtData)}
                        onMouseEnter={() => setHoveredDistrictId(shape.id)}
                        onMouseLeave={() => setHoveredDistrictId(null)}
                        className="transition-all duration-200"
                        fill={
                          isSelected
                            ? '#B33927'
                            : isHovered
                            ? '#E6C687'
                            : '#F0E6D2'
                        }
                        stroke={isSelected ? '#7D2214' : '#C4B59D'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                      />
                      {/* Label */}
                      <text
                        x={shape.labelX}
                        y={shape.labelY}
                        textAnchor="middle"
                        pointerEvents="none"
                        className={`text-[11px] font-medium transition-colors select-none ${
                          isSelected
                            ? 'fill-white font-bold'
                            : isHovered
                            ? 'fill-[#1F1B16] font-semibold'
                            : 'fill-[#5C4D3C]'
                        }`}
                      >
                        {shape.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick District Selector Buttons */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#E8DFC8]">
              {DISTRICTS_DATA.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    selectedDistrict.id === d.id
                      ? 'bg-[#B33927] text-white shadow-xs'
                      : 'bg-[#F3EDE2] text-[#4A3E31] hover:bg-[#EAE0D0]'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* District Details Showcase */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#DECFA9] shadow-xs">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Profil Daerah & Gastronomi</span>
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#1F1B16] mb-1">
              {selectedDistrict.name}
            </h3>

            <div className="text-sm font-serif italic text-[#8A4A32] mb-4">
              "{selectedDistrict.nickname}"
            </div>

            <p className="text-sm text-[#5C4D3C] leading-relaxed mb-6 pb-6 border-b border-[#EFE8DC]">
              {selectedDistrict.culturalStory}
            </p>

            {/* Specialties Grid */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#735D43] flex items-center gap-1.5 mb-2">
                  <Utensils className="w-3.5 h-3.5 text-[#B33927]" />
                  <span>Lauk & Gulai Terkenal:</span>
                </div>
                <ul className="text-xs text-[#2E251B] space-y-1 pl-4 list-disc marker:text-[#B33927]">
                  {selectedDistrict.specialties.map((item, idx) => (
                    <li key={idx} className="leading-relaxed font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#735D43] flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C4820A]" />
                  <span>Kuih-Muih Tradisi:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDistrict.kuihSpecialties.map((kuih, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#FAF7F2] text-[#4A3E31] px-2.5 py-1 rounded border border-[#E3D7C1]"
                    >
                      {kuih}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#735D43] flex items-center gap-1.5 mb-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#2D5A27]" />
                  <span>Tapak Warisan:</span>
                </div>
                <p className="text-xs text-[#5C4D3C]">
                  {selectedDistrict.heritageSites.join(' · ')}
                </p>
              </div>
            </div>

            {/* Filter Action Button */}
            <button
              onClick={() => onFilterByDistrict(selectedDistrict.name)}
              className="w-full py-3 px-4 bg-[#B33927] hover:bg-[#962F20] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lihat Semua Resepi {selectedDistrict.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
