import React, { useState } from 'react';
import { Voice } from '../types';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { COMMITTEES } from '../data/initialData';

interface VoicesSectionProps {
  voices: Voice[];
}

export const VoicesSection: React.FC<VoicesSectionProps> = ({ voices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!voices || voices.length === 0) {
    return null; // Gracefully hidden if no voices
  }

  const currentVoice = voices[currentIndex];
  const commInfo = COMMITTEES[currentVoice.committee];

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? voices.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === voices.length - 1 ? 0 : c + 1));
  };

  return (
    <section id="voices" className="py-24 md:py-32 bg-white text-[#102138] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>08</span>
            <span>·</span>
            <span>OUR VOICES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#102138] mb-6 font-display leading-tight">
            변화를 만든 사람들의 이야기
          </h2>
          <p className="text-base md:text-lg text-stone-700 leading-relaxed font-normal">
            직원위원회를 통해 동료와 함께 배우고 실천하며 느낀 참여 직원들의 진솔한 소감과 목소리를 나눕니다.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-[#F7F5F0] rounded-2xl border border-stone-200 p-8 md:p-14 shadow-sm relative overflow-hidden">
          <Quote className="absolute top-8 right-8 w-20 h-20 text-[#C4A875]/15 pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            {/* Committee Tag */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="text-xs font-bold uppercase tracking-wider font-display px-2.5 py-1 rounded bg-white border border-stone-200"
                style={{ color: commInfo?.hex || '#102138' }}
              >
                {commInfo?.name || currentVoice.committee}
              </span>
              <span className="text-xs text-stone-400">참여 직원 소감</span>
            </div>

            {/* Title Quote */}
            <h3 className="text-2xl md:text-3xl font-bold text-[#102138] mb-6 font-display leading-snug">
              {currentVoice.title}
            </h3>

            {/* Content paragraph */}
            <p className="text-base md:text-lg text-stone-700 leading-relaxed font-normal mb-8">
              "{currentVoice.content}"
            </p>

            {/* Author Profile Lockup */}
            <div className="flex items-center gap-3 pt-6 border-t border-stone-300/80">
              {currentVoice.profilePhotoUrl ? (
                <img
                  src={currentVoice.profilePhotoUrl}
                  alt={currentVoice.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5 text-stone-600" />
                </div>
              )}
              <div>
                <span className="text-sm font-bold text-[#102138] block">
                  {currentVoice.name}
                </span>
                <span className="text-xs text-stone-500">
                  수원시장애인종합복지관 직원위원회
                </span>
              </div>
            </div>
          </div>

          {/* Slider Arrows & Dots */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 flex items-center justify-between">
            <div className="flex gap-2">
              {voices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'bg-[#102138] w-8' : 'bg-stone-300 w-2 hover:bg-stone-400'
                  }`}
                  aria-label={`소감 ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102138]"
                aria-label="이전 소감"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-stone-500 px-1">
                {currentIndex + 1} / {voices.length}
              </span>
              <button
                onClick={next}
                className="p-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102138]"
                aria-label="다음 소감"
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
