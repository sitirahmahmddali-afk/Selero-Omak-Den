import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';
import { UserSubmittedRecipe } from '../types';

interface SubmitRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: UserSubmittedRecipe) => void;
}

export const SubmitRecipeModal: React.FC<SubmitRecipeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [district, setDistrict] = useState('Kuala Pilah');
  const [story, setStory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim() || !steps.trim()) return;

    const newRecipe: UserSubmittedRecipe = {
      id: `user-recipe-${Date.now()}`,
      name,
      familyName,
      district,
      story,
      ingredients,
      steps,
      submittedAt: new Date().toLocaleDateString('ms-MY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'Dalam Semakan',
    };

    onSubmit(newRecipe);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-[#DECFA9] shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#B33927]" />
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1F1B16]">
                Cadangkan Resepi Keluarga Anda
              </h3>
              <p className="text-xs text-[#735D43]">
                Abadikan resipi turun-temurun nenek moyang dalam arkib warisan Negeri Sembilan.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#735D43] hover:text-[#1F1B16] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#1F1B16]">
              Terima Kasih Atas Perkongsian Warisan!
            </h4>
            <p className="text-xs text-[#5C4D3C] max-w-md mx-auto leading-relaxed">
              Resepi keluarga anda telah disimpan sementara dan sedang dimasukkan ke dalam barisan semakan kurator budaya Selero Omak Den.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                  Nama Resepi *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Gulai Lomak Rebung Tok Wan"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                  Nama Keluarga / Moyang
                </label>
                <input
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="Contoh: Mak Wan Timah (Kampung Juasseh)"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Asal Daerah / Luak *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927] cursor-pointer"
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Kisah di Sebalik Resepi
              </label>
              <textarea
                rows={2}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Ceritakan serba sedikit asal-usul resipi ini dimasak sewaktu kenduri atau kenangan lama..."
                className="w-full px-3.5 py-2 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Bahan & Sukatan Tradisi *
              </label>
              <textarea
                rows={3}
                required
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Senaraikan bahan-bahan (contoh: 500g daging salai, 30 biji cili api kampung, 2 inci kunyit hidup ditumbuk...)"
                className="w-full px-3.5 py-2 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735D43] mb-1">
                Langkah Memasak & Petua Orang Lama *
              </label>
              <textarea
                rows={3}
                required
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Terangkan langkah demi langkah cara memasak serta pantang larang penting..."
                className="w-full px-3.5 py-2 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#1F1B16] focus:outline-none focus:border-[#B33927]"
              />
            </div>

            {/* Curator Notice */}
            <div className="p-3.5 bg-[#FAF3E8] border border-[#DECFA9] rounded-xl text-xs text-[#735D43] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B33927] shrink-0" />
              <span>Resepi akan disemak sebelum diterbitkan bagi memastikan ketulenan bahan dan rasa warisan.</span>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#4A3E31] hover:bg-[#F3EDE2] rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#B33927] hover:bg-[#962F20] rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hantar Resepi Tok</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
