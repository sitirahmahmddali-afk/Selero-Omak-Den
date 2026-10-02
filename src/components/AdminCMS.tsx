import React, { useState } from 'react';
import { Recipe, HeritageArticle, UserSubmittedRecipe, CategoryType, DistrictType, DifficultyType, IngredientItem, CookingStep } from '../types';
import { 
  UtensilsCrossed, 
  BookOpen, 
  Inbox, 
  Database, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  ArrowLeft, 
  Sparkles, 
  Save, 
  Check, 
  Layers,
  Image as ImageIcon
} from 'lucide-react';

interface AdminCMSProps {
  recipes: Recipe[];
  onUpdateRecipes: (updated: Recipe[]) => void;
  articles: HeritageArticle[];
  onUpdateArticles: (updated: HeritageArticle[]) => void;
  submittedRecipes: UserSubmittedRecipe[];
  onUpdateSubmittedRecipes: (updated: UserSubmittedRecipe[]) => void;
  onExitCMS: () => void;
  onPreviewRecipe: (recipe: Recipe) => void;
  onResetFactoryData: () => void;
}

const PRESET_IMAGES = [
  { label: 'Dapur Kampung Kayu', url: '/src/assets/images/raso_hero_dapur_1790906658789.jpg' },
  { label: 'Daging Salai Masak Lemak', url: '/src/assets/images/masak_lemak_salai_1790906673480.jpg' },
  { label: 'Apam Johol Daun Rambai', url: '/src/assets/images/apam_johol_tradisi_1790906687424.jpg' },
  { label: 'Kuih Sopang Bersantan', url: '/src/assets/images/kuih_sopang_lemak_1790906698457.jpg' },
];

