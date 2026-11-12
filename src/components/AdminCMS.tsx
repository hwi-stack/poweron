import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ImpactMetric,
  Activity,
  Moment,
  Voice,
  SiteSettings,
  CommitteeType,
  PublishStatus
} from '../types';
import {
  saveMetric,
  saveActivity,
  deleteActivity,
  saveMoment,
  deleteMoment,
  saveVoice,
  deleteVoice,
  saveSiteSettings,
  seedInitialDataToFirestore
} from '../services/contentService';
import {
  X,
  Lock,
  Unlock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Activity as ActivityIcon,
  MessageSquare,
  Settings as SettingsIcon,
  RefreshCw,
  AlertCircle,
  Upload,
  Film,
  Play,
  Check
} from 'lucide-react';
import { compressImageFile, getYouTubeThumbnail, isVideoUrl, formatVideoEmbedUrl } from '../utils/imageHelper';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: ImpactMetric[];
  activities: Activity[];
  moments: Moment[];
  voices: Voice[];
  siteSettings: SiteSettings;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  isOpen,
  onClose,
  metrics,
  activities,
  moments,
  voices,
  siteSettings
}) => {
  const { user, isAdmin, loginWithCredentials, logout, authError } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'activities' | 'moments' | 'voices' | 'settings'>('moments');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Simple ID / Password input states
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  // Moments filter in CMS
  const [cmsMomentFilter, setCmsMomentFilter] = useState<'all' | 'photo' | 'video'>('all');

  // File input refs
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Editing forms
  const [editingMetric, setEditingMetric] = useState<ImpactMetric | null>(null);
  const [editingActivity, setEditingActivity] = useState<Partial<Activity> | null>(null);
  const [editingMoment, setEditingMoment] = useState<Partial<Moment> | null>(null);
  const [editingVoice, setEditingVoice] = useState<Partial<Voice> | null>(null);
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFeedback(null);
    const success = loginWithCredentials(inputUsername, inputPassword);
    if (success) {
      setInputUsername('');
      setInputPassword('');
      showNotification('관리자 인증이 완료되었습니다.');
    } else {
      setLoginFeedback('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // Image file upload handler (Compresses and converts to base64)
  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WebP)만 업로드할 수 있습니다.');
      return;
    }

    setIsUploadingImage(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 0.82);
      setEditingMoment((prev) => ({
        ...prev,
        url: compressedDataUrl,
        mediaType: 'photo'
      }));
      showNotification('사진이 업로드 및 최적화되었습니다.');
    } catch (err: any) {
      alert(`사진 업로드 실패: ${err.message}`);
    } finally {
      setIsUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  // Hero background image file upload
  const handleHeroBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1600, 0.85);
      setSettingsForm((prev) => ({
        ...prev,
        heroBgUrl: compressedDataUrl
      }));
      showNotification('히어로 배경 사진이 선택되었습니다. [설정 저장하기]를 눌러 완료해 주세요.');
    } catch (err: any) {
      alert(`배경 업로드 실패: ${err.message}`);
    } finally {
      setIsUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  // 1. Metric save
  const handleSaveMetric = async (m: ImpactMetric) => {
    setIsSaving(true);
    try {
      await saveMetric(m);
      showNotification('성과 지표가 저장되었습니다.');
      setEditingMetric(null);
    } catch (e: any) {
      alert(`저장 실패: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Activity save
  const handleSaveActivity = async () => {
    if (!editingActivity?.title || !editingActivity?.content) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }
    setIsSaving(true);
    try {
      const id = editingActivity.id || `act-${Date.now()}`;
      await saveActivity({
        id,
        year: editingActivity.year || 2026,
        committee: (editingActivity.committee as CommitteeType) || 'growth',
        title: editingActivity.title,
        objective: editingActivity.objective || '',
        content: editingActivity.content,
        results: editingActivity.results || '',
        status: (editingActivity.status as PublishStatus) || 'published'
      });
      showNotification('활동 기록이 저장되었습니다.');
      setEditingActivity(null);
    } catch (e: any) {
      alert(`활동 저장 실패: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Moment save
  const handleSaveMoment = async () => {
    if (!editingMoment?.title || !editingMoment?.url) {
      alert('활동명과 사진/영상(파일 또는 링크)을 등록해 주세요.');
      return;
    }

    // Auto-detect media type if user pasted a YouTube link
    const isVideo = editingMoment.mediaType === 'video' || isVideoUrl(editingMoment.url);
    const mediaType: 'photo' | 'video' = isVideo ? 'video' : 'photo';

    let thumbnail = editingMoment.thumbnail || '';
    if (mediaType === 'video' && !thumbnail) {
      const ytThumb = getYouTubeThumbnail(editingMoment.url);
      if (ytThumb) thumbnail = ytThumb;
    }

    setIsSaving(true);
    try {
      const id = editingMoment.id || `moment-${Date.now()}`;
      await saveMoment({
        id,
        title: editingMoment.title,
        year: editingMoment.year || 2026,
        committee: (editingMoment.committee as CommitteeType) || 'growth',
        description: editingMoment.description || '',
        mediaType,
        url: editingMoment.url,
        thumbnail,
        status: (editingMoment.status as PublishStatus) || 'published',
        order: editingMoment.order || 99
      });
      showNotification(`${mediaType === 'video' ? '영상' : '사진'} 기록이 저장되었습니다.`);
      setEditingMoment(null);
    } catch (e: any) {
      alert(`미디어 저장 실패: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Voice save
  const handleSaveVoice = async () => {
    if (!editingVoice?.name || !editingVoice?.content) {
      alert('이름과 소감 내용을 입력해 주세요.');
      return;
    }
    setIsSaving(true);
    try {
      const id = editingVoice.id || `voice-${Date.now()}`;
      await saveVoice({
        id,
        name: editingVoice.name,
        committee: (editingVoice.committee as CommitteeType) || 'growth',
        title: editingVoice.title || '',
        content: editingVoice.content,
        profilePhotoUrl: editingVoice.profilePhotoUrl || '',
        status: (editingVoice.status as PublishStatus) || 'published',
        order: editingVoice.order || 99
      });
      showNotification('참여 수기가 저장되었습니다.');
      setEditingVoice(null);
    } catch (e: any) {
      alert(`수기 저장 실패: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Settings save
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings(settingsForm);
      showNotification('사이트 기본 설정이 저장되었습니다.');
    } catch (e: any) {
      alert(`설정 저장 실패: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 6. Seed official data
  const handleSeedDatabase = async () => {
    if (!confirm('공식 성과보고서의 기본 데이터셋으로 데이터베이스를 동기화하시겠습니까?')) {
      return;
    }
    setIsSaving(true);
    try {
      await seedInitialDataToFirestore();
      showNotification('공식 성과 데이터 동기화가 완료되었습니다.');
    } catch (e: any) {
      alert(`동기화 실패: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#102138] text-white rounded-2xl border border-white/20 max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 md:p-6 bg-[#182E47] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#C4A875] text-[#102138] flex items-center justify-center font-bold text-xs font-display">
              CMS
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                직원위원회 디지털 성과공유 관리 시스템
              </h3>
              <p className="text-[11px] text-stone-300">
                수원시장애인종합복지관 POWER ON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#C4A875] font-semibold flex items-center gap-1">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>관리자 인증됨</span>
                </span>
                <button
                  onClick={logout}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded text-stone-400 hover:text-white transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action feedback notification toast */}
        {actionMessage && (
          <div className="bg-[#5F866B] text-white px-6 py-2 text-xs flex items-center gap-2 justify-center font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Content Body: If NOT logged in, show simple ID/PW login */}
        {!isAdmin ? (
          <div className="p-8 md:p-14 text-center my-auto space-y-6 max-w-md mx-auto w-full">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#C4A875]">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold font-display text-white">
                관리자 로그인
              </h4>
              <p className="text-xs text-stone-400">
                콘텐츠 관리를 위해 아이디와 비밀번호를 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs text-stone-300 block mb-1">아이디</label>
                <input
                  type="text"
                  required
                  placeholder="아이디 입력 (admin)"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/20 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C4A875]"
                />
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1">비밀번호</label>
                <input
                  type="password"
                  required
                  placeholder="비밀번호 입력 (0926)"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/20 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C4A875]"
                />
              </div>

              {(loginFeedback || authError) && (
                <div className="p-3 rounded bg-red-900/30 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginFeedback || authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#C4A875] text-[#102138] font-bold text-sm hover:bg-[#d8be8a] transition-colors mt-2"
              >
                관리자 모드 접속
              </button>
            </form>

            <p className="text-[11px] text-stone-500 pt-2">
              수원시장애인종합복지관 직원위원회 성과관리 시스템
            </p>
          </div>
        ) : (
          /* Authenticated Admin Management Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-[#182E47]/70 border-r border-white/10 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('moments')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'moments'
                    ? 'bg-[#C4A875] text-[#102138]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>사진 · 영상 관리</span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'activities'
                    ? 'bg-[#C4A875] text-[#102138]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>활동 내역 관리</span>
              </button>

              <button
                onClick={() => setActiveTab('metrics')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'metrics'
                    ? 'bg-[#C4A875] text-[#102138]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <ActivityIcon className="w-4 h-4" />
                <span>주요 성과 수치</span>
              </button>

              <button
                onClick={() => setActiveTab('voices')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'voices'
                    ? 'bg-[#C4A875] text-[#102138]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>직원 수기 관리</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#C4A875] text-[#102138]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>기본 설정</span>
              </button>

              <div className="mt-auto pt-4 border-t border-white/10 hidden md:block">
                <button
                  onClick={handleSeedDatabase}
                  disabled={isSaving}
                  className="w-full py-2 px-2.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-stone-300 flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  title="초기 공식 데이터로 복원"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C4A875]" />
                  <span>보고서 데이터 동기화</span>
                </button>
              </div>
            </div>

            {/* Main Editor Panel */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
              {/* TAB 1: MOMENTS (사진 및 영상 관리) */}
              {activeTab === 'moments' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        사진 및 영상 아카이브 관리
                      </h4>
                      <p className="text-xs text-stone-400">
                        컴퓨터에서 사진을 직접 올리거나 유튜브 영상을 등록하여 아카이브에 반영합니다.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setEditingMoment({
                            year: 2026,
                            committee: 'growth',
                            mediaType: 'photo',
                            status: 'published'
                          })
                        }
                        className="px-3.5 py-1.5 rounded bg-[#527DA1] text-white text-xs font-bold hover:bg-[#436785] flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>📷 새 사진 올리기</span>
                      </button>

                      <button
                        onClick={() =>
                          setEditingMoment({
                            year: 2026,
                            committee: 'growth',
                            mediaType: 'video',
                            status: 'published'
                          })
                        }
                        className="px-3.5 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center gap-1.5 shadow-sm"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>🎬 새 영상 등록</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter tabs inside CMS list */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-stone-400 mr-1">보기 필터:</span>
                    <button
                      onClick={() => setCmsMomentFilter('all')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        cmsMomentFilter === 'all'
                          ? 'bg-white text-[#102138] font-bold'
                          : 'bg-white/5 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      전체 ({moments.length})
                    </button>
                    <button
                      onClick={() => setCmsMomentFilter('photo')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        cmsMomentFilter === 'photo'
                          ? 'bg-[#527DA1] text-white font-bold'
                          : 'bg-white/5 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      사진만 ({moments.filter((m) => m.mediaType === 'photo').length})
                    </button>
                    <button
                      onClick={() => setCmsMomentFilter('video')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        cmsMomentFilter === 'video'
                          ? 'bg-[#C4A875] text-[#102138] font-bold'
                          : 'bg-white/5 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      영상만 ({moments.filter((m) => m.mediaType === 'video').length})
                    </button>
                  </div>

                  {/* Add / Edit Form for Moment */}
                  {editingMoment && (
                    <div className="p-6 rounded-xl bg-[#182E47] border border-[#C4A875]/50 shadow-lg space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h5 className="text-sm font-bold text-[#C4A875] flex items-center gap-1.5">
                          {editingMoment.mediaType === 'video' ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                          <span>
                            {editingMoment.id ? '미디어 수정' : editingMoment.mediaType === 'video' ? '새 활동 영상 등록' : '새 활동 사진 올리기'}
                          </span>
                        </h5>

                        {/* Switch Type Tabs in Form */}
                        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setEditingMoment({ ...editingMoment, mediaType: 'photo' })}
                            className={`px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                              editingMoment.mediaType === 'photo'
                                ? 'bg-[#527DA1] text-white shadow-xs'
                                : 'text-stone-400 hover:text-white'
                            }`}
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>📷 사진 (이미지)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingMoment({ ...editingMoment, mediaType: 'video' })}
                            className={`px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                              editingMoment.mediaType === 'video'
                                ? 'bg-[#C4A875] text-[#102138] shadow-xs'
                                : 'text-stone-400 hover:text-white'
                            }`}
                          >
                            <Film className="w-3.5 h-3.5" />
                            <span>🎬 영상 (동영상)</span>
                          </button>
                        </div>
                      </div>

                      {/* Basic Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">연도</label>
                          <select
                            value={editingMoment.year || 2026}
                            onChange={(e) => setEditingMoment({ ...editingMoment, year: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value={2024}>2024년</option>
                            <option value={2025}>2025년</option>
                            <option value={2026}>2026년</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">소속 위원회</label>
                          <select
                            value={editingMoment.committee || 'growth'}
                            onChange={(e) => setEditingMoment({ ...editingMoment, committee: e.target.value as CommitteeType })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="growth">조직성장위원회</option>
                            <option value="esg">ESG위원회</option>
                            <option value="developmental">발달장애인지원위원회</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">게시 상태</label>
                          <select
                            value={editingMoment.status || 'published'}
                            onChange={(e) => setEditingMoment({ ...editingMoment, status: e.target.value as PublishStatus })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="published">게시 (공개)</option>
                            <option value="draft">임시저장</option>
                            <option value="private">비공개</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-stone-300 block mb-1">활동명 (제목)</label>
                        <input
                          type="text"
                          required
                          placeholder="예: 2026 스마트워크 업무 개선 시연회"
                          value={editingMoment.title || ''}
                          onChange={(e) => setEditingMoment({ ...editingMoment, title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white placeholder:text-stone-500"
                        />
                      </div>

                      {/* CONDITIONAL MEDIA UPLOAD AREA */}
                      {editingMoment.mediaType === 'photo' ? (
                        /* PHOTO UPLOAD BOX */
                        <div className="p-4 rounded-lg bg-black/30 border border-white/15 space-y-3">
                          <label className="text-xs font-semibold text-[#C4A875] flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>사진 파일 등록 (직접 업로드 또는 URL 입력)</span>
                          </label>

                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <input
                              type="file"
                              ref={photoFileInputRef}
                              accept="image/*"
                              onChange={handlePhotoFileUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => photoFileInputRef.current?.click()}
                              disabled={isUploadingImage}
                              className="w-full sm:w-auto px-4 py-2.5 rounded bg-[#527DA1] hover:bg-[#436785] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              <span>{isUploadingImage ? '사진 압축 처리 중...' : '내 컴퓨터에서 사진 선택하기'}</span>
                            </button>
                            <span className="text-xs text-stone-400">
                              (JPG, PNG, WebP 지원 · 자동 리사이징 및 최적화)
                            </span>
                          </div>

                          <div className="pt-2">
                            <span className="text-[11px] text-stone-400 block mb-1">또는 이미지 웹 주소(URL) 직접 입력:</span>
                            <input
                              type="text"
                              placeholder="https://... 또는 /src/assets/images/..."
                              value={editingMoment.url || ''}
                              onChange={(e) => setEditingMoment({ ...editingMoment, url: e.target.value })}
                              className="w-full px-3 py-1.5 rounded bg-black/50 border border-white/10 text-xs text-white placeholder:text-stone-500"
                            />
                          </div>

                          {/* Live Image Preview */}
                          {editingMoment.url && (
                            <div className="pt-3 border-t border-white/10 flex items-center gap-4">
                              <div className="w-24 h-16 rounded overflow-hidden bg-black border border-white/20 shrink-0">
                                <img
                                  src={editingMoment.url}
                                  alt="미리보기"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-xs text-stone-300">
                                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>사진 등록 완료</span>
                                </span>
                                <span className="text-[11px] text-stone-400 block mt-0.5">
                                  저장 시 깨짐 없이 갤러리에 고화질로 정상 표시됩니다.
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* VIDEO LINK BOX */
                        <div className="p-4 rounded-lg bg-black/30 border border-[#C4A875]/30 space-y-3">
                          <label className="text-xs font-semibold text-[#C4A875] flex items-center gap-1.5">
                            <Film className="w-3.5 h-3.5" />
                            <span>동영상 링크 등록 (유튜브 주소 등)</span>
                          </label>

                          <div>
                            <input
                              type="text"
                              required
                              placeholder="유튜브 링크 입력 (예: https://www.youtube.com/watch?v=... 또는 https://youtu.be/...)"
                              value={editingMoment.url || ''}
                              onChange={(e) => {
                                const url = e.target.value;
                                const autoThumb = getYouTubeThumbnail(url);
                                setEditingMoment({
                                  ...editingMoment,
                                  url,
                                  thumbnail: autoThumb || editingMoment.thumbnail || ''
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-xs text-white placeholder:text-stone-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-stone-300 block mb-1">
                              동영상 썸네일 이미지 URL (유튜브 링크 입력 시 자동 추출됨):
                            </label>
                            <input
                              type="text"
                              placeholder="썸네일 이미지 URL (비워둘 시 자동 적용)"
                              value={editingMoment.thumbnail || ''}
                              onChange={(e) => setEditingMoment({ ...editingMoment, thumbnail: e.target.value })}
                              className="w-full px-3 py-1.5 rounded bg-black/50 border border-white/10 text-xs text-white placeholder:text-stone-500"
                            />
                          </div>

                          {/* Live Video Preview */}
                          {editingMoment.url && (
                            <div className="pt-3 border-t border-white/10">
                              <span className="text-xs text-stone-300 block mb-2">동영상 미리보기:</span>
                              <div className="w-full max-w-sm aspect-video rounded overflow-hidden bg-black border border-white/20">
                                {editingMoment.url.includes('youtube.com') || editingMoment.url.includes('youtu.be') ? (
                                  <iframe
                                    src={formatVideoEmbedUrl(editingMoment.url)}
                                    className="w-full h-full"
                                    title="영상 미리보기"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                                    <Film className="w-6 h-6 mr-1" />
                                    <span>동영상 링크 설정됨</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div>
                        <label className="text-xs text-stone-300 block mb-1">설명 문구 (캡션)</label>
                        <textarea
                          rows={2}
                          placeholder="활동 사진 또는 영상에 대한 간략한 설명을 작성해 주세요."
                          value={editingMoment.description || ''}
                          onChange={(e) => setEditingMoment({ ...editingMoment, description: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white placeholder:text-stone-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingMoment(null)}
                          className="px-3.5 py-1.5 rounded bg-white/10 text-xs text-stone-300 hover:text-white"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveMoment}
                          disabled={isSaving}
                          className="px-5 py-2 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>미디어 저장 완료</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Media List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {moments
                      .filter((m) => {
                        const actualType = isVideoUrl(m.url) || m.mediaType === 'video' ? 'video' : 'photo';
                        return cmsMomentFilter === 'all' || actualType === cmsMomentFilter;
                      })
                      .map((m) => {
                        const isVideo = isVideoUrl(m.url) || m.mediaType === 'video';
                        const thumb = m.thumbnail || (isVideo ? getYouTubeThumbnail(m.url) : m.url) || m.url;

                        return (
                          <div
                            key={m.id}
                            className={`p-4 rounded-lg bg-white/5 border flex items-start gap-3.5 transition-all ${
                              isVideo ? 'border-[#C4A875]/30' : 'border-white/10'
                            }`}
                          >
                            {/* Visual Thumbnail */}
                            <div className="w-20 h-14 rounded overflow-hidden bg-black shrink-0 relative border border-white/10">
                              <img
                                src={thumb}
                                alt={m.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1 left-1">
                                {isVideo ? (
                                  <span className="px-1 py-0.2 rounded bg-[#C4A875] text-[#102138] text-[9px] font-bold">
                                    영상
                                  </span>
                                ) : (
                                  <span className="px-1 py-0.2 rounded bg-black/70 text-white text-[9px]">
                                    사진
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex-1 space-y-1 min-w-0">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-mono text-[#C4A875]">{m.year}년</span>
                                <span className="text-stone-300">·</span>
                                <span className="text-stone-300 font-semibold truncate">{m.committee}</span>
                              </div>
                              <h5 className="font-bold text-white text-sm line-clamp-1">{m.title}</h5>
                              <p className="text-xs text-stone-400 line-clamp-1">{m.description}</p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 self-center">
                              <button
                                onClick={() => setEditingMoment(m)}
                                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-stone-200"
                                title="수정"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('이 기록을 삭제하시겠습니까?')) deleteMoment(m.id);
                                }}
                                className="p-1.5 rounded bg-red-900/30 hover:bg-red-800 text-red-300"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* TAB 2: ACTIVITIES */}
              {activeTab === 'activities' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        위원회 활동 내역 관리
                      </h4>
                      <p className="text-xs text-stone-400">
                        연도별 위원회 추진 활동을 등록, 수정 및 게시 상태(임시저장/게시/비공개)를 관리합니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingActivity({ year: 2026, committee: 'growth', status: 'published' })}
                      className="px-3 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>활동 추가</span>
                    </button>
                  </div>

                  {/* Form */}
                  {editingActivity && (
                    <div className="p-6 rounded-lg bg-[#182E47] border border-[#C4A875]/40 space-y-4">
                      <h5 className="text-sm font-bold text-[#C4A875]">
                        {editingActivity.id ? '활동 수정' : '새 활동 등록'}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">연도</label>
                          <select
                            value={editingActivity.year || 2026}
                            onChange={(e) => setEditingActivity({ ...editingActivity, year: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value={2024}>2024년</option>
                            <option value={2025}>2025년</option>
                            <option value={2026}>2026년</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">위원회</label>
                          <select
                            value={editingActivity.committee || 'growth'}
                            onChange={(e) => setEditingActivity({ ...editingActivity, committee: e.target.value as CommitteeType })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="growth">조직성장위원회</option>
                            <option value="esg">ESG위원회</option>
                            <option value="developmental">발달장애인지원위원회</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">게시 상태</label>
                          <select
                            value={editingActivity.status || 'published'}
                            onChange={(e) => setEditingActivity({ ...editingActivity, status: e.target.value as PublishStatus })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="published">게시 (공개)</option>
                            <option value="draft">임시저장</option>
                            <option value="private">비공개</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-stone-300 block mb-1">활동명</label>
                        <input
                          type="text"
                          value={editingActivity.title || ''}
                          onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1">주요 내용</label>
                        <textarea
                          rows={3}
                          value={editingActivity.content || ''}
                          onChange={(e) => setEditingActivity({ ...editingActivity, content: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1">활동 결과 / 성과</label>
                        <input
                          type="text"
                          value={editingActivity.results || ''}
                          onChange={(e) => setEditingActivity({ ...editingActivity, results: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingActivity(null)}
                          className="px-3 py-1.5 rounded bg-white/10 text-xs text-stone-300 hover:text-white"
                        >
                          취소
                        </button>
                        <button
                          onClick={handleSaveActivity}
                          disabled={isSaving}
                          className="px-4 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a]"
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List */}
                  <div className="space-y-3">
                    {activities.map((a) => (
                      <div
                        key={a.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono text-[#C4A875]">{a.year}년</span>
                            <span className="text-stone-300">·</span>
                            <span className="text-stone-300 font-semibold">{a.committee}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              a.status === 'published' ? 'bg-emerald-900/60 text-emerald-200' : 'bg-stone-700 text-stone-300'
                            }`}>
                              {a.status === 'published' ? '게시' : a.status === 'draft' ? '임시' : '비공개'}
                            </span>
                          </div>
                          <h5 className="font-bold text-white text-sm">{a.title}</h5>
                          <p className="text-xs text-stone-400 line-clamp-1">{a.content}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingActivity(a)}
                            className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-stone-200"
                            title="수정"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('삭제하시겠습니까?')) deleteActivity(a.id);
                            }}
                            className="p-1.5 rounded bg-red-900/30 hover:bg-red-800 text-red-300"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: METRICS */}
              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        핵심 성과 수치 관리
                      </h4>
                      <p className="text-xs text-stone-400">
                        수치를 수정하면 홈페이지 IMPACT 섹션 및 상세 화면에 실시간으로 반영됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metrics.map((m) => (
                      <div
                        key={m.id}
                        className="p-5 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#C4A875] mb-2">
                            <span>{m.category}</span>
                            <span className="font-mono">{m.value}{m.unit}</span>
                          </div>
                          <h5 className="font-bold text-white text-base mb-1">{m.title}</h5>
                          <p className="text-xs text-stone-300 line-clamp-2 mb-4">{m.description}</p>
                        </div>
                        <button
                          onClick={() => setEditingMetric(m)}
                          className="px-3 py-1.5 rounded bg-white/10 hover:bg-[#C4A875] hover:text-[#102138] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1 self-end"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>수정하기</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Metric Edit Form */}
                  {editingMetric && (
                    <div className="p-6 rounded-lg bg-[#182E47] border border-[#C4A875]/40 space-y-4">
                      <h5 className="text-base font-bold text-[#C4A875]">
                        성과 지표 수정: {editingMetric.title}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">지표 명칭</label>
                          <input
                            type="text"
                            value={editingMetric.title}
                            onChange={(e) => setEditingMetric({ ...editingMetric, title: e.target.value })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-xs text-stone-300 block mb-1">수치 (값)</label>
                            <input
                              type="text"
                              value={editingMetric.value}
                              onChange={(e) => setEditingMetric({ ...editingMetric, value: e.target.value })}
                              className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                            />
                          </div>
                          <div className="w-24">
                            <label className="text-xs text-stone-300 block mb-1">단위</label>
                            <input
                              type="text"
                              value={editingMetric.unit}
                              onChange={(e) => setEditingMetric({ ...editingMetric, unit: e.target.value })}
                              className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1">설명 문구</label>
                        <textarea
                          rows={2}
                          value={editingMetric.description}
                          onChange={(e) => setEditingMetric({ ...editingMetric, description: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingMetric(null)}
                          className="px-3 py-1.5 rounded bg-white/10 text-xs text-stone-300 hover:text-white"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleSaveMetric(editingMetric)}
                          disabled={isSaving}
                          className="px-4 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a]"
                        >
                          저장 완료
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: VOICES */}
              {activeTab === 'voices' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        참여 직원 수기 관리
                      </h4>
                      <p className="text-xs text-stone-400">
                        직원들의 실제 인터뷰 및 소감을 등록, 수정하거나 비활성화합니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingVoice({ committee: 'growth', status: 'published' })}
                      className="px-3 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>수기 추가</span>
                    </button>
                  </div>

                  {/* Form */}
                  {editingVoice && (
                    <div className="p-6 rounded-lg bg-[#182E47] border border-[#C4A875]/40 space-y-4">
                      <h5 className="text-sm font-bold text-[#C4A875]">
                        {editingVoice.id ? '수기 수정' : '새 수기 등록'}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">이름 또는 익명 표기</label>
                          <input
                            type="text"
                            value={editingVoice.name || ''}
                            onChange={(e) => setEditingVoice({ ...editingVoice, name: e.target.value })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">소속 위원회</label>
                          <select
                            value={editingVoice.committee || 'growth'}
                            onChange={(e) => setEditingVoice({ ...editingVoice, committee: e.target.value as CommitteeType })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="growth">조직성장위원회</option>
                            <option value="esg">ESG위원회</option>
                            <option value="developmental">발달장애인지원위원회</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-stone-300 block mb-1">게시 상태</label>
                          <select
                            value={editingVoice.status || 'published'}
                            onChange={(e) => setEditingVoice({ ...editingVoice, status: e.target.value as PublishStatus })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="published">게시 (공개)</option>
                            <option value="draft">임시저장</option>
                            <option value="private">비공개</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-stone-300 block mb-1">인터뷰 제목 / 대표 한 줄</label>
                        <input
                          type="text"
                          value={editingVoice.title || ''}
                          onChange={(e) => setEditingVoice({ ...editingVoice, title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1">소감 내용 본문</label>
                        <textarea
                          rows={4}
                          value={editingVoice.content || ''}
                          onChange={(e) => setEditingVoice({ ...editingVoice, content: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingVoice(null)}
                          className="px-3 py-1.5 rounded bg-white/10 text-xs text-stone-300 hover:text-white"
                        >
                          취소
                        </button>
                        <button
                          onClick={handleSaveVoice}
                          disabled={isSaving}
                          className="px-4 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a]"
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List */}
                  <div className="space-y-3">
                    {voices.map((v) => (
                      <div
                        key={v.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-[#C4A875]">{v.name}</span>
                            <span className="text-stone-400">({v.committee})</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              v.status === 'published' ? 'bg-emerald-900/60 text-emerald-200' : 'bg-stone-700 text-stone-300'
                            }`}>
                              {v.status === 'published' ? '게시' : '비공개'}
                            </span>
                          </div>
                          <h5 className="font-bold text-white text-sm">{v.title}</h5>
                          <p className="text-xs text-stone-400 line-clamp-2">{v.content}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingVoice(v)}
                            className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-stone-200"
                            title="수정"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('삭제하시겠습니까?')) deleteVoice(v.id);
                            }}
                            className="p-1.5 rounded bg-red-900/30 hover:bg-red-800 text-red-300"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <h4 className="text-lg font-bold text-white font-display">
                      웹사이트 기본 카피 및 미디어 설정
                    </h4>
                    <p className="text-xs text-stone-400">
                      홈페이지 최상단 HERO 영역의 헤드라인, 배경 이미지 파일 등을 관리합니다.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">메인 타이틀</label>
                      <input
                        type="text"
                        value={settingsForm.heroTitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">서브 타이틀</label>
                      <input
                        type="text"
                        value={settingsForm.heroSubTitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroSubTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">설명 문구</label>
                      <input
                        type="text"
                        value={settingsForm.heroDescription}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">하단 핵심 슬로건</label>
                      <input
                        type="text"
                        value={settingsForm.heroMessage}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroMessage: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                      />
                    </div>

                    {/* HERO BACKGROUND UPLOAD */}
                    <div className="p-4 rounded-lg bg-black/30 border border-white/15 space-y-3">
                      <label className="text-xs font-semibold text-[#C4A875] flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>히어로 배경 사진 등록 (직접 업로드 또는 URL)</span>
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="file"
                          ref={heroFileInputRef}
                          accept="image/*"
                          onChange={handleHeroBgUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => heroFileInputRef.current?.click()}
                          disabled={isUploadingImage}
                          className="w-full sm:w-auto px-4 py-2 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center justify-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{isUploadingImage ? '배경 사진 처리 중...' : '컴퓨터에서 배경 사진 선택'}</span>
                        </button>
                      </div>

                      <div>
                        <span className="text-[11px] text-stone-400 block mb-1">또는 이미지 URL 직접 입력:</span>
                        <input
                          type="text"
                          value={settingsForm.heroBgUrl || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, heroBgUrl: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-black/50 border border-white/10 text-xs text-white"
                        />
                      </div>

                      {settingsForm.heroBgUrl && (
                        <div className="pt-2 flex items-center gap-3">
                          <div className="w-24 h-14 rounded overflow-hidden bg-black border border-white/20 shrink-0">
                            <img
                              src={settingsForm.heroBgUrl}
                              alt="배경 미리보기"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>배경 이미지 적용 대기 중</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="px-6 py-2 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>설정 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
