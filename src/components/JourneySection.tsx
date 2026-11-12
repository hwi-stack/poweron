import React, { useState } from 'react';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const timelineData = [
    {
      year: 2024,
      phase: '기반 구축',
      tagline: '변화의 방향을 정립하다.',
      summary: '직원위원회의 자율 운영 체계를 정립하고 기관의 강점과 개선 과제를 정밀 진단한 해',
      keyTasks: [
        '위원회별 역할과 운영방향 정립',
        '자체 진단과 스터디 운영',
        '개선과제 발굴 및 실행계획 수립',
        '조직 및 지원환경 점검'
      ],
      committeeActions: [
        {
          committee: '조직성장위원회',
          color: '#527DA1',
          content: '조직문화, 업무시스템, 직원 성장환경 진단 및 강점·개선 부분 점검'
        },
        {
          committee: 'ESG위원회',
          color: '#5F866B',
          content: '환경영역 실천 수준 진단 및 기관 내 친환경 실천과제 발굴'
        },
        {
          committee: '발달장애인지원위원회',
          color: '#BC925C',
          content: '발달장애인 지원 관련 도서 스터디, 지원환경 진단 및 개선과제 논의'
        }
      ]
    },
    {
      year: 2025,
      phase: '실천',
      tagline: '생각을 행동으로 이어가다.',
      summary: '발굴된 개선 과제를 구체적인 전사 캠페인과 이용자 맞춤 제작물로 실행에 옮긴 해',
      keyTasks: [
        '조직성장: 부서 간 교류 및 협력 강화',
        'ESG: 생활 속 친환경 실천 캠페인',
        '발달장애인지원: 쉬운 이용안내서 제작 및 배포',
        '전사적 참여 문화 조성'
      ],
      committeeActions: [
        {
          committee: '조직성장위원회',
          color: '#527DA1',
          content: '부서 간 교류 활동 추진, 직원 간 이해와 협력 강화 (부서 간 긍정적 인식 변화 87.5%)'
        },
        {
          committee: 'ESG위원회',
          color: '#5F866B',
          content: '잔반 줄이기 캠페인, 텀블러 사용 실천 (+80.3%), 올바른 분리수거 캠페인'
        },
        {
          committee: '발달장애인지원위원회',
          color: '#BC925C',
          content: '쉬운 이용안내서 1종 제작 (인쇄물 10부 비치, e-book 1종 제작 및 온라인 배포)'
        }
      ]
    },
    {
      year: 2026,
      phase: '확장 · 고도화',
      tagline: '변화를 조직과 서비스로 확장하다.',
      summary: '스마트워크 디지털 혁신, 상호존중 문화 확산, 공간 접근성 개선으로 결실을 맺은 해',
      keyTasks: [
        '조직성장: 스마트워크 스터디 및 웹앱 직접 개발',
        'ESG: 인사·감사·칭찬 캠페인 (상호존중)',
        '발달장애인지원: 프로그램실별 쉬운 공간안내서 제작',
        '지속가능한 참여형 경영 모델 안착'
      ],
      committeeActions: [
        {
          committee: '조직성장위원회',
          color: '#527DA1',
          content: '스마트워크 자체 스터디, 반복·비효율 업무 개선, 복지관 맞춤 웹앱 직접 개발 추진'
        },
        {
          committee: 'ESG위원회',
          color: '#5F866B',
          content: '인사 캠페인, 감사 캠페인, 칭찬 캠페인을 통한 이용인과 직원의 상호존중 문화 조성'
        },
        {
          committee: '발달장애인지원위원회',
          color: '#BC925C',
          content: '프로그램실별 쉬운 공간안내서 제작 부착으로 정보접근성과 이용 편의 전면 개선'
        }
      ]
    }
  ];

  const currentYearData = timelineData.find((d) => d.year === selectedYear) || timelineData[1];

  return (
    <section id="journey" className="py-24 md:py-32 bg-[#F7F5F0] text-[#102138] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>04</span>
            <span>·</span>
            <span>OUR JOURNEY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#102138] mb-6 font-display leading-tight">
            생각에서 실천으로, 실천에서 변화로
          </h2>
          <p className="text-base md:text-lg text-stone-700 leading-relaxed font-normal">
            2024년 문제 진단과 기반 구축에서 시작하여 2025년 과감한 현장 실천을 거쳐,
            2026년 조직 시스템과 서비스 공간으로의 확장에 이른 3년간의 로드맵입니다.
          </p>
        </div>

        {/* Interactive Timeline Navigation Tabs */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-12">
          {timelineData.map((item) => {
            const isSelected = selectedYear === item.year;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`flex-1 p-6 rounded-lg text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#102138] text-white border-[#102138] shadow-md transform -translate-y-1'
                    : 'bg-white text-[#102138] border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-2xl md:text-3xl font-bold font-editorial tabular-nums ${
                      isSelected ? 'text-[#C4A875]' : 'text-[#102138]'
                    }`}
                  >
                    {item.year}년
                  </span>
                  <span
                    className={`text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/10 text-stone-200' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.phase}
                  </span>
                </div>
                <p className={`text-sm font-semibold mb-1 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {item.tagline}
                </p>
                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {item.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Year Detail Showcase */}
        <div className="bg-white rounded-xl border border-stone-200 p-8 md:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-200 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C4A875] mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentYearData.year}년 추진 과정</span>
                <span>·</span>
                <span>{currentYearData.phase}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#102138] font-display">
                "{currentYearData.tagline}"
              </h3>
            </div>
            <p className="text-sm text-stone-600 max-w-md">
              {currentYearData.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 3 Committee Actions in That Year */}
            {currentYearData.committeeActions.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between"
                style={{ borderTop: `4px solid ${c.color}` }}
              >
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider block mb-2 font-display"
                    style={{ color: c.color }}
                  >
                    {c.committee}
                  </span>
                  <h4 className="text-base font-bold text-[#102138] mb-3">
                    {c.committee} 실천 사항
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {c.content}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-200 flex items-center gap-1.5 text-xs text-stone-500">
                  <CheckCircle2 className="w-4 h-4" style={{ color: c.color }} />
                  <span>공식 연차 사업계획 반영</span>
                </div>
              </div>
            ))}
          </div>

          {/* Key Tasks Banner */}
          <div className="mt-8 p-6 rounded-lg bg-stone-100 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 shrink-0">
              {currentYearData.year} 핵심 중점 과제
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {currentYearData.keyTasks.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-white px-3 py-1 rounded border border-stone-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#102138]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
