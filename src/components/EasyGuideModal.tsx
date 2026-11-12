import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Volume2, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface EasyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasyGuideModal: React.FC<EasyGuideModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  if (!isOpen) return null;

  const pages = [
    {
      title: '표지',
      chapter: '발달장애인 알기 쉬운 정보',
      content: (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-[#BC925C]/10 rounded-xl h-full border border-[#BC925C]/30">
          <div className="w-16 h-16 rounded-full bg-[#BC925C] text-white flex items-center justify-center mb-6 shadow-md">
            <BookOpen className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#BC925C] font-bold mb-2">
            수원시장애인종합복지관 발달장애인지원위원회
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#102138] mb-4 font-display">
            복지관 쉬운 이용안내서
          </h2>
          <p className="text-base text-stone-700 max-w-md mb-8">
            누구나 혼자서도 편안하게 복지관을 이용할 수 있도록 알기 쉬운 글과 그림으로 만들었습니다.
          </p>
          <div className="text-xs text-stone-500 bg-white px-4 py-2 rounded-full border border-stone-200">
            2025년 발간 · 인쇄물 10부 복지관 비치 · 디지털 e-book
          </div>
        </div>
      )
    },
    {
      title: '1. 복지관에 처음 오셨나요?',
      chapter: '이용 절차',
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <h3 className="text-xl font-bold text-[#102138] mb-2">
              1단계: 1층 안내데스크로 오세요
            </h3>
            <p className={`text-stone-700 leading-relaxed ${fontSize === 'large' ? 'text-lg' : 'text-sm'}`}>
              복지관 정문으로 들어오시면 바로 앞에 <strong>안내데스크</strong>가 있습니다.
              초록색 조끼를 입은 직원에게 "처음 왔어요"라고 말씀해 주세요.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <h3 className="text-xl font-bold text-[#102138] mb-2">
              2단계: 따뜻한 상담을 함께해요
            </h3>
            <p className={`text-stone-700 leading-relaxed ${fontSize === 'large' ? 'text-lg' : 'text-sm'}`}>
              선생님과 함께 이야기 나누며 내가 배우고 싶은 것, 재미있는 활동, 필요한 도움을 이야기합니다.
              어려운 서류는 직원이 쉽게 도와드립니다.
            </p>
          </div>
        </div>
      )
    },
    {
      title: '2. 층별 시설 찾아가기',
      chapter: '공간 안내',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold text-[#BC925C]">1층</span>
              <h4 className="font-bold text-base text-[#102138]">안내데스크 · 식당 · 카페</h4>
              <p className="text-xs text-stone-600 mt-1">맛있는 점심을 먹고 쉴 수 있는 휴게 공간입니다.</p>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold text-[#BC925C]">2층</span>
              <h4 className="font-bold text-base text-[#102138]">프로그램실 · 체육관</h4>
              <p className="text-xs text-stone-600 mt-1">음악, 미술, 신체활동 등 즐거운 수업을 하는 곳입니다.</p>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold text-[#BC925C]">3층</span>
              <h4 className="font-bold text-base text-[#102138]">직업적응훈련실</h4>
              <p className="text-xs text-stone-600 mt-1">일하는 방법과 사회생활 기술을 배우는 공간입니다.</p>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold text-[#BC925C]">쉬운 픽토그램 안내판</span>
              <h4 className="font-bold text-base text-[#102138]">문 앞의 그림을 확인하세요</h4>
              <p className="text-xs text-stone-600 mt-1">모든 방 앞에는 알기 쉬운 그림 표지판이 붙어 있습니다.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '3. 함께 지키는 복지관 약속',
      chapter: '상호존중',
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5F866B] text-white flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-base text-[#102138]">서로 반갑게 인사해요</h4>
              <p className={`text-stone-700 mt-1 ${fontSize === 'large' ? 'text-base' : 'text-xs'}`}>
                친구와 선생님을 만나면 "안녕하세요" 하고 웃으며 먼저 인사해요.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5F866B] text-white flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-base text-[#102138]">개인 텀블러를 사용해요</h4>
              <p className={`text-stone-700 mt-1 ${fontSize === 'large' ? 'text-base' : 'text-xs'}`}>
                일회용 종이컵 대신 내 물병(텀블러)을 챙겨 지구를 지켜요.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5F866B] text-white flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-base text-[#102138]">음식은 먹을 만큼만 담아요</h4>
              <p className={`text-stone-700 mt-1 ${fontSize === 'large' ? 'text-base' : 'text-xs'}`}>
                식당에서는 내가 다 먹을 수 있는 만큼만 받아 남기지 않아요.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '4. 도움이 필요할 때는 언제든지',
      chapter: '이용 권리',
      content: (
        <div className="p-8 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#102138] font-display">
            "우리는 언제나 여러분의 곁에 있습니다"
          </h3>
          <p className={`text-stone-700 max-w-lg mx-auto ${fontSize === 'large' ? 'text-lg' : 'text-sm'}`}>
            길을 모르겠거나 활동 중 도움이 필요할 때는 주저하지 말고 지나가는 직원이나 안내데스크에 손을 들어주세요.
            친절하게 함께 걸어 안내해 드리겠습니다.
          </p>
          <div className="pt-6 border-t border-stone-200 flex justify-center gap-4 text-xs font-semibold text-[#102138]">
            <span>전화: 031-270-0200</span>
            <span>·</span>
            <span>수원시장애인종합복지관</span>
          </div>
        </div>
      )
    }
  ];

  const currentPageData = pages[currentPage];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-stone-200 max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 md:p-6 bg-[#102138] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#BC925C] flex items-center justify-center text-white font-bold text-xs">
              e-Book
            </div>
            <div>
              <h3 className="text-base font-bold font-display">
                쉬운 이용안내서 디지털 뷰어
              </h3>
              <p className="text-[11px] text-stone-300">
                수원시장애인종합복지관 발달장애인지원위원회 공식 제작본
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="px-2.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="글자 크기 조절"
            >
              {fontSize === 'normal' ? '큰글자 모드' : '보통글자'}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-stone-400 hover:text-white transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body Area */}
        <div className="p-6 md:p-10 flex-1 overflow-y-auto bg-stone-50">
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl border border-stone-200 shadow-sm min-h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-stone-100">
                <span className="font-bold text-[#BC925C]">{currentPageData.chapter}</span>
                <span className="font-mono">
                  {currentPage + 1} / {pages.length}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-[#102138] mb-6 font-display">
                {currentPageData.title}
              </h4>
              <div>{currentPageData.content}</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 md:p-5 bg-white border-t border-stone-200 flex items-center justify-between">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-stone-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 페이지</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1.5">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentPage === idx ? 'bg-[#BC925C] w-6' : 'bg-stone-300'
                }`}
                aria-label={`페이지 ${idx + 1}`}
              />
            ))}
          </div>

          <button
            disabled={currentPage === pages.length - 1}
            onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#BC925C] hover:bg-[#a87f4c] disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-white transition-colors"
          >
            <span>다음 페이지</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
