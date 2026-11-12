import React, { useState } from 'react';
import { HighlightStory } from '../types';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { INITIAL_HIGHLIGHTS } from '../data/initialData';

export const HighlightsSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const stories = INITIAL_HIGHLIGHTS;
  const currentStory = stories[activeStoryIndex];

  return (
    <section id="highlights" className="py-24 md:py-32 bg-[#102138] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>06</span>
            <span>·</span>
            <span>HIGHLIGHTS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display leading-tight">
            변화는 실천의 결과로 나타났습니다.
          </h2>
          <p className="text-base md:text-lg text-stone-300 font-normal leading-relaxed">
            단순한 활동 나열을 넘어, 현장의 문제의식에서 시작하여 구체적인 제도와 서비스의 변화로 이어진 3대 대표 혁신 사례를 소개합니다.
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex flex-col md:flex-row gap-3 mb-10 pb-6 border-b border-white/10">
          {stories.map((story, idx) => {
            const isSelected = activeStoryIndex === idx;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`flex-1 p-4 rounded text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-white/10 text-white border-[#C4A875] shadow'
                    : 'bg-transparent text-stone-400 border-white/5 hover:border-white/20 hover:text-stone-200'
                }`}
              >
                <div className="text-[11px] font-mono text-[#C4A875] mb-1">
                  CASE 0{idx + 1}
                </div>
                <div className="text-sm font-bold text-white line-clamp-1">
                  {story.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Highlight Story Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Visual Asset & Editorial Caption (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-[4/3]">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102138] via-transparent to-transparent opacity-60" />
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-stone-400 flex items-center justify-between">
              <span>{currentStory.imageCaption}</span>
              <span className="font-mono text-stone-500">CASE 0{activeStoryIndex + 1} / 03</span>
            </div>
          </div>

          {/* Right Column: Problem - Action - Result Storytelling (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C4A875] font-semibold block mb-2">
                FLAGSHIP STORY 0{activeStoryIndex + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display">
                {currentStory.title}
              </h3>
              <p className="text-sm md:text-base text-stone-300 font-medium mb-6">
                {currentStory.subtitle}
              </p>
            </div>

            {/* Structured 3-Tier Grid */}
            <div className="space-y-4">
              {/* Background */}
              <div className="p-5 rounded-lg bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>개선이 필요했던 배경</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  {currentStory.background}
                </p>
              </div>

              {/* Action */}
              <div className="p-5 rounded-lg bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C4A875] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>직원위원회의 실천 내용</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  {currentStory.action}
                </p>
              </div>

              {/* Result */}
              <div className="p-5 rounded-lg bg-[#527DA1]/15 border border-[#527DA1]/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C4A875] mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>실제 변화와 성과</span>
                </div>
                <p className="text-sm text-stone-200 leading-relaxed font-normal">
                  {currentStory.result}
                </p>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
              <button
                disabled={activeStoryIndex === 0}
                onClick={() => setActiveStoryIndex((prev) => Math.max(0, prev - 1))}
                className="hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors py-1 px-2"
              >
                ← 이전 사례
              </button>
              <div className="flex gap-1.5">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStoryIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStoryIndex === i ? 'bg-[#C4A875] w-6' : 'bg-white/20'
                    }`}
                    aria-label={`사례 ${i + 1}`}
                  />
                ))}
              </div>
              <button
                disabled={activeStoryIndex === stories.length - 1}
                onClick={() => setActiveStoryIndex((prev) => Math.min(stories.length - 1, prev + 1))}
                className="hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors py-1 px-2"
              >
                다음 사례 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
