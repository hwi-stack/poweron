import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  ImpactMetric,
  Activity,
  Moment,
  Voice,
  SiteSettings,
  PublishStatus
} from '../types';
import {
  INITIAL_METRICS,
  INITIAL_ACTIVITIES,
  INITIAL_MOMENTS,
  INITIAL_VOICES,
  INITIAL_SITE_SETTINGS
} from '../data/initialData';

// Firestore collection names
export const COLLECTIONS = {
  METRICS: 'impact_metrics',
  ACTIVITIES: 'activities',
  MOMENTS: 'moments',
  VOICES: 'voices',
  SETTINGS: 'site_settings'
};

// 1. Metrics
export function subscribeMetrics(
  onUpdate: (metrics: ImpactMetric[]) => void,
  onError?: (err: any) => void
) {
  try {
    const colRef = collection(db, COLLECTIONS.METRICS);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate(INITIAL_METRICS);
          return;
        }
        const data: ImpactMetric[] = [];
        snapshot.forEach((d) => {
          data.push(d.data() as ImpactMetric);
        });
        data.sort((a, b) => a.order - b.order);
        onUpdate(data);
      },
      (error) => {
        console.warn('Metrics snapshot fallback to initial data:', error.message);
        onUpdate(INITIAL_METRICS);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    onUpdate(INITIAL_METRICS);
    return () => {};
  }
}

export async function saveMetric(metric: ImpactMetric): Promise<void> {
  const path = `${COLLECTIONS.METRICS}/${metric.id}`;
  try {
    const docRef = doc(db, COLLECTIONS.METRICS, metric.id);
    await setDoc(docRef, {
      ...metric,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 2. Activities
export function subscribeActivities(
  isAdmin: boolean,
  onUpdate: (activities: Activity[]) => void
) {
  try {
    const colRef = collection(db, COLLECTIONS.ACTIVITIES);
    const q = isAdmin
      ? query(colRef)
      : query(colRef, where('status', '==', 'published'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          const filtered = isAdmin
            ? INITIAL_ACTIVITIES
            : INITIAL_ACTIVITIES.filter((a) => a.status === 'published');
          onUpdate(filtered);
          return;
        }
        const list: Activity[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Activity);
        });
        list.sort((a, b) => a.year - b.year);
        onUpdate(list);
      },
      (error) => {
        console.warn('Activities snapshot fallback:', error.message);
        const filtered = isAdmin
          ? INITIAL_ACTIVITIES
          : INITIAL_ACTIVITIES.filter((a) => a.status === 'published');
        onUpdate(filtered);
      }
    );
  } catch (error) {
    onUpdate(INITIAL_ACTIVITIES);
    return () => {};
  }
}

export async function saveActivity(activity: Activity): Promise<void> {
  const path = `${COLLECTIONS.ACTIVITIES}/${activity.id}`;
  try {
    const docRef = doc(db, COLLECTIONS.ACTIVITIES, activity.id);
    await setDoc(docRef, {
      ...activity,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteActivity(id: string): Promise<void> {
  const path = `${COLLECTIONS.ACTIVITIES}/${id}`;
  try {
    await deleteDoc(doc(db, COLLECTIONS.ACTIVITIES, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 3. Moments
export function subscribeMoments(
  isAdmin: boolean,
  onUpdate: (moments: Moment[]) => void
) {
  try {
    const colRef = collection(db, COLLECTIONS.MOMENTS);
    const q = isAdmin
      ? query(colRef)
      : query(colRef, where('status', '==', 'published'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          const filtered = isAdmin
            ? INITIAL_MOMENTS
            : INITIAL_MOMENTS.filter((m) => m.status === 'published');
          onUpdate(filtered);
          return;
        }
        const list: Moment[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Moment);
        });
        list.sort((a, b) => a.order - b.order);
        onUpdate(list);
      },
      (error) => {
        console.warn('Moments snapshot fallback:', error.message);
        const filtered = isAdmin
          ? INITIAL_MOMENTS
          : INITIAL_MOMENTS.filter((m) => m.status === 'published');
        onUpdate(filtered);
      }
    );
  } catch (error) {
    onUpdate(INITIAL_MOMENTS);
    return () => {};
  }
}

export async function saveMoment(moment: Moment): Promise<void> {
  const path = `${COLLECTIONS.MOMENTS}/${moment.id}`;
  try {
    const docRef = doc(db, COLLECTIONS.MOMENTS, moment.id);
    await setDoc(docRef, {
      ...moment,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteMoment(id: string): Promise<void> {
  const path = `${COLLECTIONS.MOMENTS}/${id}`;
  try {
    await deleteDoc(doc(db, COLLECTIONS.MOMENTS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 4. Voices
export function subscribeVoices(
  isAdmin: boolean,
  onUpdate: (voices: Voice[]) => void
) {
  try {
    const colRef = collection(db, COLLECTIONS.VOICES);
    const q = isAdmin
      ? query(colRef)
      : query(colRef, where('status', '==', 'published'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          const filtered = isAdmin
            ? INITIAL_VOICES
            : INITIAL_VOICES.filter((v) => v.status === 'published');
          onUpdate(filtered);
          return;
        }
        const list: Voice[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Voice);
        });
        list.sort((a, b) => a.order - b.order);
        onUpdate(list);
      },
      (error) => {
        console.warn('Voices snapshot fallback:', error.message);
        const filtered = isAdmin
          ? INITIAL_VOICES
          : INITIAL_VOICES.filter((v) => v.status === 'published');
        onUpdate(filtered);
      }
    );
  } catch (error) {
    onUpdate(INITIAL_VOICES);
    return () => {};
  }
}

export async function saveVoice(voice: Voice): Promise<void> {
  const path = `${COLLECTIONS.VOICES}/${voice.id}`;
  try {
    const docRef = doc(db, COLLECTIONS.VOICES, voice.id);
    await setDoc(docRef, {
      ...voice,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteVoice(id: string): Promise<void> {
  const path = `${COLLECTIONS.VOICES}/${id}`;
  try {
    await deleteDoc(doc(db, COLLECTIONS.VOICES, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 5. Site Settings
export function subscribeSiteSettings(
  onUpdate: (settings: SiteSettings) => void
) {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'main');
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          onUpdate(INITIAL_SITE_SETTINGS);
          return;
        }
        onUpdate(snapshot.data() as SiteSettings);
      },
      (error) => {
        console.warn('Site settings fallback:', error.message);
        onUpdate(INITIAL_SITE_SETTINGS);
      }
    );
  } catch (error) {
    onUpdate(INITIAL_SITE_SETTINGS);
    return () => {};
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const path = `${COLLECTIONS.SETTINGS}/main`;
  try {
    await setDoc(doc(db, COLLECTIONS.SETTINGS, 'main'), {
      ...settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 6. Admin Seeder: writes initial official report data to Firestore
export async function seedInitialDataToFirestore(): Promise<void> {
  // Metrics
  for (const m of INITIAL_METRICS) {
    await saveMetric(m);
  }
  // Activities
  for (const a of INITIAL_ACTIVITIES) {
    await saveActivity(a);
  }
  // Moments
  for (const mo of INITIAL_MOMENTS) {
    await saveMoment(mo);
  }
  // Voices
  for (const v of INITIAL_VOICES) {
    await saveVoice(v);
  }
  // Settings
  await saveSiteSettings(INITIAL_SITE_SETTINGS);
}
