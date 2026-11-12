import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowDown, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';
import heroBgImg from '../assets/images/hero_abstract_navy_1794458263180.jpg';

interface HeroSectionProps {
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    // Smooth count-up animation for key hero indicators
    const duration = 1600;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount1(Math.round(3 * easeOut));
      setCount2(Math.round(56 * easeOut));
      setCount3(Math.round(69 * easeOut));

      if (step >= steps) {
        clearInterval(timer);
        setCount1(3);
        setCount2(56);
        setCount3(69);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const scrollToPhilosophy = () => {
    const el = document.getElementById('philosophy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full bg-[#102138] text-white flex flex-col justify-between overflow-hidden pt-24 pb-12">
      {/* Background Media with Editorial Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroBgUrl || heroBgImg}
          alt="수원시장애인종합복지관 직원위원회 성과 아카이브"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 transform scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102138] via-[#102138]/70 to-[#102138]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#527DA1]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full my-auto py-12">
        <div className="max-w-4xl">
          {/* Label kicker */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-[#C4A875] font-semibold">
            <span className="w-6 h-[1px] bg-[#C4A875]" />
            <span>2024—2026 STAFF COMMITTEE ARCHIVE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-display mb-4 leading-[1.05]">
            {settings.heroTitle || 'POWER ON'}
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-4xl font-light text-stone-200 mb-6 font-display">
            {settings.heroSubTitle || '변화의 스위치를 켜다.'}
          </p>

          {/* Descriptive text */}
          <p className="text-base md:text-xl text-stone-300 font-normal leading-relaxed max-w-2xl mb-8">
            {settings.heroDescription || '직원이 제안하고 함께 바꾸는 참여형 ESG 경영'}
          </p>

          {/* Core Message Callout Box */}
          <div className="inline-block py-3 px-5 rounded bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-sm md:text-base text-stone-200 font-medium">
              "{settings.heroMessage || '우리의 참여가 조직의 변화가 되고, 더 나은 서비스로 이어집니다.'}"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom KPI Strip & Scroll Down Guidance */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-8">
          {/* KPI 1 */}
          <div className="flex flex-col border-l border-[#C4A875]/40 pl-4 py-1">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-1">
              자율 분과
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white tabular-nums font-editorial">
                {count1}
              </span>
              <span className="text-sm text-stone-300 font-medium">개 직원위원회</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">조직성장 · ESG · 발달장애인지원</p>
          </div>

          {/* KPI 2 */}
          <div className="flex flex-col border-l border-[#C4A875]/40 pl-4 py-1">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-1">
              실천 기록
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white tabular-nums font-editorial">
                {count2}
              </span>
              <span className="text-sm text-stone-300 font-medium">회 회의 및 활동</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">정기회의 · 현장개선 · 자체스터디</p>
          </div>

          {/* KPI 3 */}
          <div className="flex flex-col border-l border-[#C4A875]/40 pl-4 py-1">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-1">
              조직 내 주체
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl md:text-4xl font-bold text-[#C4A875] tabular-nums font-editorial">
                {count3}
              </span>
              <span className="text-sm text-stone-300 font-medium">명 참여 실인원</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">직원 주도 변화를 이끈 참여 주체</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
          <div className="hidden sm:block">
            수원시장애인종합복지관 2024~2026 연차 성과공유 리포트
          </div>
          <button
            onClick={scrollToPhilosophy}
            className="flex items-center gap-2 hover:text-[#C4A875] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A875] rounded py-1 px-2"
          >
            <span>변화의 철학 살펴보기</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