export const AdminCMS: React.FC<AdminCMSProps> = ({
  recipes,
  onUpdateRecipes,
  articles,
  onUpdateArticles,
  submittedRecipes,
  onUpdateSubmittedRecipes,
  onExitCMS,
  onPreviewRecipe,
  onResetFactoryData,
}) => {
  const [activeCmsTab, setActiveCmsTab] = useState<'recipes' | 'articles' | 'submissions' | 'backup'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Semua');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Recipe Editing / Creation State
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Partial<Recipe> | null>(null);

  // Article Editing / Creation State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<HeritageArticle> | null>(null);

  // Success Notice Banner
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // --- RECIPE ACTIONS ---
  const handleOpenAddRecipe = () => {
    setEditingRecipe({
      id: `recipe-${Date.now()}`,
      name: '',
      localName: '',
      category: 'Gulai & Lauk',
      district: 'Kuala Pilah',
      description: '',
      story: '',
      image: PRESET_IMAGES[1].url,
      prepTime: 20,
      cookTime: 35,
      servings: 4,
      difficulty: 'Sederhana',
      mainIngredients: ['Santan', 'Cili Api', 'Kunyit Hidup'],
      ingredients: [
        { name: 'Santan pekat', amount: '500ml', isMain: true },
        { name: 'Cili api kampung', amount: '25 biji', isMain: true },
        { name: 'Kunyit hidup', amount: '2 inci', isMain: true },
        { name: 'Garam kasar', amount: 'Secukup rasa' },
      ],
      steps: [
        { stepNumber: 1, title: 'Tumbuk Rempah', instruction: 'Tumbuk cili api dan kunyit hidup dengan sedikit garam kasar dalam lesung batu.' },
        { stepNumber: 2, title: 'Didihkan Santan', instruction: 'Didihkan santan bersama bahan tumbuk dengan api perlahan sambil dikacau rata.' },
      ],
      oldFolksTips: ['Jangan gunakan bawang agar rasa lemak cili api asli kekal pekat.'],
      pairings: ['Nasi putih panas', 'Ulam kampung'],
      quoteLoghat: 'Kacau pelan-pelan jangan sampai bopocah minyak!',
      tags: ['#SeleroOmak', '#MasakLemak', '#WarisanNogori'],
      source: 'Resipi simpanan peribadi keluarga.',
      isVerified: true,
      isHeirloom: true,
      isKuih: false,
    });
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditRecipe = (recipe: Recipe) => {
    setEditingRecipe({ ...recipe });
    setIsRecipeModalOpen(true);
  };

  const handleDeleteRecipe = (id: string, name: string) => {
    if (window.confirm(`Adakah anda pasti mahu memadam resipi "${name}"?`)) {
      const updated = recipes.filter((r) => r.id !== id);
      onUpdateRecipes(updated);
      showNotice(`Resipi "${name}" berjaya dipadam.`);
    }
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe || !editingRecipe.name) return;

    const fullRecipe: Recipe = {
      id: editingRecipe.id || `recipe-${Date.now()}`,
      name: editingRecipe.name,
      localName: editingRecipe.localName || editingRecipe.name,
      category: editingRecipe.category || 'Gulai & Lauk',
      district: editingRecipe.district || 'Kuala Pilah',
      description: editingRecipe.description || '',
      story: editingRecipe.story || '',
      image: editingRecipe.image || PRESET_IMAGES[1].url,
      prepTime: Number(editingRecipe.prepTime) || 20,
      cookTime: Number(editingRecipe.cookTime) || 30,
      servings: Number(editingRecipe.servings) || 4,
      difficulty: editingRecipe.difficulty || 'Sederhana',
      mainIngredients: editingRecipe.mainIngredients || [],
      ingredients: editingRecipe.ingredients || [],
      steps: editingRecipe.steps || [],
      oldFolksTips: editingRecipe.oldFolksTips || [],
      pairings: editingRecipe.pairings || [],
      quoteLoghat: editingRecipe.quoteLoghat || 'Raso nogori tulen!',
      tags: editingRecipe.tags || ['#SeleroOmak'],
      source: editingRecipe.source || 'Arkib Selero Omak Den',
      isVerified: editingRecipe.isVerified ?? true,
      isHeirloom: editingRecipe.isHeirloom ?? true,
      isKuih: editingRecipe.category === 'Kuih Tradisional' || editingRecipe.isKuih,
    };

    const exists = recipes.some((r) => r.id === fullRecipe.id);
    let updated: Recipe[];
    if (exists) {
      updated = recipes.map((r) => (r.id === fullRecipe.id ? fullRecipe : r));
      showNotice(`Resipi "${fullRecipe.name}" berjaya dikemaskini.`);
    } else {
      updated = [fullRecipe, ...recipes];
      showNotice(`Resipi baru "${fullRecipe.name}" berjaya ditambah.`);
    }

    onUpdateRecipes(updated);
    setIsRecipeModalOpen(false);
    setEditingRecipe(null);
  };

  // --- ARTICLE ACTIONS ---
  const handleOpenAddArticle = () => {
    setEditingArticle({
      id: `article-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'Dapur Pusaka',
      readTime: '4 minit bacaan',
      author: 'Kurator Selero Omak Den',
      date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: PRESET_IMAGES[0].url,
      summary: '',
      content: ['Tulis perenggan cerita anda di sini...'],
      pullQuote: 'Kata-kata hikmah warisan.',
      sourceRef: 'Arkib Lisan Kampung Negeri Sembilan.',
    });
    setIsArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art: HeritageArticle) => {
    setEditingArticle({ ...art });
    setIsArticleModalOpen(true);
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (window.confirm(`Adakah anda pasti mahu memadam artikel "${title}"?`)) {
      const updated = articles.filter((a) => a.id !== id);
      onUpdateArticles(updated);
      showNotice(`Artikel "${title}" berjaya dipadam.`);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    const fullArticle: HeritageArticle = {
      id: editingArticle.id || `article-${Date.now()}`,
      title: editingArticle.title,
      subtitle: editingArticle.subtitle || '',
      category: editingArticle.category || 'Dapur Pusaka',
      readTime: editingArticle.readTime || '5 minit bacaan',
      author: editingArticle.author || 'Kurator Selero Omak Den',
      date: editingArticle.date || new Date().toLocaleDateString('ms-MY'),
      image: editingArticle.image || PRESET_IMAGES[0].url,
      summary: editingArticle.summary || '',
      content: editingArticle.content && editingArticle.content.length > 0 ? editingArticle.content : ['Kandungan cerita...'],
      pullQuote: editingArticle.pullQuote || '',
      sourceRef: editingArticle.sourceRef || 'Sumber Tradisi',
    };

    const exists = articles.some((a) => a.id === fullArticle.id);
    let updated: HeritageArticle[];
    if (exists) {
      updated = articles.map((a) => (a.id === fullArticle.id ? fullArticle : a));
      showNotice(`Artikel "${fullArticle.title}" berjaya dikemaskini.`);
    } else {
      updated = [fullArticle, ...articles];
      showNotice(`Artikel baru "${fullArticle.title}" berjaya diterbitkan.`);
    }

    onUpdateArticles(updated);
    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  // --- SUBMISSIONS ACTIONS ---
  const handleApproveSubmission = (sub: UserSubmittedRecipe) => {
    // Convert to full recipe and publish immediately
    const publishedRecipe: Recipe = {
      id: `published-${sub.id}`,
      name: sub.name,
      localName: sub.name,
      category: 'Gulai & Lauk',
      district: (sub.district as Recipe['district']) || 'Kuala Pilah',
      description: sub.story || `Resipi keluarga sumbangan daripada ${sub.familyName || 'komuniti kampung'}.`,
      story: sub.story || 'Resipi turun-temurun warisan keluarga.',
      image: PRESET_IMAGES[1].url,
      prepTime: 20,
      cookTime: 35,
      servings: 4,
      difficulty: 'Sederhana',
      mainIngredients: ['Bahan Tradisi', 'Santan', 'Cili Api'],
      ingredients: sub.ingredients.split('\n').filter(Boolean).map((line) => ({
        name: line.trim(),
        amount: 'Secukupnya',
      })),
      steps: sub.steps.split('\n').filter(Boolean).map((stepText, idx) => ({
        stepNumber: idx + 1,
        title: `Langkah ${idx + 1}`,
        instruction: stepText.trim(),
      })),
      oldFolksTips: [`Petua daripada ${sub.familyName || 'orang lama'}`],
      pairings: ['Nasi putih panas'],
      quoteLoghat: 'Resepi asli air tangan keluarga!',
      tags: ['#SumbanganKomuniti', '#ResepiTok'],
      source: `Sumbangan ${sub.familyName || 'Keluarga'} (${sub.district})`,
      isVerified: true,
      isHeirloom: true,
      isKuih: false,
    };

    onUpdateRecipes([publishedRecipe, ...recipes]);
    onUpdateSubmittedRecipes(
      submittedRecipes.map((s) => (s.id === sub.id ? { ...s, status: 'Diterima' } : s))
    );
    showNotice(`Resipi "${sub.name}" berjaya diluluskan & diterbitkan ke portal!`);
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm('Padam sumbangan ini daripada senarai?')) {
      onUpdateSubmittedRecipes(submittedRecipes.filter((s) => s.id !== id));
      showNotice('Sumbangan dipadam.');
    }
  };

  // --- BACKUP & RESTORE ACTIONS ---
  const handleExportJSON = () => {
    const exportBundle = {
      appName: 'Selero Omak Den',
      exportedAt: new Date().toISOString(),
      recipes,
      articles,
      submittedRecipes,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `selero_omak_den_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice('Fail sandaran JSON berjaya dimuat turun!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.recipes && Array.isArray(parsed.recipes)) {
          onUpdateRecipes(parsed.recipes);
        }
        if (parsed.articles && Array.isArray(parsed.articles)) {
          onUpdateArticles(parsed.articles);
        }
        if (parsed.submittedRecipes && Array.isArray(parsed.submittedRecipes)) {
          onUpdateSubmittedRecipes(parsed.submittedRecipes);
        }
        showNotice('Data berjaya dipulihkan daripada fail JSON!');
      } catch (err) {
        alert('Ralat membaca fail JSON. Sila pastikan format fail adalah sah.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered recipes for the table
  const filteredRecipes = recipes.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.district.toLowerCase().includes(q) && !r.category.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedDistrict !== 'Semua' && r.district !== selectedDistrict) return false;
    if (selectedCategory !== 'Semua' && r.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      
      {/* CMS Top Header */}
      <div className="bg-[#171310] text-[#FAF7F2] border-b border-[#382E22] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
            
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#B33927] flex items-center justify-center font-bold text-white shadow-xs">
                CMS
              </span>
              <div>
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  Panel Pengurusan Portal — Selero Omak Den
                </h1>
                <p className="text-xs text-[#A89882]">
                  Pusat kawalan kandungan: Tambah, sunting, padam resipi, artikel & urus sumbangan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onExitCMS}
                className="px-4 py-2 bg-[#2E251B] hover:bg-[#3D3123] border border-[#DECFA9]/30 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Portal</span>
              </button>
            </div>

          </div>

          {/* CMS Subnav Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-3 scrollbar-none border-t border-[#2E251B]">
            <button
              onClick={() => setActiveCmsTab('recipes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeCmsTab === 'recipes'
                  ? 'bg-[#B33927] text-white font-semibold'
                  : 'text-[#C7BBA8] hover:text-white hover:bg-[#251E17]'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Resepi & Kuih ({recipes.length})</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('articles')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeCmsTab === 'articles'
                  ? 'bg-[#B33927] text-white font-semibold'
                  : 'text-[#C7BBA8] hover:text-white hover:bg-[#251E17]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Cerito Warisan ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('submissions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeCmsTab === 'submissions'
                  ? 'bg-[#B33927] text-white font-semibold'
                  : 'text-[#C7BBA8] hover:text-white hover:bg-[#251E17]'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Sumbangan Masuk</span>
              {submittedRecipes.filter((s) => s.status === 'Dalam Semakan').length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-900 font-bold text-[10px]">
                  {submittedRecipes.filter((s) => s.status === 'Dalam Semakan').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveCmsTab('backup')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeCmsTab === 'backup'
                  ? 'bg-[#B33927] text-white font-semibold'
                  : 'text-[#C7BBA8] hover:text-white hover:bg-[#251E17]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sandaran & Muat Turun Data</span>
            </button>
          </div>

        </div>
      </div>

      {/* Floating Notice Toast */}
      {notice && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in duration-200">
          <div className="bg-[#1E1915] text-white px-4 py-2.5 rounded-xl border border-[#DECFA9] shadow-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notice}</span>
          </div>
        </div>
      )}

      {/* Main CMS View Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* --- TAB 1: RECIPES & KUIH MANAGEMENT --- */}
        {activeCmsTab === 'recipes' && (
          <div className="space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl p-5 border border-[#DECFA9] shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              
              <div className="flex flex-1 flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#735D43]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari resepi dalam arkib..."
                    className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
                  />
                </div>

                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Gulai & Lauk">Gulai & Lauk</option>
                  <option value="Kuih Tradisional">Kuih Tradisional</option>
                  <option value="Sambal & Cecah">Sambal & Cecah</option>
                  <option value="Sarapan & Hidangan Perayaan">Sarapan & Hidangan Perayaan</option>
                  <option value="Sayur & Kerabu">Sayur & Kerabu</option>
                </select>
              </div>

              <button
                onClick={handleOpenAddRecipe}
                className="px-4 py-2.5 bg-[#B33927] hover:bg-[#962F20] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Resepi Baru</span>
              </button>
            </div>

            {/* Recipes Table */}
            <div className="bg-white rounded-2xl border border-[#DECFA9] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4A3E31]">
                  <thead className="bg-[#FAF7F2] border-b border-[#E8DFC8] text-[#1F1B16] font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Gambar</th>
                      <th className="py-3.5 px-4">Nama Resepi & Loghat</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4">Daerah</th>
                      <th className="py-3.5 px-4">Masa</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {filteredRecipes.map((r) => (
                      <tr key={r.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-lg bg-stone-900 overflow-hidden shrink-0 border border-[#DDD0BC]">
                            <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-[#1F1B16]">{r.name}</div>
                          <div className="text-[11px] text-[#8A4A32] italic font-serif">"{r.localName}"</div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-medium text-[#4A3E31]">{r.category}</span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-semibold text-[#1F1B16]">{r.district}</span>
                        </td>

                        <td className="py-3 px-4 tabular-nums whitespace-nowrap">
                          {r.cookTime} minit
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          {r.isHeirloom ? (
                            <span className="text-[10px] font-semibold text-[#B33927] bg-[#B33927]/10 px-2 py-0.5 rounded">
                              Warisan Tok
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#735D43]">Standard</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onPreviewRecipe(r)}
                              className="p-1.5 text-[#735D43] hover:text-[#1F1B16] hover:bg-[#F3EDE2] rounded-md transition-colors cursor-pointer"
                              title="Pratonton Resepi"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditRecipe(r)}
                              className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                              title="Sunting Resepi"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecipe(r.id, r.name)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                              title="Padam Resepi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 2: ARTICLES MANAGEMENT --- */}
        {activeCmsTab === 'articles' && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center bg-white rounded-2xl p-5 border border-[#DECFA9]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                  Senarai Cerito Warisan & Budaya
                </h3>
                <p className="text-xs text-[#735D43]">
                  Urus artikel naratif, kisah adat istiadat, dan falsafah dapur kampung.
                </p>
              </div>

              <button
                onClick={handleOpenAddArticle}
                className="px-4 py-2 bg-[#B33927] hover:bg-[#962F20] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tulis Cerita Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-2xl border border-[#DECFA9] p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#735D43] mb-2 font-medium">
                      <span>{art.category}</span>
                      <span>{art.date}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#1F1B16] mb-1 leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-xs text-[#5C4D3C] line-clamp-2 mb-4 leading-relaxed">
                      {art.summary}
                    </p>

                    <div className="text-[11px] text-[#735D43] italic border-l-2 border-[#B33927] pl-2 mb-4">
                      "{art.pullQuote}"
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                    <span className="text-[#A89882]">{art.author}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditArticle(art)}
                        className="px-2.5 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded text-xs font-medium cursor-pointer"
                      >
                        Sunting
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id, art.title)}
                        className="px-2.5 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded text-xs font-medium cursor-pointer"
                      >
                        Padam
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 3: SUBMISSIONS MANAGEMENT --- */}
        {activeCmsTab === 'submissions' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl p-5 border border-[#DECFA9]">
              <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                Peti Semakan Resepi Sumbangan Komuniti
              </h3>
              <p className="text-xs text-[#735D43]">
                Resipi keluarga yang dicadangkan oleh pengunjung melalui borang "Tambah Resepi Tok". Anda boleh meluluskan terus untuk menerbitkannya ke portal.
              </p>
            </div>

            {submittedRecipes.length > 0 ? (
              <div className="space-y-4">
                {submittedRecipes.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl border border-[#DECFA9] p-6 shadow-xs flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1F1B16]">{sub.name}</span>
                        <span className="text-xs text-[#735D43]">·</span>
                        <span className="text-xs font-medium text-[#B33927]">{sub.district}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            sub.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#735D43]">
                        Nama Keluarga: <strong className="text-[#1F1B16]">{sub.familyName || 'Tidak dinyatakan'}</strong> · Dihantar: {sub.submittedAt}
                      </div>

                      {sub.story && (
                        <p className="text-xs text-[#4A3E31] italic bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EAE0D0]">
                          "{sub.story}"
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div>
                          <strong className="text-[#1F1B16] block mb-1">Bahan-Bahan:</strong>
                          <pre className="font-sans whitespace-pre-wrap text-[#5C4D3C] text-[11px] bg-[#FAF7F2] p-2 rounded">
                            {sub.ingredients}
                          </pre>
                        </div>
                        <div>
                          <strong className="text-[#1F1B16] block mb-1">Langkah Memasak:</strong>
                          <pre className="font-sans whitespace-pre-wrap text-[#5C4D3C] text-[11px] bg-[#FAF7F2] p-2 rounded">
                            {sub.steps}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-end gap-2 shrink-0">
                      {sub.status !== 'Diterima' && (
                        <button
                          onClick={() => handleApproveSubmission(sub)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Lulus & Terbitkan</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-xs font-medium cursor-pointer"
                      >
                        Padam
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#DECFA9] p-12 text-center text-[#735D43]">
                <Inbox className="w-10 h-10 text-[#DECFA9] mx-auto mb-2" />
                <p className="font-serif text-base font-bold text-[#1F1B16]">Tiada Sumbangan Baru</p>
                <p className="text-xs mt-1">Apabila orang ramai menghantar resepi tok melalui borang, ia akan muncul di sini.</p>
              </div>
            )}

          </div>
        )}

        {/* --- TAB 4: BACKUP & DATA MANAGEMENT --- */}
        {activeCmsTab === 'backup' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-[#DECFA9] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                Eksport & Sandaran Data Portal
              </h3>
              <p className="text-xs text-[#5C4D3C] leading-relaxed">
                Anda boleh memuat turun semua kandungan portal (resipi, kuih, artikel, dan sumbangan komuniti) sebagai fail `.json` untuk disimpan di komputer anda sebagai sandaran selamat.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={handleExportJSON}
                  className="px-5 py-2.5 bg-[#B33927] hover:bg-[#962F20] text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Muat Turun Fail Sandaran (JSON)</span>
                </button>

                <label className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#DDD0BC] text-[#1F1B16] rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-2xs">
                  <Upload className="w-4 h-4 text-[#B33927]" />
                  <span>Muat Naik & Pulihkan Data (JSON)</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="bg-white rounded-2xl p-6 border border-red-200 space-y-3">
              <h4 className="font-serif text-base font-bold text-red-700 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Set Semula ke Data Asal Kilang</span>
              </h4>
              <p className="text-xs text-[#735D43]">
                Tindakan ini akan mengembalikan semua resipi dan artikel ke kandungan piawai asal. Gunakan jika anda ingin memulakan semula.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Adakah anda pasti mahu set semula semua data ke asal? Sebarang perubahan peribadi yang belum disandarkan akan hilang.')) {
                    onResetFactoryData();
                    showNotice('Data telah dikembalikan ke tetapan asal kilang.');
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Set Semula Data Asal
              </button>
            </div>

          </div>
        )}

      </div>

      {/* --- RECIPE EDIT / CREATE MODAL --- */}
      {isRecipeModalOpen && editingRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-2xl border border-[#DECFA9] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
            
            <div className="p-4 sm:px-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                {editingRecipe.id && recipes.some((r) => r.id === editingRecipe.id)
                  ? 'Sunting Resepi'
                  : 'Tambah Resepi Baru'}
              </h3>
              <button
                onClick={() => setIsRecipeModalOpen(false)}
                className="p-1 text-[#735D43] hover:text-[#1F1B16]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecipe} className="p-6 overflow-y-auto space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Nama Resepi *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRecipe.name || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Nama Tempatan / Loghat Nogori
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.localName || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, localName: e.target.value })}
                    placeholder="Contoh: Masak Lomak Cili Api Dagiang Salai"
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Kategori
                  </label>
                  <select
                    value={editingRecipe.category || 'Gulai & Lauk'}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  >
                    <option value="Gulai & Lauk">Gulai & Lauk</option>
                    <option value="Kuih Tradisional">Kuih Tradisional</option>
                    <option value="Sambal & Cecah">Sambal & Cecah</option>
                    <option value="Sarapan & Hidangan Perayaan">Sarapan & Hidangan Perayaan</option>
                    <option value="Sayur & Kerabu">Sayur & Kerabu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Daerah / Luak
                  </label>
                  <select
                    value={editingRecipe.district || 'Kuala Pilah'}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, district: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  >
                    <option value="Kuala Pilah">Kuala Pilah</option>
                    <option value="Rembau">Rembau</option>
                    <option value="Jelebu">Jelebu</option>
                    <option value="Seremban">Seremban</option>
                    <option value="Tampin">Tampin</option>
                    <option value="Jempol">Jempol</option>
                    <option value="Port Dickson">Port Dickson</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Tahap Kesukaran
                  </label>
                  <select
                    value={editingRecipe.difficulty || 'Sederhana'}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sederhana">Sederhana</option>
                    <option value="Mahir">Mahir</option>
                  </select>
                </div>
              </div>

              {/* Cooking Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Masa Prep (Min)
                  </label>
                  <input
                    type="number"
                    value={editingRecipe.prepTime || 20}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Masa Masak (Min)
                  </label>
                  <input
                    type="number"
                    value={editingRecipe.cookTime || 30}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, cookTime: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Hidangan (Orang)
                  </label>
                  <input
                    type="number"
                    value={editingRecipe.servings || 4}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, servings: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                  />
                </div>
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Pilihan Gambar
                </label>
                <div className="flex gap-2 mb-2">
                  {PRESET_IMAGES.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setEditingRecipe({ ...editingRecipe, image: preset.url })}
                      className={`text-[11px] px-2.5 py-1 rounded border cursor-pointer ${
                        editingRecipe.image === preset.url
                          ? 'bg-[#B33927] text-white border-[#B33927]'
                          : 'bg-white text-[#4A3E31] border-[#DDD0BC]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editingRecipe.image || ''}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })}
                  placeholder="Atau masukkan URL gambar..."
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Penerangan Ringkas
                </label>
                <textarea
                  rows={2}
                  value={editingRecipe.description || ''}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Kisah Di Sebalik Hidangan
                </label>
                <textarea
                  rows={3}
                  value={editingRecipe.story || ''}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, story: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                />
              </div>

              {/* Ingredients Builder */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase text-[#735D43]">
                    Senarai Bahan-Bahan ({editingRecipe.ingredients?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = editingRecipe.ingredients || [];
                      setEditingRecipe({
                        ...editingRecipe,
                        ingredients: [...cur, { name: '', amount: '' }],
                      });
                    }}
                    className="text-xs font-semibold text-[#B33927] hover:underline cursor-pointer"
                  >
                    + Tambah Bahan
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editingRecipe.ingredients?.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Nama bahan (cth: Daging salai)"
                        value={ing.name}
                        onChange={(e) => {
                          const updated = [...(editingRecipe.ingredients || [])];
                          updated[idx].name = e.target.value;
                          setEditingRecipe({ ...editingRecipe, ingredients: updated });
                        }}
                        className="flex-1 px-3 py-1.5 bg-white border border-[#DDD0BC] rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Sukatan (cth: 500g)"
                        value={ing.amount}
                        onChange={(e) => {
                          const updated = [...(editingRecipe.ingredients || [])];
                          updated[idx].amount = e.target.value;
                          setEditingRecipe({ ...editingRecipe, ingredients: updated });
                        }}
                        className="w-28 px-3 py-1.5 bg-white border border-[#DDD0BC] rounded text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingRecipe.ingredients || []).filter((_, i) => i !== idx);
                          setEditingRecipe({ ...editingRecipe, ingredients: updated });
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps Builder */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase text-[#735D43]">
                    Langkah Memasak ({editingRecipe.steps?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = editingRecipe.steps || [];
                      setEditingRecipe({
                        ...editingRecipe,
                        steps: [
                          ...cur,
                          {
                            stepNumber: cur.length + 1,
                            title: `Langkah ${cur.length + 1}`,
                            instruction: '',
                          },
                        ],
                      });
                    }}
                    className="text-xs font-semibold text-[#B33927] hover:underline cursor-pointer"
                  >
                    + Tambah Langkah
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editingRecipe.steps?.map((step, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-[#DDD0BC] rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...(editingRecipe.steps || [])];
                            updated[idx].title = e.target.value;
                            setEditingRecipe({ ...editingRecipe, steps: updated });
                          }}
                          placeholder="Tajuk langkah"
                          className="font-bold text-xs border-b border-[#DDD0BC] pb-1 w-full mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingRecipe.steps || [])
                              .filter((_, i) => i !== idx)
                              .map((s, i) => ({ ...s, stepNumber: i + 1 }));
                            setEditingRecipe({ ...editingRecipe, steps: updated });
                          }}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={step.instruction}
                        onChange={(e) => {
                          const updated = [...(editingRecipe.steps || [])];
                          updated[idx].instruction = e.target.value;
                          setEditingRecipe({ ...editingRecipe, steps: updated });
                        }}
                        placeholder="Penerangan cara memasak..."
                        className="w-full text-xs p-1.5 bg-[#FAF7F2] rounded border border-[#E8DFC8]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Loghat & Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Petua Loghat Nogori
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.quoteLoghat || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, quoteLoghat: e.target.value })}
                    placeholder="Contoh: Api tu jangan besau bona!"
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Sumber Rekod Warisan
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.source || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, source: e.target.value })}
                    placeholder="Contoh: Resipi Bonda Hajah Tijah"
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#1F1B16] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingRecipe.isHeirloom ?? false}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, isHeirloom: e.target.checked })}
                    className="rounded text-[#B33927]"
                  />
                  <span>Resepi Warisan Tok</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-[#1F1B16] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingRecipe.isVerified ?? true}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, isVerified: e.target.checked })}
                    className="rounded text-[#B33927]"
                  />
                  <span>Disahkan Asli</span>
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-[#E8DFC8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRecipeModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#4A3E31] hover:bg-[#F3EDE2] rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#B33927] hover:bg-[#962F20] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* --- ARTICLE EDIT / CREATE MODAL --- */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-[#DECFA9] shadow-2xl overflow-hidden my-6">
            
            <div className="p-4 sm:px-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1F1B16]">
                {editingArticle.id && articles.some((a) => a.id === editingArticle.id)
                  ? 'Sunting Cerito Warisan'
                  : 'Tulis Cerita Baru'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1 text-[#735D43] hover:text-[#1F1B16]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Tajuk Cerita *
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Subtajuk
                </label>
                <input
                  type="text"
                  value={editingArticle.subtitle || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs text-[#1F1B16]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Kategori
                  </label>
                  <select
                    value={editingArticle.category || 'Dapur Pusaka'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs"
                  >
                    <option value="Dapur Pusaka">Dapur Pusaka</option>
                    <option value="Adat & Budaya">Adat & Budaya</option>
                    <option value="Seni Memasak">Seni Memasak</option>
                    <option value="Kisah Tok">Kisah Tok</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Ringkasan Cerita
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.summary || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Kandungan Cerita (Tiap Perenggan Pisahkan Dengan Baris Baru)
                </label>
                <textarea
                  rows={4}
                  value={editingArticle.content?.join('\n\n') || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value.split('\n\n').filter(Boolean) })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#735D43] mb-1">
                  Petikan Falsafah (Pull Quote)
                </label>
                <input
                  type="text"
                  value={editingArticle.pullQuote || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, pullQuote: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs italic font-serif"
                />
              </div>

              <div className="pt-3 border-t border-[#E8DFC8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#4A3E31] hover:bg-[#F3EDE2] rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#B33927] hover:bg-[#962F20] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  Simpan Artikel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
