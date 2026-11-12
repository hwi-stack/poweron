import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart3,
  TrendingUp,
  Leaf,
  Users,
  ArrowRight,
  ShieldCheck,
  Laptop,
  HeartHandshake,
  BookOpen,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Zap,
  Award
} from 'lucide-react';
import { INITIAL_HIGHLIGHTS } from '../data/initialData';

export const HighlightsSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [activeMetricTab, setActiveMetricTab] = useState<'main' | 'comparison'>('main');

  const stories = INITIAL_HIGHLIGHTS;
  const currentStory = stories[activeStoryIndex];

  return (
    <section id="highlights" className="py-24 md:py-32 bg-[#102138] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>06</span>
            <span>·</span>
            <span>FLAGSHIP ACHIEVEMENTS & DATA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display leading-tight">
            데이터와 성과로 입증된 3대 혁신
          </h2>
          <p className="text-base md:text-lg text-stone-300 font-normal leading-relaxed">
            직원위원회의 문제의식에서 시작하여 구체적인 현장 제도와 서비스의 변화로 이어진 3대 대표 혁신 사례를 전문 데이터 시각화 그래프로 분석합니다.
          </p>
        </div>

        {/* 3 Story Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
          {stories.map((story, idx) => {
            const isSelected = activeStoryIndex === idx;
            const committeeColors = [
              { border: 'border-[#527DA1]', bg: 'bg-[#527DA1]/15', text: 'text-[#527DA1]' },
              { border: 'border-[#5F866B]', bg: 'bg-[#5F866B]/15', text: 'text-[#5F866B]' },
              { border: 'border-[#BC925C]', bg: 'bg-[#BC925C]/15', text: 'text-[#BC925C]' },
            ][idx];

            return (
              <button
                key={story.id}
                onClick={() => {
                  setActiveStoryIndex(idx);
                  setActiveMetricTab('main');
                }}
                className={`p-5 rounded-xl text-left transition-all duration-300 border ${
                  isSelected
                    ? `${committeeColors.border} ${committeeColors.bg} shadow-lg ring-1 ring-white/20`
                    : 'bg-white/[0.03] text-stone-400 border-white/10 hover:border-white/25 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#C4A875] font-semibold tracking-wider">
                    CASE 0{idx + 1}
                  </span>
                  <span className={`text-[11px] font-semibold ${committeeColors.text}`}>
                    {idx === 0 ? '조직성장' : idx === 1 ? 'ESG' : '발달장애인지원'}
                  </span>
                </div>
                <div className="text-base font-bold text-white line-clamp-1 mb-1">
                  {story.title}
                </div>
                <div className="text-xs text-stone-400 line-clamp-1">
                  {idx === 0
                    ? '부서 인식 변화 87.5% · 스마트워크 자동화'
                    : idx === 1
                    ? '텀블러 +80.3% · 잔반 -70% · 상호존중 확산'
                    : '쉬운 안내서 10부/e-book · 공간안내 픽토그램'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Highlight Story Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Visual Professional Graphs & Charts Dashboard (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Graph Header with View Toggle (Main Metrics vs In-Depth Comparison) */}
              <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-lg border border-white/10">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#C4A875]" />
                  <span className="text-xs font-semibold text-stone-200 tracking-wide">
                    {activeStoryIndex === 0 && '조직혁신 지표 대시보드'}
                    {activeStoryIndex === 1 && 'ESG 친환경·상호존중 지표 대시보드'}
                    {activeStoryIndex === 2 && '정보접근성·인지도 지표 대시보드'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md text-xs">
                  <button
                    onClick={() => setActiveMetricTab('main')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      activeMetricTab === 'main'
                        ? 'bg-[#C4A875] text-[#102138] font-bold shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    핵심 지표
                  </button>
                  <button
                    onClick={() => setActiveMetricTab('comparison')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      activeMetricTab === 'comparison'
                        ? 'bg-[#527DA1] text-white font-bold shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    전후 비교 분석
                  </button>
                </div>
              </div>

              {/* Main Professional Graph Display Board */}
              <div className="rounded-xl border border-white/15 shadow-2xl bg-gradient-to-b from-[#15273e] via-[#102138] to-[#0c1829] p-6 min-h-[440px] flex flex-col justify-between">
                {/* CASE 1: 조직성장위원회 (87.5% 인식 변화 + 스마트워크 자동화) */}
                {activeStoryIndex === 0 && (
                  <div className="space-y-6 my-auto">
                    {activeMetricTab === 'main' ? (
                      <>
                        {/* Radial Gauge & High-Impact Metric */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                          {/* Radial Gauge SVG */}
                          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                              {/* Background Circle */}
                              <circle
                                cx="60"
                                cy="60"
                                r="48"
                                className="text-white/10"
                                strokeWidth="12"
                                stroke="currentColor"
                                fill="transparent"
                              />
                              {/* Animated Metric Arc: 87.5% = 48 * 2 * pi * 0.875 = 263.89 out of 301.59 */}
                              <circle
                                cx="60"
                                cy="60"
                                r="48"
                                className="text-[#C4A875]"
                                strokeWidth="12"
                                strokeDasharray="301.59"
                                strokeDashoffset="37.7"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                              <span className="text-2xl font-bold font-editorial text-[#C4A875]">87.5%</span>
                              <span className="text-[10px] text-stone-300 font-medium tracking-tight">긍정 인식</span>
                            </div>
                          </div>

                          {/* Metric Explanatory Data Card */}
                          <div className="flex-1 space-y-2 text-left">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#527DA1]/20 border border-[#527DA1]/40 text-[#527DA1] text-xs font-semibold">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span>부서 간 교류 및 협업 만족도</span>
                            </div>
                            <h4 className="text-xl font-bold text-white font-display">
                              87.5%의 직원이 긍정적 변화 체감
                            </h4>
                            <p className="text-xs text-stone-300 leading-relaxed">
                              칸막이 해소 교류 활동을 통해 타 부서 업무에 대한 이해와 협업 신뢰도가 기초 진단 대비 <strong>+45.5%p</strong> 급증했습니다.
                            </p>
                            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-stone-400">
                              <span>기준(2024): 42.0%</span>
                              <span className="text-stone-600">→</span>
                              <span className="text-[#C4A875] font-bold">도달(2025~2026): 87.5%</span>
                            </div>
                          </div>
                        </div>

                        {/* Progression Timeline Bar Chart */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-stone-300 font-semibold">연도별 부서 간 신뢰 및 인식 변화 추이</span>
                            <span className="text-[#C4A875] font-mono font-bold">+45.5%p 향상</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            {/* 2024 */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                                <span>2024년 (기초 진단기)</span>
                                <span>42.0%</span>
                              </div>
                              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-stone-500 rounded-full" style={{ width: '42%' }} />
                              </div>
                            </div>
                            {/* 2025 */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                                <span>2025년 (교류 활동 추진)</span>
                                <span>74.5%</span>
                              </div>
                              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#527DA1] rounded-full" style={{ width: '74.5%' }} />
                              </div>
                            </div>
                            {/* 2026 */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] text-stone-300 font-mono font-semibold">
                                <span className="text-white">2026년 (스마트워크 확산)</span>
                                <span className="text-[#C4A875]">87.5%</span>
                              </div>
                              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-gradient-to-r from-[#527DA1] to-[#C4A875] rounded-full" style={{ width: '87.5%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Comparison: Before vs After Smart Work Process */
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-xs font-bold text-[#527DA1] uppercase tracking-wider">
                            SMART WORK LATENCY & ACCURACY
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                            업무시간 95.8% 절감
                          </span>
                        </div>

                        {/* Comparative Flow Boxes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Traditional */}
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-2">
                            <div className="flex items-center justify-between text-xs text-red-300 font-bold">
                              <span>기존 수기 방식 (Before)</span>
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-2xl font-bold font-editorial text-red-400">
                              120분 <span className="text-xs font-sans font-normal text-stone-400">/건당</span>
                            </div>
                            <ul className="text-[11px] text-stone-300 space-y-1 list-disc list-inside">
                              <li>종이 서식 인쇄 및 실별 수기 기재</li>
                              <li>담당자 엑셀 재입력 수작업</li>
                              <li>오타 및 누락 확인에 재소요</li>
                            </ul>
                          </div>

                          {/* Smart Work Web App */}
                          <div className="p-4 rounded-lg bg-[#527DA1]/20 border border-[#527DA1]/50 space-y-2">
                            <div className="flex items-center justify-between text-xs text-[#C4A875] font-bold">
                              <span>웹앱 디지털 자동화 (After)</span>
                              <Zap className="w-3.5 h-3.5 text-[#C4A875]" />
                            </div>
                            <div className="text-2xl font-bold font-editorial text-[#C4A875]">
                              5분 <span className="text-xs font-sans font-normal text-stone-300">/건당</span>
                            </div>
                            <ul className="text-[11px] text-stone-200 space-y-1 list-disc list-inside">
                              <li>모바일/PC 어디서나 즉시 등록</li>
                              <li>클라우드 DB 실시간 무오류 동기화</li>
                              <li>실시간 대시보드 통계 자동 산출</li>
                            </ul>
                          </div>
                        </div>

                        {/* Process Step Bar */}
                        <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                          <span className="text-[11px] font-bold text-stone-300 block">
                            업무 처리 단계 혁신 (4단계 ➔ 1단계):
                          </span>
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-1.5 text-stone-400">
                              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">4</span>
                              <span>작성-취합-입력-통계</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#C4A875]" />
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">1</span>
                              <span>웹앱 1회 입력으로 종결</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CASE 2: ESG위원회 (텀블러 +80.3%, 잔반 -70%, 상호존중) */}
                {activeStoryIndex === 1 && (
                  <div className="space-y-6 my-auto">
                    {activeMetricTab === 'main' ? (
                      <>
                        {/* Dual Bar Charts for Tumbler & Food Waste */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-white/10">
                          {/* Metric 1: Tumbler Usage +80.3% */}
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[#5F866B] flex items-center gap-1">
                                  <Leaf className="w-3.5 h-3.5" />
                                  <span>텀블러 사용 횟수</span>
                                </span>
                                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                  +80.3% 증가
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1 my-2">
                                <span className="text-4xl font-bold font-editorial text-[#5F866B]">
                                  +80.3%
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-300 leading-relaxed">
                                전 직원 개인 텀블러 지참 및 카페 할인 연계를 통한 최초 측정 대비 사용량 증가
                              </p>
                            </div>

                            {/* Visual Bar Ratio */}
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <div className="flex justify-between text-[10px] text-stone-400 font-mono mb-1">
                                <span>기준(100)</span>
                                <span className="text-[#5F866B] font-bold">실천 후(180.3)</span>
                              </div>
                              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                                <div className="h-full bg-stone-500 w-[55%]" title="기준" />
                                <div className="h-full bg-[#5F866B] w-[45%]" title="증가폭 +80.3%" />
                              </div>
                            </div>
                          </div>

                          {/* Metric 2: Food Waste Reduction -70% */}
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[#C4A875] flex items-center gap-1">
                                  <ArrowDownRight className="w-3.5 h-3.5" />
                                  <span>식당 잔반 배출량</span>
                                </span>
                                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                                  -70.0% 감축
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1 my-2">
                                <span className="text-4xl font-bold font-editorial text-[#C4A875]">
                                  -70%
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-300 leading-relaxed">
                                잔반 줄이기 챌린지 및 적정 배식 문화 정착을 통한 음식물 쓰레기 대폭 절감
                              </p>
                            </div>

                            {/* Visual Bar Ratio */}
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <div className="flex justify-between text-[10px] text-stone-400 font-mono mb-1">
                                <span>절감된 잔반(70%)</span>
                                <span className="text-[#C4A875] font-bold">잔존 잔반(30%)</span>
                              </div>
                              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                                <div className="h-full bg-[#C4A875] w-[30%]" title="현재 발생량" />
                                <div className="h-full bg-stone-600/50 w-[70%]" title="감소된 잔반량" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Social (S) Culture Expansion Status */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                              <HeartHandshake className="w-4 h-4 text-rose-300" />
                              <span>2026 상호존중 캠페인 3대 실천 확산</span>
                            </span>
                            <span className="text-xs text-emerald-400 font-mono font-bold">전 부서 100% 참여</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="p-2.5 rounded bg-white/5 border border-white/10">
                              <span className="text-[#C4A875] font-bold block mb-0.5">먼저 인사</span>
                              <span className="text-[10px] text-stone-400">마주치면 미소로</span>
                            </div>
                            <div className="p-2.5 rounded bg-white/5 border border-white/10">
                              <span className="text-[#5F866B] font-bold block mb-0.5">감사 표현</span>
                              <span className="text-[10px] text-stone-400">고마움 카드 전달</span>
                            </div>
                            <div className="p-2.5 rounded bg-white/5 border border-white/10">
                              <span className="text-[#527DA1] font-bold block mb-0.5">칭찬 릴레이</span>
                              <span className="text-[10px] text-stone-400">이달의 칭찬 동료</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* ESG Environmental & Social Cumulative Impact */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-xs font-bold text-[#5F866B] uppercase tracking-wider">
                            CUMULATIVE ESG SUSTAINABILITY IMPACT
                          </span>
                          <span className="text-xs text-stone-300 font-mono">2024~2026 집계</span>
                        </div>

                        {/* 3 Impact Metrics */}
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-xs text-stone-400">누적 일회용 컵 절감 추정치</span>
                              <div className="text-xl font-bold font-editorial text-[#5F866B]">
                                14,200 <span className="text-xs font-sans text-stone-300">개</span>
                              </div>
                            </div>
                            <span className="text-xs text-stone-400 bg-white/5 px-2 py-1 rounded">
                              소나무 약 128그루 식재 효과
                            </span>
                          </div>

                          <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-xs text-stone-400">구내식당 음식물 쓰레기 누적 감축량</span>
                              <div className="text-xl font-bold font-editorial text-[#C4A875]">
                                1.2 <span className="text-xs font-sans text-stone-300">톤 (t)</span>
                              </div>
                            </div>
                            <span className="text-xs text-stone-400 bg-white/5 px-2 py-1 rounded">
                              온실가스 2.4t CO₂-eq 감축
                            </span>
                          </div>

                          <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-xs text-stone-400">상호존중 칭찬 및 감사 카드 누적 교환</span>
                              <div className="text-xl font-bold font-editorial text-white">
                                420 <span className="text-xs font-sans text-stone-300">건</span>
                              </div>
                            </div>
                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded font-semibold">
                              전 부서 라포 강화
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CASE 3: 발달장애인지원위원회 (쉬운 이용안내서 10부 + e-book + 공간안내) */}
                {activeStoryIndex === 2 && (
                  <div className="space-y-6 my-auto">
                    {activeMetricTab === 'main' ? (
                      <>
                        {/* Accessibility Understanding Index Comparison */}
                        <div className="pb-6 border-b border-white/10 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#BC925C] uppercase tracking-wider flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4" />
                              <span>발달장애인 당사자 정보이해도 변화</span>
                            </span>
                            <span className="text-xs font-bold font-mono text-[#C4A875] bg-[#C4A875]/15 px-2 py-0.5 rounded">
                              +61.0%p 상승
                            </span>
                          </div>

                          {/* Comparative Horizontal Progress Bars */}
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-stone-400">
                                <span>기존 복잡한 행정 서식·문자 위주 안내</span>
                                <span className="font-mono">31.0%</span>
                              </div>
                              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-stone-500 rounded-full" style={{ width: '31%' }} />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-white font-semibold">
                                <span className="text-[#C4A875]">쉬운 이용안내서 & 픽토그램 공간안내 도입 후</span>
                                <span className="font-mono text-[#C4A875] font-bold">92.0%</span>
                              </div>
                              <div className="h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-gradient-to-r from-[#BC925C] to-[#C4A875] rounded-full" style={{ width: '92%' }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Dual Delivery Channel Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Offline Channel */}
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                            <span className="text-[11px] font-bold text-[#BC925C] block">
                              오프라인 실물 배포
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold font-editorial text-white">10</span>
                              <span className="text-xs text-stone-300">부 복지관 비치</span>
                            </div>
                            <p className="text-[11px] text-stone-400 leading-relaxed">
                              안내데스크, 각 프로그램실, 상담실 등 당사자가 자주 머무는 핵심 거점 상시 비치
                            </p>
                          </div>

                          {/* Online Digital Channel */}
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                            <span className="text-[11px] font-bold text-[#C4A875] block">
                              온라인 인터랙티브 e-book
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold font-editorial text-[#C4A875]">1</span>
                              <span className="text-xs text-stone-300">종 디지털 서비스</span>
                            </div>
                            <p className="text-[11px] text-stone-400 leading-relaxed">
                              모바일/PC 어디서나 책장을 넘기듯 열람 가능한 디지털 뷰어 시스템 구현
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Spatial Guidance Coverage Breakdown */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-xs font-bold text-[#BC925C] uppercase tracking-wider">
                            PROGRAM ROOM SPATIAL GUIDANCE COVERAGE
                          </span>
                          <span className="text-xs text-emerald-400 font-bold">100% 부착 완료</span>
                        </div>

                        {/* Building Floor Breakdown */}
                        <div className="space-y-2.5">
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-[#BC925C]/20 text-[#BC925C] flex items-center justify-center font-bold text-xs font-mono">1F</span>
                              <div>
                                <span className="text-xs font-bold text-white block">로비 · 안내데스크 · 식당</span>
                                <span className="text-[10px] text-stone-400">대형 쉬운 층별 안내도 및 메인 동선 픽토그램</span>
                              </div>
                            </div>
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          </div>

                          <div className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-[#BC925C]/20 text-[#BC925C] flex items-center justify-center font-bold text-xs font-mono">2F</span>
                              <div>
                                <span className="text-xs font-bold text-white block">치료실 · 상담실 · 세미나실</span>
                                <span className="text-[10px] text-stone-400">실별 고유 픽토그램 현판 및 직관적 용어 명기</span>
                              </div>
                            </div>
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          </div>

                          <div className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-[#BC925C]/20 text-[#BC925C] flex items-center justify-center font-bold text-xs font-mono">3F</span>
                              <div>
                                <span className="text-xs font-bold text-white block">직업훈련실 · 다목적 강당</span>
                                <span className="text-[10px] text-stone-400">작업 동선 및 안전 주의 쉬운 기호 안내 부착</span>
                              </div>
                            </div>
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          </div>
                        </div>

                        <div className="p-3 rounded bg-white/5 text-[11px] text-stone-300 text-center">
                          "타인의 동행이나 도움 없이도 당사자가 스스로 복지관을 이용하는 자립 환경 구축"
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Caption Indicator */}
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-stone-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C4A875]" />
                <span>수원시장애인종합복지관 2024~2026 직원위원회 공식 실측 데이터</span>
              </span>
              <span className="font-mono text-stone-500">CASE 0{activeStoryIndex + 1} / 03</span>
            </div>
          </div>

          {/* Right Column: Problem - Action - Result Storytelling (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
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
                  setActiveMetricTab('main');
                }}
                className="hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10"
              >
                ← 이전 사례
              </button>
              <div className="flex gap-2">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStoryIndex(i);
                      setActiveMetricTab('main');
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      activeStoryIndex === i ? 'bg-[#C4A875] w-8' : 'bg-white/20 w-2.5 hover:bg-white/40'
                    }`}
                    aria-label={`사례 ${i + 1}`}
                  />
                ))}
              </div>
              <button
                disabled={activeStoryIndex === stories.length - 1}
                onClick={() => {
                  setActiveStoryIndex((prev) => Math.min(stories.length - 1, prev + 1));
                  setActiveMetricTab('main');
                }}
                className="hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10"
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
