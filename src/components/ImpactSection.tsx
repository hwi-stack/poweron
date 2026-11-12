import React from 'react';
import { ImpactMetric } from '../types';
import { ArrowUpRight, ArrowDownRight, CheckCircle, TrendingUp } from 'lucide-react';

interface ImpactSectionProps {
  metrics: ImpactMetric[];
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ metrics }) => {
  return (
    <section id="impact" className="py-24 md:py-32 bg-[#102138] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
            <span>03</span>
            <span>·</span>
            <span>IMPACT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display leading-tight">
            숫자로 증명한 우리의 변화
          </h2>
          <p className="text-base md:text-lg text-stone-300 font-normal leading-relaxed">
            수원시장애인종합복지관 직원위원회의 3년간의 활동은 단순한 모임에 그치지 않고,
            수치로 입증되는 조직문화 혁신과 실질적인 친환경 성과로 이어졌습니다.
          </p>
        </div>

        {/* 6 Key Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {metrics.map((m, index) => {
            const isTumbler = m.value.includes('+');
            const isFoodWaste = m.value.includes('-');
            const isPercent = m.unit === '%';

            return (
              <div
                key={m.id}
                className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
                    <span className="font-semibold text-[#C4A875]">{m.category}</span>
                    <span className="font-mono text-stone-400">0{index + 1}</span>
                  </div>

                  {/* Big Number */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white tabular-nums font-editorial group-hover:text-[#C4A875] transition-colors">
                      {m.value}
                    </span>
                    <span className="text-xl md:text-2xl font-medium text-stone-300">
                      {m.unit}
                    </span>
                    {isTumbler && (
                      <ArrowUpRight className="w-6 h-6 text-[#5F866B] self-center ml-1" />
                    )}
                    {isFoodWaste && (
                      <ArrowDownRight className="w-6 h-6 text-[#C4A875] self-center ml-1" />
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-display">
                    {m.title}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rigor & Attribution Footnote */}
        <div className="mt-12 p-5 rounded bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#C4A875] shrink-0" />
            <span>
              본 지표는 2024~2026년 수원시장애인종합복지관 직원위원회 운영 실적 및 2026년도 경기도형 사회복지시설 평가 제출 자료에 근거합니다.
            </span>
          </div>
          <span className="shrink-0 text-stone-400">
            * 텀블러 지표는 사용 횟수의 증가율이며, 잔반 지표는 발생량 감소율입니다.
          </span>
        </div>
      </div>
    </section>
  );
};
