import React from 'react';
import { ArrowUp, Sparkles, Building2, Lock } from 'lucide-react';

interface NextChapterSectionProps {
  onOpenAdmin?: () => void;
}

export const NextChapterSection: React.FC<NextChapterSectionProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="next" className="bg-[#102138] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Next Chapter Editorial Banner */}
        <div className="max-w-4xl mx-auto text-center py-12 md:py-20 border-b border-white/10">
          <div className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>09 · NEXT CHAPTER</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 font-display leading-tight">
            변화는 계속됩니다.
          </h2>

          <div className="space-y-4 text-base md:text-xl text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            <p>
              직원 한 사람의 생각이 동료의 공감을 얻고,
              함께하는 실천이 되어 복지관의 변화를 만들어 왔습니다.
            </p>
            <p>
              우리는 앞으로도 현장의 목소리에 귀 기울이고,
              함께 배우고 실천하며, 더 나은 조직과 서비스를 만들어가겠습니다.
            </p>
          </div>

          {/* Key Outro Banner */}
          <div className="inline-block py-4 px-8 rounded bg-white/5 border border-white/10 backdrop-blur-sm mb-12">
            <p className="text-xl md:text-2xl font-bold text-[#C4A875] font-display">
              "함께 만들어 온 변화, 함께 만들어 갈 내일."
            </p>
          </div>

          {/* Scroll to Top CTA */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wider transition-colors border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A875]"
            >
              <ArrowUp className="w-4 h-4" />
              <span>처음으로 돌아가기</span>
            </button>
          </div>
        </div>

        {/* Institutional Footer */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-white font-bold tracking-tight">
              <Building2 className="w-4 h-4 text-[#C4A875]" />
              <span>수원시장애인종합복지관</span>
            </div>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span>2024—2026 STAFF COMMITTEE ARCHIVE</span>
          </div>

          <div className="text-center sm:text-right text-stone-500 text-[11px] flex items-center justify-center sm:justify-end gap-2">
            <div>
              <p>경기도 수원시 영통구 창룡대로 260 | 수원시장애인종합복지관</p>
              <p className="mt-1">© 2024—2026 Suwon Community Welfare Center for Persons with Disabilities. All rights reserved.</p>
            </div>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-stone-600/40 hover:text-stone-400 p-1 transition-colors ml-1"
                title="관리자"
                aria-label="관리자 접속"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
