import React, { useState } from 'react';
import { Moment, CommitteeType } from '../types';
import { Play, Image as ImageIcon, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { COMMITTEES } from '../data/initialData';

interface MomentsSectionProps {
  moments: Moment[];
}

export const MomentsSection: React.FC<MomentsSectionProps> = ({ moments }) => {
  const [selectedCommittee, setSelectedCommittee] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);

  // Filter moments
  const filteredMoments = moments.filter((m) => {
    const matchComm = selectedCommittee === 'all' || m.committee === selectedCommittee;
    const matchYear = selectedYear === 'all' || m.year.toString() === selectedYear;
    return matchComm && matchYear;
  });

  return (
    <section id="moments" className="py-24 md:py-32 bg-[#F7F5F0] text-[#102138] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C4A875] font-semibold mb-3">
              <span>07</span>
              <span>·</span>
              <span>MOMENTS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#102138] font-display leading-tight">
              우리가 함께 만든 순간들
            </h2>
            <p className="text-base text-stone-700 mt-3 font-normal">
              2024년부터 2026년까지 직원들이 함께 고민하고 실천해 온 생생한 현장의 아카이브입니다.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            총 <span className="font-bold text-[#102138]">{filteredMoments.length}</span>개의 기록 보관 중
          </div>
        </div>

        {/* Dual Filter Controls (Committee + Year) */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Committee Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-medium">
            <span className="text-stone-400 shrink-0 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>위원회:</span>
            </span>
            <button
              onClick={() => setSelectedCommittee('all')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                selectedCommittee === 'all'
                  ? 'bg-[#102138] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedCommittee('growth')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                selectedCommittee === 'growth'
                  ? 'bg-[#527DA1] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              조직성장위원회
            </button>
            <button
              onClick={() => setSelectedCommittee('esg')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                selectedCommittee === 'esg'
                  ? 'bg-[#5F866B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              ESG위원회
            </button>
            <button
              onClick={() => setSelectedCommittee('developmental')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                selectedCommittee === 'developmental'
                  ? 'bg-[#BC925C] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              발달장애인지원위원회
            </button>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1.5 text-xs font-medium border-t lg:border-t-0 pt-2 lg:pt-0 border-stone-100">
            <span className="text-stone-400 shrink-0 mr-2">연도:</span>
            {['all', '2024', '2025', '2026'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  selectedYear === year
                    ? 'bg-[#C4A875] text-[#102138] font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {year === 'all' ? '전체' : `${year}년`}
              </button>
            ))}
          </div>
        </div>

        {/* Moments Gallery Grid */}
        {filteredMoments.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <p className="text-stone-500 text-sm">선택한 조건의 아카이브 기록이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMoments.map((moment) => {
              const commInfo = COMMITTEES[moment.committee];
              const isVideo = moment.mediaType === 'video';

              return (
                <div
                  key={moment.id}
                  onClick={() => setActiveMoment(moment)}
                  className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    <img
                      src={moment.thumbnail || moment.url}
                      alt={moment.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

                    {/* Media Type Icon Badge */}
                    <div className="absolute top-3 right-3 p-1.5 rounded bg-black/50 text-white backdrop-blur-sm">
                      {isVideo ? <Play className="w-4 h-4 fill-white" /> : <ImageIcon className="w-4 h-4" />}
                    </div>

                    {/* Year badge */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-mono backdrop-blur-sm">
                      {moment.year}년
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span
                          className="font-semibold text-xs"
                          style={{ color: commInfo?.hex || '#102138' }}
                        >
                          {commInfo?.name || moment.committee}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-stone-500">{moment.year}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#102138] group-hover:text-[#527DA1] transition-colors line-clamp-2">
                        {moment.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {moment.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span>자세히 보기</span>
                      <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeMoment && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveMoment(null)}
        >
          <div
            className="bg-[#102138] text-white rounded-xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-[#C4A875]">
                  {activeMoment.year}년
                </span>
                <span className="text-xs font-semibold text-stone-300">
                  {COMMITTEES[activeMoment.committee]?.name || activeMoment.committee}
                </span>
              </div>
              <button
                onClick={() => setActiveMoment(null)}
                className="p-1 rounded text-stone-400 hover:text-white transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Area */}
            <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
              {activeMoment.mediaType === 'video' ? (
                <div className="w-full aspect-video flex items-center justify-center bg-black">
                  {activeMoment.url.includes('youtube.com') || activeMoment.url.includes('youtu.be') ? (
                    <iframe
                      src={activeMoment.url}
                      className="w-full h-full"
                      title={activeMoment.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={activeMoment.url}
                      controls
                      autoPlay
                      className="max-h-[55vh] max-w-full"
                    />
                  )}
                </div>
              ) : (
                <img
                  src={activeMoment.url}
                  alt={activeMoment.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[55vh] w-auto object-contain mx-auto"
                />
              )}
            </div>

            {/* Modal Info */}
            <div className="p-6 md:p-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                {activeMoment.title}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                {activeMoment.description}
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span>수원시장애인종합복지관 직원위원회 공식 아카이브</span>
                <button
                  onClick={() => setActiveMoment(null)}
                  className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
