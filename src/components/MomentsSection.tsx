import React, { useState } from 'react';
import { Moment, CommitteeType } from '../types';
import {
  Play,
  Image as ImageIcon,
  X,
  Filter,
  Video,
  Film,
  ZoomIn,
  Download,
  AlertCircle
} from 'lucide-react';
import { COMMITTEES } from '../data/initialData';
import { formatVideoEmbedUrl, isVideoUrl, getYouTubeThumbnail } from '../utils/imageHelper';

interface MomentsSectionProps {
  moments: Moment[];
}

export const MomentsSection: React.FC<MomentsSectionProps> = ({ moments }) => {
  const [mediaTypeTab, setMediaTypeTab] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedCommittee, setSelectedCommittee] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Determine media type accurately (checking both moment.mediaType and URL)
  const getAccurateMediaType = (m: Moment): 'photo' | 'video' => {
    if (m.mediaType === 'video' || isVideoUrl(m.url)) {
      return 'video';
    }
    return 'photo';
  };

  // Filter moments
  const filteredMoments = moments.filter((m) => {
    const actualType = getAccurateMediaType(m);
    const matchType = mediaTypeTab === 'all' || actualType === mediaTypeTab;
    const matchComm = selectedCommittee === 'all' || m.committee === selectedCommittee;
    const matchYear = selectedYear === 'all' || m.year.toString() === selectedYear;
    return matchType && matchComm && matchYear;
  });

  const photoCount = moments.filter((m) => getAccurateMediaType(m) === 'photo').length;
  const videoCount = moments.filter((m) => getAccurateMediaType(m) === 'video').length;

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

          <div className="text-xs text-stone-600 bg-white px-4 py-2 rounded-lg border border-stone-200 shadow-2xs shrink-0 flex items-center gap-3">
            <span>📷 사진 <strong className="text-[#102138]">{photoCount}</strong>건</span>
            <span className="text-stone-300">|</span>
            <span>🎬 영상 <strong className="text-[#102138]">{videoCount}</strong>건</span>
          </div>
        </div>

        {/* Primary Filter Tabs: [전체] vs [📷 사진 갤러리] vs [🎬 활동 영상] */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-300 pb-4">
          <button
            onClick={() => setMediaTypeTab('all')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              mediaTypeTab === 'all'
                ? 'bg-[#102138] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <span>전체 아카이브</span>
            <span className="text-xs opacity-70">({moments.length})</span>
          </button>

          <button
            onClick={() => setMediaTypeTab('photo')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              mediaTypeTab === 'photo'
                ? 'bg-[#527DA1] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>사진 갤러리</span>
            <span className="text-xs opacity-70">({photoCount})</span>
          </button>

          <button
            onClick={() => setMediaTypeTab('video')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              mediaTypeTab === 'video'
                ? 'bg-[#C4A875] text-[#102138] shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>성과 영상관</span>
            <span className="text-xs opacity-70">({videoCount})</span>
          </button>
        </div>

        {/* Secondary Detailed Filters (Committee & Year) */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Committee Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-medium">
            <span className="text-stone-400 shrink-0 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>위원회별:</span>
            </span>
            <button
              onClick={() => setSelectedCommittee('all')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                selectedCommittee === 'all'
                  ? 'bg-stone-900 text-white font-semibold'
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

        {/* Moments Media Grid */}
        {filteredMoments.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Filter className="w-5 h-5" />
            </div>
            <p className="text-stone-600 font-medium text-sm">선택한 조건의 아카이브 기록이 없습니다.</p>
            <p className="text-xs text-stone-400">필터 조건을 재설정하거나 관리자 모드에서 새 기록을 등록해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMoments.map((moment) => {
              const commInfo = COMMITTEES[moment.committee];
              const actualType = getAccurateMediaType(moment);
              const isVideo = actualType === 'video';
              const isBroken = failedImages[moment.id];

              // Pick best thumbnail
              let displayImage = moment.thumbnail || moment.url;
              if (isVideo && !moment.thumbnail) {
                const ytThumb = getYouTubeThumbnail(moment.url);
                if (ytThumb) displayImage = ytThumb;
              }

              return (
                <div
                  key={moment.id}
                  onClick={() => setActiveMoment(moment)}
                  className={`bg-white rounded-xl overflow-hidden border shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                    isVideo ? 'border-[#C4A875]/30' : 'border-stone-200'
                  }`}
                >
                  {/* Media Visual Container */}
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    {!isBroken ? (
                      <img
                        src={displayImage}
                        alt={moment.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(moment.id)}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          isVideo ? 'opacity-85' : 'opacity-100'
                        }`}
                      />
                    ) : (
                      /* Polished Zero-Broken Fallback Container */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-6 text-center text-stone-500">
                        {isVideo ? (
                          <Film className="w-8 h-8 text-[#C4A875] mb-2" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-stone-400 mb-2" />
                        )}
                        <span className="text-xs font-semibold text-stone-700 line-clamp-1">
                          {moment.title}
                        </span>
                        <span className="text-[10px] text-stone-400 mt-1">
                          {isVideo ? '동영상 미디어' : '사진 아카이브'}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

                    {/* Prominent Media Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {isVideo ? (
                        <span className="px-2 py-0.5 rounded bg-[#C4A875] text-[#102138] text-[11px] font-bold shadow-xs flex items-center gap-1">
                          <Film className="w-3 h-3" />
                          <span>영상</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-medium backdrop-blur-xs flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          <span>사진</span>
                        </span>
                      )}
                    </div>

                    {/* Center Play Button ONLY FOR VIDEOS */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#C4A875] text-[#102138] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                          <Play className="w-5 h-5 fill-[#102138] ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Year badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-mono backdrop-blur-xs">
                      {moment.year}년
                    </div>
                  </div>

                  {/* Caption & Metadata Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span
                          className="font-bold text-xs"
                          style={{ color: commInfo?.hex || '#102138' }}
                        >
                          {commInfo?.name || moment.committee}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-stone-500 font-mono">{moment.year}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#102138] group-hover:text-[#527DA1] transition-colors line-clamp-2">
                        {moment.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {moment.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="font-medium text-stone-600">
                        {isVideo ? '동영상 플레이어 열기' : '사진 원본 확대'}
                      </span>
                      <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Video Theater Modal */}
      {activeMoment && (() => {
        const isVideo = getAccurateMediaType(activeMoment) === 'video';
        const commInfo = COMMITTEES[activeMoment.committee];

        return (
          <div
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveMoment(null)}
          >
            <div
              className="bg-[#102138] text-white rounded-2xl border border-white/20 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    isVideo ? 'bg-[#C4A875] text-[#102138]' : 'bg-white/15 text-white'
                  }`}>
                    {isVideo ? '🎬 동영상 미디어' : '📷 사진 아카이브'}
                  </span>
                  <span className="text-xs font-mono text-stone-300">
                    {activeMoment.year}년
                  </span>
                  <span className="text-xs font-semibold text-stone-200">
                    {commInfo?.name || activeMoment.committee}
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

              {/* Media Player or Photo Display */}
              <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[62vh] overflow-hidden">
                {isVideo ? (
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
                        className="max-h-[58vh] max-w-full"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2 bg-stone-950">
                    <img
                      src={activeMoment.url}
                      alt={activeMoment.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[58vh] max-w-full object-contain mx-auto rounded"
                    />
                  </div>
                )}
              </div>

              {/* Modal Info Description */}
              <div className="p-6 md:p-8 space-y-3">
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                  {activeMoment.title}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  {activeMoment.description}
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                  <span>수원시장애인종합복지관 2024~2026 직원위원회 공식 아카이브</span>
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
        );
      })()}
    </section>
  );
};
