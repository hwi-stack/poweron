import React, { useState } from 'react';
import { Leaf, Users, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const [activeValue, setActiveValue] = useState<'all' | 'E' | 'S' | 'G'>('all');

  const esgItems = [
    {
      key: 'G' as const,
      symbol: 'Governance',
      tag: 'G · 거버넌스',
      title: '직원 참여와 소통',
      subtitle: '변화의 토대가 되는 열린 의사결정 구조',
      desc: '직원위원회가 자율적 참여 거버넌스(G)를 확립함으로써, 상명하달식 행정을 탈피하고 현장의 문제를 주체적으로 해결하는 기반을 구축했습니다.',
      color: '#527DA1',
      details: ['직원 자율 위원회 구성', '직급·직종을 초월한 수평적 소통', '문제 발굴부터 웹앱 개발까지 주도'],
      icon: Shield
    },
    {
      key: 'E' as const,
      symbol: 'Environmental',
      tag: 'E · 환경',
      title: '일상 속 친환경 실천',
      subtitle: '구호가 아닌 행동으로 증명하는 생태적 책임',
      desc: '직원들의 자발적 합의로 텀블러 사용과 잔반 감축을 일상화하며, 환경 보호가 복지관 문화의 자연스러운 일부로 정착되었습니다.',
      color: '#5F866B',
      details: ['개인 텀블러 생활화 (+80.3%)', '잔반 줄이기 챌린지 (-70%)', '올바른 분리배출 캠페인'],
      icon: Leaf
    },
    {
      key: 'S' as const,
      symbol: 'Social',
      tag: 'S · 사회',
      title: '이용자 권리와 상호존중',
      subtitle: '발달장애인의 알 권리와 따뜻한 조직문화',
      desc: '이용인의 눈높이에 맞춘 쉬운 안내서 발간과 공간 개선, 직원과 이용인이 함께 실천하는 인사·감사·칭찬 캠페인으로 상호존중의 가치를 확장했습니다.',
      color: '#BC925C',
      details: ['쉬운 이용안내서 & 공간안내서 발간', '발달장애인 정보접근권 강화', '인사·감사·칭찬 상호존중 문화'],
      icon: Users
    }
  ];

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#F7F5F0] text-[#102138] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>02</span>
            <span>·</span>
            <span>OUR PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#102138] mb-6 font-display leading-tight">
            변화는 현장의 목소리에서 시작됩니다.
          </h2>
          <div className="space-y-4 text-base md:text-lg text-stone-700 leading-relaxed font-normal">
            <p>
              복지관의 발전은 특정 부서나 관리자의 노력만으로 이루어지지 않습니다.
            </p>
            <p>
              현장에서 발견한 문제를 직원이 직접 제안하고, 함께 학습하며, 해결방안을 실천하는 과정에서 조직의 변화가 시작됩니다.
            </p>
            <p className="font-semibold text-[#102138]">
              수원시장애인종합복지관은 직원위원회를 통해 직원이 조직 변화의 주체로 참여하는 ESG 경영을 실천해 왔습니다.
            </p>
          </div>
        </div>

        {/* ESG & Employee Engagement Interactive Diagram */}
        <div className="bg-white rounded-xl border border-stone-200 p-8 md:p-12 shadow-sm">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#102138] mb-1 font-display">
                직원의 참여가 만들어낸 ESG 연결망
              </h3>
              <p className="text-sm text-stone-600">
                직원위원회라는 자율 참여 구조(G)를 주춧돌 삼아, 일상의 환경(E)과 사회적 책임(S)으로 가치를 실천합니다.
              </p>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0">
              <button
                onClick={() => setActiveValue('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeValue === 'all'
                    ? 'bg-white text-[#102138] shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-[#102138]'
                }`}
              >
                전체 보기
              </button>
              <button
                onClick={() => setActiveValue('G')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeValue === 'G'
                    ? 'bg-[#527DA1] text-white shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-[#527DA1]'
                }`}
              >
                G · 거버넌스
              </button>
              <button
                onClick={() => setActiveValue('E')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeValue === 'E'
                    ? 'bg-[#5F866B] text-white shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-[#5F866B]'
                }`}
              >
                E · 환경
              </button>
              <button
                onClick={() => setActiveValue('S')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeValue === 'S'
                    ? 'bg-[#BC925C] text-white shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-[#BC925C]'
                }`}
              >
                S · 사회
              </button>
            </div>
          </div>

          {/* Grid Layout of Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {esgItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeValue === 'all' || activeValue === item.key;
              return (
                <div
                  key={item.key}
                  onClick={() => setActiveValue(item.key)}
                  className={`p-6 md:p-8 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-50/80 border-stone-300 shadow-sm opacity-100'
                      : 'bg-white border-stone-100 opacity-40 hover:opacity-80'
                  }`}
                  style={{
                    borderTop: `4px solid ${item.color}`
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider font-display"
                        style={{ color: item.color }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-[#102138] mb-1 font-display">
                      {item.title}
                    </h4>
                    <p className="text-xs font-medium text-stone-500 mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-stone-700 leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <div className="pt-4 border-t border-stone-200/80 space-y-2">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: item.color }} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Concept Banner */}
          <div className="mt-8 p-6 rounded-lg bg-[#102138] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C4A875] font-semibold">
                CORE PRINCIPLE
              </span>
              <p className="text-lg md:text-xl font-bold font-display text-white">
                직원의 참여 = 변화의 시작점
              </p>
              <p className="text-xs md:text-sm text-stone-300">
                직원위원회의 자발적 거버넌스는 단순 참여를 넘어, 복지관 서비스의 질적 향상과 지속가능한 내일을 여는 원동력입니다.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs text-[#C4A875] font-semibold">
              <span>우리의 실천</span>
              <ArrowRight className="w-4 h-4" />
              <span>조직의 변화</span>
              <ArrowRight className="w-4 h-4" />
              <span>더 나은 복지 서비스</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
