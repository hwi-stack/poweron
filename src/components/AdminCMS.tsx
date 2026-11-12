import React, { useState } from 'react';
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
  ShieldAlert,
  ShieldCheck,
  LogOut,
  LogIn,
  Save,
  Plus,
  Trash2,
  Edit,
  Database,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Activity as ActivityIcon,
  MessageSquare,
  Settings as SettingsIcon,
  RefreshCw
} from 'lucide-react';

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
  const { user, isAdmin, isLoading, signInWithGoogle, logout, authError } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'activities' | 'moments' | 'voices' | 'settings'>('metrics');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
      alert('활동명과 미디어 URL을 입력해 주세요.');
      return;
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
        mediaType: editingMoment.mediaType || 'photo',
        url: editingMoment.url,
        thumbnail: editingMoment.thumbnail || '',
        status: (editingMoment.status as PublishStatus) || 'published',
        order: editingMoment.order || 99
      });
      showNotification('미디어 기록이 저장되었습니다.');
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
                직원위원회 디지털 성과공유 관리자 시스템
              </h3>
              <p className="text-[11px] text-stone-300">
                수원시장애인종합복지관 POWER ON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-300 hidden sm:inline">{user.email}</span>
                <button
                  onClick={logout}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-3.5 py-1.5 rounded bg-[#C4A875] hover:bg-[#d8be8a] text-[#102138] text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Google 관리자 로그인</span>
              </button>
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

        {/* Content Body: If NOT logged in or NOT admin */}
        {!isAdmin ? (
          <div className="p-10 text-center my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#C4A875]">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h4 className="text-xl font-bold font-display text-white">
                관리자 권한이 필요합니다
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                본 시스템은 수원시장애인종합복지관의 인증된 관리자만 접근하여 성과 지표와 기록을 수정할 수 있습니다.
              </p>
              {user && (
                <div className="p-3 rounded bg-red-900/30 border border-red-500/30 text-xs text-red-200 mt-4">
                  현재 로그인 계정({user.email})은 관리자 명단에 등록되어 있지 않습니다.
                </div>
              )}
            </div>

            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="px-6 py-2.5 rounded bg-[#C4A875] text-[#102138] font-bold text-sm hover:bg-[#d8be8a] transition-colors"
              >
                Google 계정으로 로그인하기
              </button>
            ) : (
              <p className="text-xs text-stone-400">
                문의: 복지관 전산/행정 담당자 (hwi@suwonrehab.or.kr)
              </p>
            )}
          </div>
        ) : (
          /* Authenticated Admin Management Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-[#182E47]/70 border-r border-white/10 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('metrics')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'metrics'
                    ? 'bg-[#C4A875] text-[#102138]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <ActivityIcon className="w-4 h-4" />
                <span>주요 성과 관리</span>
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
              {/* TAB 1: METRICS */}
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

                  {/* Metric Edit Modal / Form */}
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

              {/* TAB 3: MOMENTS */}
              {activeTab === 'moments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        사진 및 영상 아카이브 관리
                      </h4>
                      <p className="text-xs text-stone-400">
                        활동 사진 및 외부 영상 링크(유튜브 등)를 등록하고 상태를 지정합니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingMoment({ year: 2026, committee: 'growth', mediaType: 'photo', status: 'published' })}
                      className="px-3 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a] flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>미디어 추가</span>
                    </button>
                  </div>

                  {/* Form */}
                  {editingMoment && (
                    <div className="p-6 rounded-lg bg-[#182E47] border border-[#C4A875]/40 space-y-4">
                      <h5 className="text-sm font-bold text-[#C4A875]">
                        {editingMoment.id ? '미디어 수정' : '새 미디어 등록'}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                          <label className="text-xs text-stone-300 block mb-1">위원회</label>
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
                          <label className="text-xs text-stone-300 block mb-1">유형</label>
                          <select
                            value={editingMoment.mediaType || 'photo'}
                            onChange={(e) => setEditingMoment({ ...editingMoment, mediaType: e.target.value as 'photo' | 'video' })}
                            className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                          >
                            <option value="photo">사진 (이미지)</option>
                            <option value="video">영상 (링크/호스팅)</option>
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
                        <label className="text-xs text-stone-300 block mb-1">활동명</label>
                        <input
                          type="text"
                          value={editingMoment.title || ''}
                          onChange={(e) => setEditingMoment({ ...editingMoment, title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1">미디어 파일 URL / 이미지 경로</label>
                        <input
                          type="text"
                          placeholder="https://... 또는 /src/assets/images/..."
                          value={editingMoment.url || ''}
                          onChange={(e) => setEditingMoment({ ...editingMoment, url: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1">설명 문구</label>
                        <textarea
                          rows={2}
                          value={editingMoment.description || ''}
                          onChange={(e) => setEditingMoment({ ...editingMoment, description: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingMoment(null)}
                          className="px-3 py-1.5 rounded bg-white/10 text-xs text-stone-300 hover:text-white"
                        >
                          취소
                        </button>
                        <button
                          onClick={handleSaveMoment}
                          disabled={isSaving}
                          className="px-4 py-1.5 rounded bg-[#C4A875] text-[#102138] text-xs font-bold hover:bg-[#d8be8a]"
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {moments.map((m) => (
                      <div
                        key={m.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono text-[#C4A875]">{m.year}년</span>
                            <span className="text-stone-300">·</span>
                            <span className="text-stone-300 font-semibold">{m.committee}</span>
                            <span className="text-[10px] uppercase font-mono bg-white/10 px-1 rounded">{m.mediaType}</span>
                          </div>
                          <h5 className="font-bold text-white text-sm line-clamp-1">{m.title}</h5>
                          <p className="text-xs text-stone-400 line-clamp-2">{m.description}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingMoment(m)}
                            className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-stone-200"
                            title="수정"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('삭제하시겠습니까?')) deleteMoment(m.id);
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
                      홈페이지 최상단 HERO 영역의 헤드라인, 배경 이미지 경로 등을 관리합니다.
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
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">히어로 배경 이미지 / 영상 URL</label>
                      <input
                        type="text"
                        value={settingsForm.heroBgUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroBgUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 text-xs text-white"
                      />
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
