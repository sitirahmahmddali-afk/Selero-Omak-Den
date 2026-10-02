/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RECIPES_DATA } from './data/recipes';
import { HERITAGE_STORIES } from './data/stories';
import { Recipe, HeritageArticle, UserSubmittedRecipe } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RecipeOfTheDay } from './components/RecipeOfTheDay';
import { RecipeCollection } from './components/RecipeCollection';
import { KuihCollection } from './components/KuihCollection';
import { InteractiveMap } from './components/InteractiveMap';
import { RecipePicker } from './components/RecipePicker';
import { HeritageDashboard } from './components/HeritageDashboard';
import { RecipeIndexTable } from './components/RecipeIndexTable';
import { HeritageStories } from './components/HeritageStories';
import { RecipeModal } from './components/RecipeModal';
import { SubmitRecipeModal } from './components/SubmitRecipeModal';
import { SearchModal } from './components/SearchModal';
import { FavoritesView } from './components/FavoritesView';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AdminCMS } from './components/AdminCMS';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isCMSActive, setIsCMSActive] = useState(false);

  // Persistent Recipes in localStorage
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem('selero_omak_den_recipes');
      return stored ? JSON.parse(stored) : RECIPES_DATA;
    } catch {
      return RECIPES_DATA;
    }
  });

  // Persistent Heritage Articles in localStorage
  const [articles, setArticles] = useState<HeritageArticle[]>(() => {
    try {
      const stored = localStorage.getItem('selero_omak_den_articles');
      return stored ? JSON.parse(stored) : HERITAGE_STORIES;
    } catch {
      return HERITAGE_STORIES;
    }
  });

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('selero_omak_den_favorites');
      return stored ? JSON.parse(stored) : ['daging-salai-masak-lemak', 'apam-johol'];
    } catch {
      return ['daging-salai-masak-lemak', 'apam-johol'];
    }
  });

  // User submitted recipes in localStorage
  const [submittedRecipes, setSubmittedRecipes] = useState<UserSubmittedRecipe[]>(() => {
    try {
      const stored = localStorage.getItem('selero_omak_den_user_recipes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedStory, setSelectedStory] = useState<HeritageArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState('Semua');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('selero_omak_den_recipes', JSON.stringify(recipes));
    } catch {
      // ignore
    }
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem('selero_omak_den_articles', JSON.stringify(articles));
    } catch {
      // ignore
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('selero_omak_den_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('selero_omak_den_user_recipes', JSON.stringify(submittedRecipes));
    } catch {
      // ignore
    }
  }, [submittedRecipes]);

  // Global keydown for Search (Cmd+K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    if (favorites.includes(recipe.id)) {
      setFavorites(favorites.filter((id) => id !== recipe.id));
      showToast(`Dikeluarkan daripada koleksi den`);
    } else {
      setFavorites([...favorites, recipe.id]);
      showToast(`Disimpan dalam koleksi den ❤️`);
    }
  };

  const handleFilterByDistrict = (districtName: string) => {
    setDistrictFilter(districtName);
    setIsCMSActive(false);
    setActiveTab('resepi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterByCategory = (catName: string) => {
    setCategoryFilter(catName);
    setIsCMSActive(false);
    setActiveTab('resepi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSubmittedRecipe = (newRecipe: UserSubmittedRecipe) => {
    setSubmittedRecipes([newRecipe, ...submittedRecipes]);
    showToast(`Resepi "${newRecipe.name}" berjaya dihantar untuk semakan pentadbir!`);
  };

  const handleResetFactoryData = () => {
    setRecipes(RECIPES_DATA);
    setArticles(HERITAGE_STORIES);
    localStorage.removeItem('selero_omak_den_recipes');
    localStorage.removeItem('selero_omak_den_articles');
    showToast('Data portal telah diset semula ke kandungan asal.');
  };

  const pendingSubmissionsCount = submittedRecipes.filter((s) => s.status === 'Dalam Semakan').length;
  const recipeOfTheDay = recipes[0] || RECIPES_DATA[0];
  const traditionalKuihList = recipes.filter((r) => r.isKuih || r.category === 'Kuih Tradisional');
  const favoriteRecipesList = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F1B16] selection:bg-[#B33927] selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setIsCMSActive(false);
          setActiveTab(tab);
        }}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmitRecipe={() => setIsSubmitOpen(true)}
        onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
        isPlayingAudio={isPlayingAudio}
        isCMSActive={isCMSActive}
        onToggleCMS={() => setIsCMSActive(!isCMSActive)}
        pendingSubmissionsCount={pendingSubmissionsCount}
      />

      {/* Main Views */}
      <main className="flex-1">
        {/* If Admin CMS Mode is active */}
        {isCMSActive ? (
          <AdminCMS
            recipes={recipes}
            onUpdateRecipes={setRecipes}
            articles={articles}
            onUpdateArticles={setArticles}
            submittedRecipes={submittedRecipes}
            onUpdateSubmittedRecipes={setSubmittedRecipes}
            onExitCMS={() => setIsCMSActive(false)}
            onPreviewRecipe={(r) => setSelectedRecipe(r)}
            onResetFactoryData={handleResetFactoryData}
          />
        ) : (
          /* Normal Visitor Portal */
          <>
            {activeTab === 'home' && (
              <>
                <HeroSection
                  onExploreRecipes={() => {
                    setActiveTab('resepi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onExploreMap={() => {
                    setActiveTab('peta');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenPicker={() => {
                    setActiveTab('picker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  totalRecipes={recipes.length}
                  totalKuih={traditionalKuihList.length}
                />

                <RecipeOfTheDay
                  recipe={recipeOfTheDay}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                  isFavorite={favorites.includes(recipeOfTheDay.id)}
                  onToggleFavorite={handleToggleFavorite}
                />

                <RecipePicker
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                />

                <InteractiveMap
                  onFilterByDistrict={handleFilterByDistrict}
                />

                <KuihCollection
                  kuihList={traditionalKuihList.slice(0, 6)}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />

                <HeritageDashboard
                  recipes={recipes}
                  favoritesCount={favorites.length}
                  onFilterCategory={handleFilterByCategory}
                  onFilterDistrict={handleFilterByDistrict}
                />

                <HeritageStories />
              </>
            )}

            {/* Tab 2: Koleksi Resepi */}
            {activeTab === 'resepi' && (
              <RecipeCollection
                recipes={recipes}
                onSelectRecipe={(r) => setSelectedRecipe(r)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                initialDistrictFilter={districtFilter}
                initialCategoryFilter={categoryFilter}
              />
            )}

            {/* Tab 3: Manih-Manih Nogori (Kuih) */}
            {activeTab === 'kuih' && (
              <KuihCollection
                kuihList={traditionalKuihList}
                onSelectRecipe={(r) => setSelectedRecipe(r)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {/* Tab 4: Jelajah Nogori Map */}
            {activeTab === 'peta' && (
              <InteractiveMap
                onFilterByDistrict={handleFilterByDistrict}
              />
            )}

            {/* Tab 5: Apa Nak Masak Hari Ni? */}
            {activeTab === 'picker' && (
              <RecipePicker
                recipes={recipes}
                onSelectRecipe={(r) => setSelectedRecipe(r)}
              />
            )}

            {/* Tab 6: Cerita Warisan */}
            {activeTab === 'cerita' && (
              <HeritageStories />
            )}

            {/* Tab 7: Dashboard Statistik & Indeks Data */}
            {activeTab === 'statistik' && (
              <>
                <HeritageDashboard
                  recipes={recipes}
                  favoritesCount={favorites.length}
                  onFilterCategory={handleFilterByCategory}
                  onFilterDistrict={handleFilterByDistrict}
                />
                <RecipeIndexTable
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              </>
            )}

            {/* Tab 8: Resepi Den Gemar (Favorites) */}
            {activeTab === 'favourite' && (
              <FavoritesView
                favoriteRecipes={favoriteRecipesList}
                onSelectRecipe={(r) => setSelectedRecipe(r)}
                onRemoveFavorite={handleToggleFavorite}
                onExploreRecipes={() => {
                  setActiveTab('resepi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Global Modals & Utilities */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <SubmitRecipeModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleAddSubmittedRecipe}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        recipes={recipes}
        stories={articles}
        onSelectRecipe={(r) => setSelectedRecipe(r)}
        onSelectStory={(s) => setSelectedStory(s)}
      />

      {/* Floating Audio Ambience Player */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />

      {/* Editorial Footer */}
      <Footer
        onNavigate={(tab) => {
          setIsCMSActive(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenCMS={() => {
          setIsCMSActive(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
