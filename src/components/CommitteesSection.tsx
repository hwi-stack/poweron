import React, { useState } from 'react';
import {
  TrendingUp,
  Leaf,
  Users,
  BookOpen,
  ArrowRight,
  Check,
  Laptop,
  HeartHandshake,
  FileText,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { CommitteeType } from '../types';

interface CommitteesSectionProps {
  onOpenEasyGuide: () => void;
}

export const CommitteesSection: React.FC<CommitteesSectionProps> = ({ onOpenEasyGuide }) => {
  const [activeTab, setActiveTab] = useState<CommitteeType>('growth');
  const [beforeAfterMode, setBeforeAfterMode] = useState<'after' | 'before'>('after');

  return (
    <section id="committees" className="py-24 md:py-32 bg-white text-[#102138] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>05</span>
            <span>·</span>
            <span>THREE COMMITTEES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#102138] mb-6 font-display leading-tight">
            세 가지 실천, 하나의 변화
          </h2>
          <p className="text-base md:text-lg text-stone-700 leading-relaxed font-normal">
            조직성장위원회, ESG위원회, 발달장애인지원위원회는 각자의 전문 영역에서 현장의 문제를 주도적으로 풀어나가며 복지관의 통합적 혁신을 이끌어갑니다.
          </p>
        </div>

        {/* 3 Committee Selector Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          {/* Tab 1 */}
          <button
            onClick={() => setActiveTab('growth')}
            className={`flex-1 p-5 rounded-lg text-left transition-all duration-300 border ${
              activeTab === 'growth'
                ? 'bg-[#527DA1] text-white border-[#527DA1] shadow-md'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                조직문화 · 스마트워크
              </span>
              <TrendingUp className="w-4 h-4 opacity-80" />
            </div>
            <h3 className="text-lg md:text-xl font-bold font-display">조직성장위원회</h3>
            <p className={`text-xs mt-1 ${activeTab === 'growth' ? 'text-stone-100' : 'text-stone-500'}`}>
              더 나은 일하는 방식을 만들어갑니다.
            </p>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => setActiveTab('esg')}
            className={`flex-1 p-5 rounded-lg text-left transition-all duration-300 border ${
              activeTab === 'esg'
                ? 'bg-[#5F866B] text-white border-[#5F866B] shadow-md'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                친환경 · 상호존중
              </span>
              <Leaf className="w-4 h-4 opacity-80" />
            </div>
            <h3 className="text-lg md:text-xl font-bold font-display">ESG위원회</h3>
            <p className={`text-xs mt-1 ${activeTab === 'esg' ? 'text-stone-100' : 'text-stone-500'}`}>
              일상의 작은 실천이 지속가능한 변화를 만듭니다.
            </p>
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => setActiveTab('developmental')}
            className={`flex-1 p-5 rounded-lg text-left transition-all duration-300 border ${
              activeTab === 'developmental'
                ? 'bg-[#BC925C] text-white border-[#BC925C] shadow-md'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                정보접근권 · 쉬운 안내
              </span>
              <Users className="w-4 h-4 opacity-80" />
            </div>
            <h3 className="text-lg md:text-xl font-bold font-display">발달장애인지원위원회</h3>
            <p className={`text-xs mt-1 ${activeTab === 'developmental' ? 'text-stone-100' : 'text-stone-500'}`}>
              누구나 이해하고 이용할 수 있는 복지관을 만듭니다.
            </p>
          </button>
        </div>

        {/* Content Panel A: 조직성장위원회 */}
        {activeTab === 'growth' && (
          <div className="space-y-12">
            {/* Intro & 3-Year Progress */}
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 border border-stone-200">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#527DA1] mb-2 block">
                  COMMITTEE 01 · ORGANIZATIONAL GROWTH
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#102138] mb-3 font-display">
                  더 나은 일하는 방식을 만들어갑니다.
                </h3>
                <p className="text-base text-stone-700 leading-relaxed font-normal">
                  직원이 체감하는 조직의 문제를 함께 발견하고, 부서 간 이해와 협력을 넓히며,
                  스마트워크를 통한 업무혁신을 실천합니다.
                </p>
              </div>

              {/* 3-Year Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#527DA1] mb-1 block">2024년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">기초 진단 및 점검</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>조직문화, 업무시스템, 직원 성장환경 진단</li>
                    <li>조직의 강점과 구체적 개선 부분 점검</li>
                    <li>부서 간 소통 개선 과제 도출</li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#527DA1] mb-1 block">2025년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">부서 간 교류 활동</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>직종별·부서별 칸막이 해소 교류 활동</li>
                    <li>직원 간 이해와 협업 신뢰 강화</li>
                    <li><strong>부서 간 긍정적 인식 변화 87.5% 달성</strong></li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#527DA1] mb-1 block">2026년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">스마트워크 & 웹앱 개발</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>스마트워크 자체 스터디 결성 및 학습</li>
                    <li>반복적·비효율적 현장 행정 업무 개선</li>
                    <li>복지관 맞춤 업무 웹앱 직접 개발 및 현장 적용</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Before / After Interactive Widget for Web App */}
            <div className="bg-[#102138] text-white rounded-xl p-8 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-2">
                    <Laptop className="w-4 h-4" />
                    <span>SMART WORK INNOVATION · BEFORE & AFTER</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold font-display text-white">
                    웹앱 개발을 통한 업무방식의 진화
                  </h4>
                  <p className="text-xs md:text-sm text-stone-300 mt-1">
                    직원들이 직접 기획하고 개발한 맞춤형 웹앱으로 번거로운 수기 서식을 디지털 자동화로 전환했습니다.
                  </p>
                </div>

                {/* Toggle Controls */}
                <div className="flex items-center gap-1 p-1 bg-white/10 rounded-lg shrink-0">
                  <button
                    onClick={() => setBeforeAfterMode('before')}
                    className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                      beforeAfterMode === 'before'
                        ? 'bg-red-500/80 text-white shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    기존 업무방식 (Before)
                  </button>
                  <button
                    onClick={() => setBeforeAfterMode('after')}
                    className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                      beforeAfterMode === 'after'
                        ? 'bg-[#527DA1] text-white shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    개선된 웹앱 방식 (After)
                  </button>
                </div>
              </div>

              {/* Before / After Panels */}
              {beforeAfterMode === 'before' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded bg-white/5 border border-white/10">
                    <span className="text-xs text-red-400 font-semibold block mb-2">01. 서식 작성</span>
                    <h5 className="text-base font-bold mb-2">종이 서식 인쇄 및 수기 작성</h5>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      각 실별로 인쇄된 서류를 들고 다니며 현장에서 일일이 수기로 기재하고 결재란을 확인했습니다.
                    </p>
                  </div>
                  <div className="p-6 rounded bg-white/5 border border-white/10">
                    <span className="text-xs text-red-400 font-semibold block mb-2">02. 데이터 취합</span>
                    <h5 className="text-base font-bold mb-2">담당자 수작업 재입력</h5>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      모아진 종이 문서를 담당 직원이 엑셀에 한 줄씩 옮겨 적으며 오타와 누락의 위험이 상존했습니다.
                    </p>
                  </div>
                  <div className="p-6 rounded bg-white/5 border border-white/10">
                    <span className="text-xs text-red-400 font-semibold block mb-2">03. 결과 공유</span>
                    <h5 className="text-base font-bold mb-2">통계 산출 지연</h5>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      월말이나 분기말에 이르러서야 전체 현황을 파악할 수 있어 즉각적인 현장 피드백이 어려웠습니다.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded bg-[#527DA1]/20 border border-[#527DA1]/40">
                    <span className="text-xs text-[#C4A875] font-semibold block mb-2">01. 즉시 입력</span>
                    <h5 className="text-base font-bold mb-2">모바일 / PC 웹앱 즉시 등록</h5>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      모바일 브라우저나 데스크톱에서 누구나 몇 번의 터치로 손쉽게 데이터를 등록합니다.
                    </p>
                  </div>
                  <div className="p-6 rounded bg-[#527DA1]/20 border border-[#527DA1]/40">
                    <span className="text-xs text-[#C4A875] font-semibold block mb-2">02. 자동화 처리</span>
                    <h5 className="text-base font-bold mb-2">실시간 클라우드 자동 집계</h5>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      수작업 재입력 과정 없이 클라우드 데이터베이스에 즉시 동기화되어 오류가 원천 차단됩니다.
                    </p>
                  </div>
                  <div className="p-6 rounded bg-[#527DA1]/20 border border-[#527DA1]/40">
                    <span className="text-xs text-[#C4A875] font-semibold block mb-2">03. 실시간 공유</span>
                    <h5 className="text-base font-bold mb-2">실시간 대시보드 및 리포트</h5>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      필요할 때 언제든 실시간 현황을 차트로 확인하고, 절약된 시간은 이용자 서비스에 집중합니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Panel B: ESG위원회 */}
        {activeTab === 'esg' && (
          <div className="space-y-12">
            {/* Intro & 3-Year Progress */}
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 border border-stone-200">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5F866B] mb-2 block">
                  COMMITTEE 02 · ESG & SUSTAINABILITY
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#102138] mb-3 font-display">
                  일상의 작은 실천이 지속가능한 변화를 만듭니다.
                </h3>
                <p className="text-base text-stone-700 leading-relaxed font-normal">
                  친환경 실천을 시작으로 이용인과 직원이 함께 참여하는 상호존중 문화를 확산하며,
                  ESG의 가치를 일상 속 행동으로 연결합니다.
                </p>
              </div>

              {/* 3-Year Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#5F866B] mb-1 block">2024년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">환경 실태 진단</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>기관 내 환경영역 실천 수준 진단</li>
                    <li>친환경 실천과제 발굴 및 캠페인 설계</li>
                    <li>일회용품 및 잔반 감축 로드맵 수립</li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#5F866B] mb-1 block">2025년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">친환경 실천 캠페인</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>구내식당 잔반 줄이기 챌린지 <strong>(-70% 감소)</strong></li>
                    <li>전 직원 텀블러 사용 실천 <strong>(+80.3% 증가)</strong></li>
                    <li>올바른 분리수거 분리배출 캠페인</li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#5F866B] mb-1 block">2026년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">상호존중 캠페인 확산</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>인사 캠페인 (먼저 인사 건네기)</li>
                    <li>감사 캠페인 & 칭찬 캠페인 (칭찬 릴레이)</li>
                    <li>이용인과 직원의 상호존중 문화 조성</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Representative Achievement Data Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tumbler Card */}
              <div className="p-8 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <span className="font-semibold text-[#5F866B]">친환경 습관 실천</span>
                    <Leaf className="w-4 h-4 text-[#5F866B]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#102138] mb-2 font-display">
                    텀블러 사용 횟수 증가율
                  </h4>
                  <p className="text-xs text-stone-600 mb-6">
                    최초 측정 대비 직원 텀블러 사용 횟수 증가폭을 집계한 성과입니다.
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-[#5F866B] tabular-nums font-editorial">
                      +80.3%
                    </span>
                    <span className="text-sm font-semibold text-stone-600">증가</span>
                  </div>

                  {/* Visual Bar Graph */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-stone-500">
                      <span>최초 측정치 (기준)</span>
                      <span>캠페인 실천 후</span>
                    </div>
                    <div className="h-4 bg-stone-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-stone-300 w-[55%]" title="초기 기준치" />
                      <div className="h-full bg-[#5F866B] w-[45%]" title="증가폭 +80.3%" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 mt-6 pt-4 border-t border-stone-200">
                  * 텀블러 사용 횟수의 증가율이며, 현재 사용률이 80.3%를 뜻하는 것이 아닙니다.
                </p>
              </div>

              {/* Food Waste Reduction Card */}
              <div className="p-8 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <span className="font-semibold text-[#C4A875]">구내식당 자원 절감</span>
                    <ArrowDownRight className="w-4 h-4 text-[#C4A875]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#102138] mb-2 font-display">
                    잔반 발생량 감소율
                  </h4>
                  <p className="text-xs text-stone-600 mb-6">
                    전 직원 잔반 줄이기 챌린지 추진에 따른 음식물 쓰레기 배출 감축량입니다.
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-[#C4A875] tabular-nums font-editorial">
                      -70%
                    </span>
                    <span className="text-sm font-semibold text-stone-600">감소</span>
                  </div>

                  {/* Visual Bar Graph */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-stone-500">
                      <span>캠페인 전</span>
                      <span>감소된 발생량 (70% 절감)</span>
                    </div>
                    <div className="h-4 bg-stone-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#C4A875] w-[30%]" title="현재 발생량" />
                      <div className="h-full bg-stone-200 w-[70%]" title="감소된 잔반량 (70%)" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 mt-6 pt-4 border-t border-stone-200">
                  * 잔반 감축 캠페인을 통한 배출 발생량 감소 비율입니다.
                </p>
              </div>
            </div>

            {/* 2026 Mutual Respect Campaign Showcase */}
            <div className="p-8 rounded-xl bg-[#5F866B]/10 border border-[#5F866B]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F866B]">
                  2026 EXPANSION · MUTUAL RESPECT
                </span>
                <h4 className="text-xl font-bold text-[#102138] font-display">
                  인사 · 감사 · 칭찬 캠페인: 함께 웃는 복지관
                </h4>
                <p className="text-sm text-stone-700">
                  작은 환경 실천의 성공 경험을 바탕으로, 동료와 이용인이 서로를 존중하고 격려하는 따뜻한 문화로 발전시켰습니다.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <div className="px-3 py-1.5 rounded bg-white border border-stone-200 text-xs font-semibold text-[#5F866B]">
                  먼저 인사하기
                </div>
                <div className="px-3 py-1.5 rounded bg-white border border-stone-200 text-xs font-semibold text-[#5F866B]">
                  감사 나누기
                </div>
                <div className="px-3 py-1.5 rounded bg-white border border-stone-200 text-xs font-semibold text-[#5F866B]">
                  칭찬 릴레이
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Panel C: 발달장애인지원위원회 */}
        {activeTab === 'developmental' && (
          <div className="space-y-12">
            {/* Intro & 3-Year Progress */}
            <div className="bg-stone-50 rounded-xl p-8 md:p-10 border border-stone-200">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#BC925C] mb-2 block">
                  COMMITTEE 03 · ACCESSIBILITY & EMPOWERMENT
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#102138] mb-3 font-display">
                  누구나 이해하고 이용할 수 있는 복지관을 만듭니다.
                </h3>
                <p className="text-base text-stone-700 leading-relaxed font-normal">
                  발달장애인의 눈높이에서 정보와 이용환경을 다시 살펴보고, 쉽고 명확한 안내를 통해
                  정보접근성과 이용 편의를 높이고자 노력합니다.
                </p>
              </div>

              {/* 3-Year Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#BC925C] mb-1 block">2024년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">전문 스터디 및 진단</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>발달장애인 지원 관련 도서 정기 스터디</li>
                    <li>복지관 내 지원환경 및 정보전달 장벽 진단</li>
                    <li>쉬운 정보 제공을 위한 개선과제 논의</li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#BC925C] mb-1 block">2025년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">쉬운 이용안내서 발간</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li><strong>쉬운 이용안내서 1종</strong> 기획·제작</li>
                    <li>복지관 내 실물 인쇄물 10부 비치 및 배포</li>
                    <li>디지털 열람용 e-book 1종 제작 및 배포</li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-[#BC925C] mb-1 block">2026년</span>
                  <h4 className="text-base font-bold text-[#102138] mb-2">쉬운 공간안내 시스템</h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>프로그램실별 쉬운 공간안내서 제작 및 부착</li>
                    <li>발달장애인 친화적 픽토그램 동선 안내 체계화</li>
                    <li>이용인의 주체적 시설 이용 편의 대폭 강화</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Representative Achievement: Easy Guide Book & Interactive Reader CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#F7F5F0] rounded-xl p-8 md:p-12 border border-stone-200">
              {/* Visual Showcase */}
              <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-md group">
                <img
                  src="/src/assets/images/easy_guide_cover_1794458263505.jpg"
                  alt="수원시장애인종합복지관 쉬운 이용안내서"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-[#C4A875] font-semibold mb-1">
                    PUBLICATION ARCHIVE
                  </span>
                  <h4 className="text-xl font-bold font-display">
                    「쉬운 이용안내서」 책자 및 e-book
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    인쇄물 10부 복지관 비치 · 디지털 인터랙티브 e-book 동시 제공
                  </p>
                </div>
              </div>

              {/* Text & Action */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#BC925C] mb-2 block">
                    REPRESENTATIVE OUTCOME
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold text-[#102138] mb-3 font-display">
                    어려운 설명 대신 직관적인 글과 그림으로
                  </h4>
                  <p className="text-sm md:text-base text-stone-700 leading-relaxed font-normal">
                    복지관 이용 절차, 프로그램 안내, 층별 시설 위치를 발달장애인의 눈높이에 맞춰
                    쉬운 단어와 픽토그램으로 재구성하였습니다. 누구나 타인의 도움 없이도 편안하게 복지관을 탐색할 수 있습니다.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={onOpenEasyGuide}
                    className="px-6 py-3 bg-[#BC925C] hover:bg-[#a87f4c] text-white rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC925C]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>쉬운 이용안내서 e-book 열람하기</span>
                  </button>
                  <span className="text-xs text-stone-500 text-center sm:text-left">
                    * 실제 제작된 안내서 페이지를 온라인에서 바로 넘겨보실 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
