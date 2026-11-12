/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ImpactSection } from './components/ImpactSection';
import { JourneySection } from './components/JourneySection';
import { CommitteesSection } from './components/CommitteesSection';
import { HighlightsSection } from './components/HighlightsSection';
import { MomentsSection } from './components/MomentsSection';
import { VoicesSection } from './components/VoicesSection';
import { NextChapterSection } from './components/NextChapterSection';
import { EasyGuideModal } from './components/EasyGuideModal';
import { AdminCMS } from './components/AdminCMS';

import {
  ImpactMetric,
  Activity,
  Moment,
  Voice,
  SiteSettings
} from './types';
import {
  INITIAL_METRICS,
  INITIAL_ACTIVITIES,
  INITIAL_MOMENTS,
  INITIAL_VOICES,
  INITIAL_SITE_SETTINGS
} from './data/initialData';
import {
  subscribeMetrics,
  subscribeActivities,
  subscribeMoments,
  subscribeVoices,
  subscribeSiteSettings
} from './services/contentService';

function MainApp() {
  const { isAdmin } = useAuth();

  // Live state from Firestore with official initial fallbacks
  const [metrics, setMetrics] = useState<ImpactMetric[]>(INITIAL_METRICS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [moments, setMoments] = useState<Moment[]>(INITIAL_MOMENTS);
  const [voices, setVoices] = useState<Voice[]>(INITIAL_VOICES);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

  // Modals state
  const [isEasyGuideOpen, setIsEasyGuideOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);

  // Subscribe to live Firestore updates
  useEffect(() => {
    const unsubMetrics = subscribeMetrics(setMetrics);
    const unsubActivities = subscribeActivities(isAdmin, setActivities);
    const unsubMoments = subscribeMoments(isAdmin, setMoments);
    const unsubVoices = subscribeVoices(isAdmin, setVoices);
    const unsubSettings = subscribeSiteSettings(setSiteSettings);

    return () => {
      unsubMetrics();
      unsubActivities();
      unsubMoments();
      unsubVoices();
      unsubSettings();
    };
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#102138] flex flex-col font-sans selection:bg-[#C4A875]/30">
      {/* 1. Header (Fixed Top Bar Contract) */}
      <Header onOpenAdmin={() => setIsAdminCMSOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* SECTION 01: HERO */}
        <HeroSection settings={siteSettings} />

        {/* SECTION 02: OUR PHILOSOPHY */}
        <PhilosophySection />

        {/* SECTION 03: IMPACT */}
        <ImpactSection metrics={metrics} />

        {/* SECTION 04: OUR JOURNEY */}
        <JourneySection />

        {/* SECTION 05: THREE COMMITTEES */}
        <CommitteesSection onOpenEasyGuide={() => setIsEasyGuideOpen(true)} />

        {/* SECTION 06: HIGHLIGHTS */}
        <HighlightsSection />

        {/* SECTION 07: MOMENTS (PHOTO & VIDEO ARCHIVE) */}
        <MomentsSection moments={moments} />

        {/* SECTION 08: OUR VOICES (STAFF VOICES) */}
        <VoicesSection voices={voices} />

        {/* SECTION 09: NEXT CHAPTER & FOOTER */}
        <NextChapterSection onOpenAdmin={() => setIsAdminCMSOpen(true)} />
      </main>

      {/* Accessible Interactive e-Book Modal */}
      <EasyGuideModal
        isOpen={isEasyGuideOpen}
        onClose={() => setIsEasyGuideOpen(false)}
      />

      {/* Admin Content Management System Modal */}
      <AdminCMS
        isOpen={isAdminCMSOpen}
        onClose={() => setIsAdminCMSOpen(false)}
        metrics={metrics}
        activities={activities}
        moments={moments}
        voices={voices}
        siteSettings={siteSettings}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
