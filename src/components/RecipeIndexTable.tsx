import React, { useState, useMemo } from 'react';
import { Recipe } from '../types';
import { Search, ArrowUpDown, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface RecipeIndexTableProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (recipe: Recipe) => void;
}

export const RecipeIndexTable: React.FC<RecipeIndexTableProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
}) => {
  const [query, setQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('Semua');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [sortField, setSortField] = useState<'name' | 'cookTime' | 'district'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleSort = (field: 'name' | 'cookTime' | 'district') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredAndSorted = useMemo(() => {
    return recipes
      .filter((r) => {
        if (query) {
          const q = query.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchLocal = r.localName.toLowerCase().includes(q);
          const matchIng = r.mainIngredients.some((i) => i.toLowerCase().includes(q));
          if (!matchName && !matchLocal && !matchIng) return false;
        }
        if (districtFilter !== 'Semua' && r.district !== districtFilter) return false;
        if (categoryFilter !== 'Semua' && r.category !== categoryFilter) return false;
        return true;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'name') {
          comp = a.name.localeCompare(b.name);
        } else if (sortField === 'cookTime') {
          comp = a.cookTime - b.cookTime;
        } else if (sortField === 'district') {
          comp = a.district.localeCompare(b.district);
        }
        return sortAsc ? comp : -comp;
      });
  }, [recipes, query, districtFilter, categoryFilter, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize) || 1;
  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, currentPage, pageSize]);

  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Katalog Lengkap & Arkib Data
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              Indeks Resepi Nogori
            </h2>
          </div>
          <p className="text-sm text-[#735D43] mt-2 md:mt-0 font-normal">
            Jadual data interaktif untuk rujukan dan pencarian pantas mengikut parameter.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DECFA9] shadow-xs mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#735D43]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari dalam indeks..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={districtFilter}
              onChange={(e) => {
                setDistrictFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
            >
              <option value="Semua">Semua Daerah</option>
              <option value="Kuala Pilah">Kuala Pilah</option>
              <option value="Rembau">Rembau</option>
              <option value="Jelebu">Jelebu</option>
              <option value="Seremban">Seremban</option>
              <option value="Tampin">Tampin</option>
              <option value="Jempol">Jempol</option>
              <option value="Port Dickson">Port Dickson</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Gulai & Lauk">Gulai & Lauk</option>
              <option value="Kuih Tradisional">Kuih Tradisional</option>
              <option value="Sambal & Cecah">Sambal & Cecah</option>
              <option value="Sarapan & Hidangan Perayaan">Sarapan & Hidangan Perayaan</option>
              <option value="Sayur & Kerabu">Sayur & Kerabu</option>
            </select>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="bg-white rounded-2xl border border-[#DECFA9] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#4A3E31]">
              <thead className="bg-[#FAF7F2] border-b border-[#E8DFC8] text-[#1F1B16] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="py-3.5 px-4 cursor-pointer hover:bg-[#F0E6D2] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Resepi & Nama Asli</span>
                      <ArrowUpDown className="w-3 h-3 text-[#735D43]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th
                    onClick={() => handleSort('district')}
                    className="py-3.5 px-4 cursor-pointer hover:bg-[#F0E6D2] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Daerah</span>
                      <ArrowUpDown className="w-3 h-3 text-[#735D43]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Bahan Utama</th>
                  <th
                    onClick={() => handleSort('cookTime')}
                    className="py-3.5 px-4 cursor-pointer hover:bg-[#F0E6D2] transition-colors tabular-nums"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Masa</span>
                      <ArrowUpDown className="w-3 h-3 text-[#735D43]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Tahap</th>
                  <th className="py-3.5 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE1]">
                {paginatedRecipes.map((recipe) => {
                  const isFav = favorites.includes(recipe.id);
                  return (
                    <tr
                      key={recipe.id}
                      onClick={() => onSelectRecipe(recipe)}
                      className="hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#1F1B16]">
                          {recipe.name}
                        </div>
                        <div className="text-[11px] text-[#8A4A32] font-serif italic">
                          "{recipe.localName}"
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[#5C4D3C] font-medium">{recipe.category}</span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[#1F1B16] font-medium">{recipe.district}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="line-clamp-1 max-w-[200px]">
                          {recipe.mainIngredients.slice(0, 3).join(', ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 tabular-nums whitespace-nowrap font-medium">
                        {recipe.cookTime} min
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-medium">
                        <span
                          className={
                            recipe.difficulty === 'Mudah'
                              ? 'text-[#2D5A27]'
                              : recipe.difficulty === 'Sederhana'
                              ? 'text-[#C4820A]'
                              : 'text-[#B33927]'
                          }
                        >
                          {recipe.difficulty}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onToggleFavorite(recipe)}
                            className="p-1.5 text-[#B33927] hover:bg-[#F3EDE2] rounded-md transition-colors cursor-pointer"
                            title="Simpan"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#B33927]' : ''}`} />
                          </button>
                          <button
                            onClick={() => onSelectRecipe(recipe)}
                            className="p-1.5 text-[#4A3E31] hover:bg-[#F3EDE2] rounded-md transition-colors cursor-pointer"
                            title="Lihat Butiran"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="bg-[#FAF7F2] px-4 py-3 border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#735D43]">
            <div>
              Halaman <span className="font-bold text-[#1F1B16] tabular-nums">{currentPage}</span> daripada <span className="font-bold text-[#1F1B16] tabular-nums">{totalPages}</span> ({filteredAndSorted.length} rekod)
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-md hover:bg-[#EAE0D0] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-md hover:bg-[#EAE0D0] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
