import React, { useState } from 'react';
import { Moment, CommitteeType } from '../types';
import { Play, Image as ImageIcon, X, ChevronLeft, ChevronRight, Filter, Video, Film, Sparkles } from 'lucide-react';
import { COMMITTEES } from '../data/initialData';

interface MomentsSectionProps {
  moments: Moment[];
}

// Convert various YouTube links to embeddable URL
export function formatVideoEmbedUrl(url: string): string {
  if (!url) return '';
  // Check for youtube.com/watch?v=ID or youtu.be/ID
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
  }
  return url;
}

export const MomentsSection: React.FC<MomentsSectionProps> = ({ moments }) => {
  const [selectedCommittee, setSelectedCommittee] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video'>('all');
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);

  // Extract the 2 featured videos (or first 2 video items)
  const videoMoments = moments.filter((m) => m.mediaType === 'video');
  const featuredVideos = videoMoments.slice(0, 2);

  // Filter moments for the archive grid
  const filteredMoments = moments.filter((m) => {
    const matchComm = selectedCommittee === 'all' || m.committee === selectedCommittee;
    const matchYear = selectedYear === 'all' || m.year.toString() === selectedYear;
    const matchType = selectedType === 'all' || m.mediaType === selectedType;
    return matchComm && matchYear && matchType;
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
              <span>MOMENTS & ARCHIVE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#102138] font-display leading-tight">
              우리가 함께 만든 순간들
            </h2>
            <p className="text-base text-stone-700 mt-3 font-normal">
              2024년부터 2026년까지 직원들이 함께 고민하고 실천해 온 생생한 활동 사진과 대표 성과 영상을 아카이빙합니다.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            총 <span className="font-bold text-[#102138]">{filteredMoments.length}</span>개의 기록 (동영상 {videoMoments.length}편 포함)
          </div>
        </div>

        {/* 1. DEDICATED FEATURED VIDEOS SPOTLIGHT (2 VIDEOS) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-300">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-[#527DA1]" />
              <h3 className="text-xl md:text-2xl font-bold text-[#102138] font-display">
                대표 성과 영상 (2편)
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              * 영상 카드를 클릭하면 고화질 영상 플레이어가 재생됩니다.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVideos.map((video, idx) => {
              const commInfo = COMMITTEES[video.committee];
              return (
                <div
                  key={video.id}
                  onClick={() => setActiveMoment(video)}
                  className="bg-[#102138] text-white rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  {/* Thumbnail / Video Screen with Play Button */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={video.thumbnail || video.url}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102138] via-transparent to-transparent opacity-80" />

                    {/* Prominent Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#C4A875] text-[#102138] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                        <Play className="w-6 h-6 md:w-7 md:h-7 fill-[#102138] ml-1" />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/60 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/15">
                      <Video className="w-3.5 h-3.5 text-[#C4A875]" />
                      <span>FEATURED VIDEO 0{idx + 1}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-mono">
                      {video.year}년 영상
                    </div>
                  </div>

                  {/* Video Meta Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span
                          className="font-bold uppercase tracking-wider"
                          style={{ color: commInfo?.hex || '#C4A875' }}
                        >
                          {commInfo?.name || video.committee}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-300 font-mono">{video.year}</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2 font-display group-hover:text-[#C4A875] transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-normal line-clamp-2">
                        {video.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                      <span className="flex items-center gap-1 text-[#C4A875] font-semibold">
                        <Play className="w-3.5 h-3.5 fill-[#C4A875]" />
                        <span>영상 바로 재생하기</span>
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        관리자 CMS에서 URL 수정 가능
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. ARCHIVE PHOTO & MEDIA GALLERY WITH ADVANCED FILTERS */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-6 pb-2">
            <h3 className="text-lg md:text-xl font-bold text-[#102138] font-display">
              현장 사진 및 전체 아카이브
            </h3>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Committee Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-medium">
              <span className="text-stone-400 shrink-0 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>분류:</span>
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

            {/* Media Type & Year Controls */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium border-t lg:border-t-0 pt-2 lg:pt-0 border-stone-100">
              {/* Media Type Toggle */}
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedType === 'all' ? 'bg-white text-[#102138] shadow-xs font-semibold' : 'text-stone-600'
                  }`}
                >
                  모든 미디어
                </button>
                <button
                  onClick={() => setSelectedType('photo')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedType === 'photo' ? 'bg-white text-[#102138] shadow-xs font-semibold' : 'text-stone-600'
                  }`}
                >
                  사진만
                </button>
                <button
                  onClick={() => setSelectedType('video')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedType === 'video' ? 'bg-[#C4A875] text-[#102138] shadow-xs font-semibold' : 'text-stone-600'
                  }`}
                >
                  동영상만
                </button>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1">
                {['all', '2024', '2025', '2026'].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedYear === year
                        ? 'bg-[#102138] text-white font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {year === 'all' ? '전체 연도' : `${year}년`}
                  </button>
                ))}
              </div>
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
                      <div className="absolute top-3 right-3 p-1.5 rounded bg-black/60 text-white backdrop-blur-sm">
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
                        <h4 className="text-base font-bold text-[#102138] group-hover:text-[#527DA1] transition-colors line-clamp-2">
                          {moment.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                          {moment.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                        <span>{isVideo ? '동영상 재생' : '사진 크게 보기'}</span>
                        <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Video Theater Modal */}
      {activeMoment && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveMoment(null)}
        >
          <div
            className="bg-[#102138] text-white rounded-xl border border-white/20 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
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
                <span className="text-[11px] uppercase tracking-wider text-stone-400 bg-white/5 px-2 py-0.5 rounded">
                  {activeMoment.mediaType === 'video' ? '동영상 미디어' : '사진 아카이브'}
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
            <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              {activeMoment.mediaType === 'video' ? (
                <div className="w-full aspect-video flex items-center justify-center bg-black">
                  {activeMoment.url.includes('youtube.com') || activeMoment.url.includes('youtu.be') ? (
                    <iframe
                      src={formatVideoEmbedUrl(activeMoment.url)}
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
                      className="max-h-[60vh] max-w-full"
                    />
                  )}
                </div>
              ) : (
                <img
                  src={activeMoment.url}
                  alt={activeMoment.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto object-contain mx-auto"
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
