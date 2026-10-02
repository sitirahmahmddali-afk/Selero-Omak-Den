import React, { useState } from 'react';
import { HERITAGE_STORIES } from '../data/stories';
import { HeritageArticle } from '../types';
import { BookOpen, Clock, ArrowRight, X, Quote, BookmarkCheck } from 'lucide-react';

export const HeritageStories: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<HeritageArticle | null>(null);

  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#DECFA9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B33927] font-semibold mb-1">
              Kisah Lisan, Adat & Dapur Pusaka
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16]">
              Cerito Warisan Nogori
            </h2>
          </div>
          <p className="text-sm text-[#735D43] mt-2 md:mt-0 font-normal max-w-md">
            Meneroka naratif di sebalik periuk belanga kampung, peranan Ibu Soko, falsafah tiada bawang, dan legasi daun rambai Luak Johol.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HERITAGE_STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedArticle(story)}
              className="bg-white rounded-2xl border border-[#DECFA9] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                    {story.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#735D43] mb-2 font-medium">
                    <span>{story.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1F1B16] group-hover:text-[#B33927] transition-colors leading-snug mb-2">
                    {story.title}
                  </h3>

                  <p className="text-xs text-[#5C4D3C] line-clamp-3 leading-relaxed mb-4">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EFE8DC] flex items-center justify-between text-xs font-semibold text-[#B33927]">
                <span>Baca Cerito Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Editorial Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-2xl border border-[#DECFA9] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 border-b border-[#E8DFC8] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#735D43] font-semibold">
                <BookOpen className="w-4 h-4 text-[#B33927]" />
                <span>{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-[#735D43] hover:text-[#1F1B16] hover:bg-[#FAF7F2] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Editorial Essay Canvas */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              
              <div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F1B16] leading-tight mb-3">
                  {selectedArticle.title}
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#8A4A32]">
                  {selectedArticle.subtitle}
                </p>
                <div className="text-xs text-[#735D43] mt-3 pt-3 border-t border-[#E8DFC8] flex items-center gap-2">
                  <span>Ditulis oleh: <strong className="text-[#1F1B16]">{selectedArticle.author}</strong></span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>

              {/* Lead Image */}
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 border border-[#DECFA9]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Essay Body with Drop Cap on First Paragraph */}
              <div className="space-y-4 text-sm sm:text-base text-[#2E251B] leading-relaxed max-w-prose">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#B33927]'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Pull Quote */}
              <blockquote className="my-8 p-6 rounded-xl bg-[#F4EFE6] border-l-4 border-[#B33927]">
                <Quote className="w-6 h-6 text-[#B33927] mb-2 opacity-60" />
                <p className="font-serif italic text-base sm:text-lg text-[#1F1B16] leading-snug">
                  "{selectedArticle.pullQuote}"
                </p>
              </blockquote>

              {/* Footnote / Provenance Citation */}
              <div className="pt-6 border-t border-[#E8DFC8] text-xs text-[#735D43]">
                <div className="font-semibold uppercase tracking-wider text-[#1F1B16] mb-1">
                  Sumber & Rujukan Sejarah:
                </div>
                <p className="italic">
                  {selectedArticle.sourceRef}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-[#E8DFC8] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1F1B16] hover:bg-[#382E22] rounded-lg transition-colors cursor-pointer"
              >
                Tutup Cerito
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
