import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart3,
  ImageIcon,
  TrendingUp,
  Leaf,
  Users,
  ArrowRight,
  ShieldCheck,
  Laptop,
  HeartHandshake,
  BookOpen
} from 'lucide-react';
import { INITIAL_HIGHLIGHTS } from '../data/initialData';

// Direct ES Module imports ensuring Vite bundles assets properly without 404s
import smartworkPhoto from '../assets/images/smartwork_korean_team_1794460532171.jpg';
import esgPhoto from '../assets/images/esg_korean_campaign_1794460532534.jpg';
import easyGuidePhoto from '../assets/images/easy_guide_korean_1794460532508.jpg';

export const HighlightsSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'photo' | 'graph'>('photo');
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const stories = INITIAL_HIGHLIGHTS;
  const currentStory = stories[activeStoryIndex];

  // Matched photos
  const storyPhotos = [smartworkPhoto, esgPhoto, easyGuidePhoto];
  const currentPhoto = storyPhotos[activeStoryIndex];
  const isImageBroken = imageErrorMap[activeStoryIndex];

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

        {/* 3 Story Selector Tabs */}
        <div className="flex flex-col md:flex-row gap-3 mb-10 pb-6 border-b border-white/10">
          {stories.map((story, idx) => {
            const isSelected = activeStoryIndex === idx;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`flex-1 p-4 rounded-lg text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-white/10 text-white border-[#C4A875] shadow-md'
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
          {/* Left Column: Visual Area with [사진] / [성과 그래프] Toggle (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* View Mode Toggle: [📷 현장 사진] vs [📊 성과 그래프] */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-stone-400 font-medium">시각 자료 선택:</span>
                <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1 rounded transition-colors flex items-center gap-1 font-medium ${
                      viewMode === 'photo'
                        ? 'bg-[#C4A875] text-[#102138] font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>현장 사진</span>
                  </button>
                  <button
                    onClick={() => setViewMode('graph')}
                    className={`px-3 py-1 rounded transition-colors flex items-center gap-1 font-medium ${
                      viewMode === 'graph'
                        ? 'bg-[#527DA1] text-white font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>성과 그래프</span>
                  </button>
                </div>
              </div>

              {/* Main Visual Display Frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 aspect-[4/3] flex flex-col">
                {viewMode === 'photo' && !isImageBroken ? (
                  /* 1. KOREAN STAFF HIGH-RESOLUTION PHOTO */
                  <div className="relative w-full h-full">
                    <img
                      src={currentPhoto}
                      alt={currentStory.title}
                      referrerPolicy="no-referrer"
                      onError={() => {
                        setImageErrorMap((prev) => ({ ...prev, [activeStoryIndex]: true }));
                        setViewMode('graph');
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102138]/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 text-xs text-stone-200">
                      <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs text-[11px] font-semibold text-[#C4A875]">
                        수원시장애인종합복지관 현장 실천 모습
                      </span>
                    </div>
                  </div>
                ) : (
                  /* 2. MATCHED QUANTITATIVE GRAPH / INFOGRAPHIC */
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#182E47] to-[#102138]">
                    {activeStoryIndex === 0 && (
                      /* GRAPH 1: 조직성장위원회 (스마트워크 & 87.5% 인식 변화) */
                      <div className="space-y-4 my-auto">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-xs font-bold text-[#527DA1] uppercase tracking-wider">
                            ORGANIZATIONAL GROWTH
                          </span>
                          <span className="text-xs font-mono text-stone-400">부서 간 교류 & 스마트워크</span>
                        </div>

                        {/* Big Metric Display */}
                        <div className="flex items-baseline justify-between pt-1">
                          <div>
                            <span className="text-xs text-stone-300 block mb-1">부서 간 긍정적 인식 변화</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl md:text-5xl font-bold font-editorial text-[#C4A875]">
                                87.5%
                              </span>
                              <span className="text-sm font-semibold text-stone-300">달성</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-[#527DA1]/30 border border-[#527DA1] flex items-center justify-center text-[#C4A875]">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Process Flow Comparison */}
                        <div className="p-3.5 rounded-lg bg-black/30 border border-white/10 space-y-2">
                          <span className="text-[11px] font-bold text-stone-300 block">
                            업무 처리 프로세스 혁신:
                          </span>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-stone-400">종이 수기 작성 4단계</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C4A875]" />
                            <span className="font-bold text-emerald-400">웹앱 1단계 실시간 자동집계</span>
                          </div>
                        </div>

                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#C4A875] w-[87.5%]" />
                        </div>
                      </div>
                    )}

                    {activeStoryIndex === 1 && (
                      /* GRAPH 2: ESG위원회 (텀블러 +80.3%, 잔반 -70%) */
                      <div className="space-y-4 my-auto">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-xs font-bold text-[#5F866B] uppercase tracking-wider">
                            ESG SUSTAINABILITY
                          </span>
                          <span className="text-xs font-mono text-stone-400">친환경 & 상호존중</span>
                        </div>

                        {/* Dual Bar Charts */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <span className="text-[11px] text-stone-300 block mb-1">텀블러 사용 횟수</span>
                            <span className="text-3xl font-bold font-editorial text-[#5F866B]">
                              +80.3%
                            </span>
                            <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-[#5F866B] w-[80%]" />
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <span className="text-[11px] text-stone-300 block mb-1">잔반 발생량</span>
                            <span className="text-3xl font-bold font-editorial text-[#C4A875]">
                              -70%
                            </span>
                            <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-[#C4A875] w-[70%]" />
                            </div>
                          </div>
                        </div>

                        {/* Respect Campaign Indicators */}
                        <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/10">
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>인사 · 감사 · 칭찬 캠페인 전사 전개</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {activeStoryIndex === 2 && (
                      /* GRAPH 3: 발달장애인지원위원회 (쉬운 안내서 10부 + e-book + 공간안내) */
                      <div className="space-y-4 my-auto">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-xs font-bold text-[#BC925C] uppercase tracking-wider">
                            INFORMATION ACCESSIBILITY
                          </span>
                          <span className="text-xs font-mono text-stone-400">발달장애인 알 권리</span>
                        </div>

                        {/* Metric Highlights */}
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-stone-300 block">쉬운 이용안내서 1종 발간</span>
                              <span className="text-sm font-bold text-white">인쇄물 10부 복지관 비치 · 디지털 e-book</span>
                            </div>
                            <BookOpen className="w-5 h-5 text-[#BC925C]" />
                          </div>

                          <div className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-stone-300 block">쉬운 공간안내 시스템</span>
                              <span className="text-sm font-bold text-white">프로그램실별 픽토그램 동선 안내 전면 부착</span>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          </div>
                        </div>

                        <div className="text-[11px] text-stone-300 bg-white/5 p-2 rounded text-center">
                          어려운 문자 중심 → 당사자 눈높이의 쉬운 그림 기호(픽토그램)로 전환
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Caption Under Image */}
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
                onClick={() => {
                  setActiveStoryIndex((prev) => Math.max(0, prev - 1));
                  setViewMode('photo');
                }}
                className="hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors py-1 px-2"
              >
                ← 이전 사례
              </button>
              <div className="flex gap-1.5">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStoryIndex(i);
                      setViewMode('photo');
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStoryIndex === i ? 'bg-[#C4A875] w-6' : 'bg-white/20'
                    }`}
                    aria-label={`사례 ${i + 1}`}
                  />
                ))}
              </div>
              <button
                disabled={activeStoryIndex === stories.length - 1}
                onClick={() => {
                  setActiveStoryIndex((prev) => Math.min(stories.length - 1, prev + 1));
                  setViewMode('photo');
                }}
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
