import { CommitteeInfo, ImpactMetric, Activity, Moment, Voice, HighlightStory, SiteSettings } from '../types';

// Direct ES module imports so Vite bundles and hashes valid URLs
import smartworkKoreanImg from '../assets/images/smartwork_korean_team_1794460532171.jpg';
import esgKoreanImg from '../assets/images/esg_korean_campaign_1794460532534.jpg';
import easyGuideKoreanImg from '../assets/images/easy_guide_korean_1794460532508.jpg';
import heroBgImg from '../assets/images/hero_abstract_navy_1794458263180.jpg';
import smartworkVisualImg from '../assets/images/smartwork_visual_1794458264575.jpg';
import esgCampaignVisualImg from '../assets/images/esg_campaign_visual_1794458264673.jpg';
import easyGuideCoverImg from '../assets/images/easy_guide_cover_1794458263505.jpg';

export const COMMITTEES: Record<string, CommitteeInfo> = {
  growth: {
    id: 'growth',
    name: '조직성장위원회',
    tagline: '더 나은 일하는 방식을 만들어갑니다.',
    description: '직원이 체감하는 조직의 문제를 함께 발견하고, 부서 간 이해와 협력을 넓히며, 스마트워크를 통한 업무혁신을 실천합니다.',
    color: 'committee-growth',
    hex: '#527DA1',
    iconName: 'TrendingUp'
  },
  esg: {
    id: 'esg',
    name: 'ESG위원회',
    tagline: '일상의 작은 실천이 지속가능한 변화를 만듭니다.',
    description: '친환경 실천을 시작으로 이용인과 직원이 함께 참여하는 상호존중 문화를 확산하며, ESG의 가치를 일상 속 행동으로 연결합니다.',
    color: 'committee-esg',
    hex: '#5F866B',
    iconName: 'Leaf'
  },
  developmental: {
    id: 'developmental',
    name: '발달장애인지원위원회',
    tagline: '누구나 이해하고 이용할 수 있는 복지관을 만듭니다.',
    description: '발달장애인의 눈높이에서 정보와 이용환경을 다시 살펴보고, 쉽고 명확한 안내를 통해 정보접근성과 이용 편의를 높이고자 노력합니다.',
    color: 'committee-dev',
    hex: '#BC925C',
    iconName: 'Users'
  }
};

export const INITIAL_METRICS: ImpactMetric[] = [
  {
    id: 'metric-1',
    category: '거버넌스 (G)',
    title: '직원위원회 운영',
    value: '3',
    unit: '개',
    description: '조직성장, ESG, 발달장애인지원 3대 분과로 전문화된 자율 직원위원회 운영',
    order: 1,
    highlight: true
  },
  {
    id: 'metric-2',
    category: '소통 및 참여',
    title: '회의 및 활동',
    value: '56',
    unit: '회',
    description: '정기 회의, 자체 스터디, 현장 개선 워크숍, 전사 실천 캠페인 누적 진행',
    order: 2,
    highlight: true
  },
  {
    id: 'metric-3',
    category: '직원 주도',
    title: '참여 실인원',
    value: '69',
    unit: '명',
    description: '직급과 직종을 넘어 자발적으로 참여하여 조직 혁신에 동참한 직원',
    order: 3,
    highlight: true
  },
  {
    id: 'metric-4',
    category: '조직문화 개선',
    title: '부서 간 긍정적 인식 변화',
    value: '87.5',
    unit: '%',
    description: '조직성장위원회의 부서 간 교류 활동 진행 후 협업과 신뢰에 대한 긍정적 인식 변화',
    order: 4,
    highlight: true
  },
  {
    id: 'metric-5',
    category: '친환경 실천 (E)',
    title: '텀블러 사용 횟수 증가율',
    value: '+80.3',
    unit: '%',
    description: 'ESG위원회 텀블러 사용 캠페인 추진 후 최초 측정 대비 직원 텀블러 사용 횟수 증가폭',
    order: 5,
    highlight: true
  },
  {
    id: 'metric-6',
    category: '자원 절감 (E)',
    title: '잔반 발생량 감소율',
    value: '-70',
    unit: '%',
    description: 'ESG위원회 잔반 줄이기 전사 캠페인을 통한 구내식당 잔반 배출량 대폭 감축',
    order: 6,
    highlight: true
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  // 2024 기반 구축
  {
    id: 'act-2024-growth',
    year: 2024,
    committee: 'growth',
    title: '조직문화 및 업무시스템 진단',
    objective: '직원 성장환경 및 현장 업무 프로세스 기초 분석',
    content: '조직문화, 업무시스템, 직원 성장환경에 대한 기초 진단을 수행하고, 복지관의 강점과 구체적인 개선 과제를 도출하였습니다.',
    results: '부서 간 소통 장벽 파악 및 개선 우선순위 과제 도출',
    status: 'published'
  },
  {
    id: 'act-2024-esg',
    year: 2024,
    committee: 'esg',
    title: '환경영역 실천 수준 진단',
    objective: '기관 내 에너지 소비 및 일회용품 사용 실태 분석',
    content: '기관 내 친환경 실천 수준을 종합적으로 진단하고 일상 업무 속에서 실천 가능한 친환경 개선 과제를 발굴하였습니다.',
    results: '잔반 감축 및 일회용 컵 사용 축소 로드맵 수립',
    status: 'published'
  },
  {
    id: 'act-2024-dev',
    year: 2024,
    committee: 'developmental',
    title: '발달장애인 지원 도서 스터디 및 환경 진단',
    objective: '당사자 중심의 이용 환경 및 정보 전달 체계 학습',
    content: '발달장애인 지원 관련 전문 도서 스터디를 매월 운영하고, 복지관 내 지원 환경의 장벽을 당사자 시각에서 점검하고 개선 방향을 논의하였습니다.',
    results: '쉬운 정보제공 가이드라인 마련 필요성 확인',
    status: 'published'
  },

  // 2025 실천
  {
    id: 'act-2025-growth',
    year: 2025,
    committee: 'growth',
    title: '부서 간 교류 활동 추진',
    objective: '직원 간 상호 이해와 유기적 협력 강화',
    content: '기존의 부서 중심 칸막이를 낮추기 위해 직종별·부서별 교류 프로그램을 기획하고 일상적 소통 기회를 정례화하였습니다.',
    results: '부서 간 긍정적 인식 변화 87.5% 달성',
    status: 'published'
  },
  {
    id: 'act-2025-esg',
    year: 2025,
    committee: 'esg',
    title: '생활 속 친환경 실천 캠페인',
    objective: '기관 차원의 탄소중립 및 일상 친환경 습관 정착',
    content: '구내식당 잔반 줄이기 챌린지, 전 직원 개인 텀블러 사용 생활화, 올바른 쓰레기 분리배출 캠페인을 단계별로 추진하였습니다.',
    results: '텀블러 사용 횟수 80.3% 증가, 잔반 발생량 70% 감소',
    status: 'published'
  },
  {
    id: 'act-2025-dev',
    year: 2025,
    committee: 'developmental',
    title: '쉬운 이용안내서 제작 및 배포',
    objective: '발달장애인 이용인의 정보접근권 보장',
    content: '복지관 이용 절차와 시설을 알기 쉽게 정리한 「쉬운 이용안내서」 1종을 직접 제작하였습니다. 실물 인쇄물 10부를 비치하고 디지털 e-book 1종을 동시 배포하였습니다.',
    results: '쉬운 안내서 1종 발간 (인쇄물 10부 비치, e-book 제작)',
    status: 'published'
  },

  // 2026 확장 및 고도화
  {
    id: 'act-2026-growth',
    year: 2026,
    committee: 'growth',
    title: '스마트워크 자체 스터디 및 웹앱 개발',
    objective: '반복적 비효율 업무 제거와 디지털 업무혁신',
    content: '노코드/로우코드 툴과 웹앱 개발을 학습하는 스마트워크 스터디를 조직하여, 복지관 현장의 반복 서식 작성과 취합 업무를 개선하는 맞춤형 웹앱을 직원이 직접 개발하였습니다.',
    results: '직원 자체 역량 기반 맞춤 웹앱 개발 및 현장 적용',
    status: 'published'
  },
  {
    id: 'act-2026-esg',
    year: 2026,
    committee: 'esg',
    title: '상호존중 캠페인 (인사·감사·칭찬)',
    objective: '이용인과 직원이 함께 만드는 따뜻한 조직문화',
    content: '환경(E)을 넘어 사회(S)와 조직문화로 ESG를 확장하여, 먼저 인사하기, 감사 나누기, 칭찬 릴레이를 전사적으로 전개하여 상호존중의 문화를 조성하였습니다.',
    results: '이용인-직원 간 신뢰 향상 및 긍정적 라포 형성',
    status: 'published'
  },
  {
    id: 'act-2026-dev',
    year: 2026,
    committee: 'developmental',
    title: '프로그램실별 쉬운 공간안내서 제작',
    objective: '공간 인지와 자율적 동선 이동 편의 극대화',
    content: '복지관 내 각 프로그램실과 주요 이용시설마다 발달장애인의 직관적 이해를 돕는 쉬운 픽토그램과 명확한 텍스트로 구성된 공간안내서를 부착·설치하였습니다.',
    results: '프로그램실 전역 쉬운 공간안내 시스템 완비',
    status: 'published'
  }
];

export const INITIAL_HIGHLIGHTS: HighlightStory[] = [
  {
    id: 'hl-1',
    committee: 'growth',
    title: '부서 간 소통에서 스마트워크로 이어진 조직혁신',
    subtitle: '칸막이를 허물고, 비효율을 직접 디지털로 해결하다',
    background: '부서 간 업무 프로세스 공유 부족과 수기 서식 취합으로 인한 반복 업무가 직원들의 피로도를 높이고 있었습니다.',
    action: '2025년 부서 간 교류 프로그램을 시작으로 2026년에는 직원들이 자발적으로 모여 스마트워크 스터디를 결성하고, 현장에 꼭 필요한 맞춤형 업무 웹앱을 자체 개발하였습니다.',
    result: '부서 간 긍정적 인식 변화 87.5%를 이끌어냈으며, 개발된 웹앱을 통해 복잡한 반복 업무를 간소화하여 서비스 본연에 집중하는 스마트 업무 기반을 마련했습니다.',
    imageUrl: smartworkKoreanImg,
    imageCaption: '스마트워크 연구 및 현장 웹앱 적용 회의 모습'
  },
  {
    id: 'hl-2',
    committee: 'esg',
    title: '친환경 캠페인에서 상호존중 문화로 확장된 ESG 실천',
    subtitle: '작은 텀블러 실천이 따뜻한 인사와 칭찬의 조직문화로',
    background: 'ESG 경영이 공공복지 현장에서는 거창하거나 추상적인 구호로 느껴져 직원들이 실천에 거리감을 느꼈습니다.',
    action: '잔반 줄이기와 개인 텀블러 사용처럼 즉시 가능한 일상 친환경 활동부터 시작했습니다. 2026년에는 이를 사회(S) 영역인 인사·감사·칭찬 캠페인으로 확장하여 이용인과 직원이 함께하는 상호존중 문화를 만들었습니다.',
    result: '텀블러 사용 횟수 +80.3% 증가, 잔반량 -70% 감소라는 뚜렷한 수치적 결실과 함께 서로를 배려하는 따뜻한 복지관 문화를 형성했습니다.',
    imageUrl: esgKoreanImg,
    imageCaption: '친환경 텀블러 사용 및 상호존중 실천 캠페인'
  },
  {
    id: 'hl-3',
    committee: 'developmental',
    title: '쉬운 이용안내서에서 공간 안내 개선으로 이어진 정보접근성 강화',
    subtitle: '발달장애인의 눈높이에서 복지관의 문턱을 낮추다',
    background: '복지관 내 각종 안내문과 동선 표기가 문자 중심이어서 발달장애인 이용인이 스스로 시설을 찾고 서비스를 이용하기에 어려움이 있었습니다.',
    action: '도서 스터디로 전문 지식을 쌓은 위원회가 쉬운 단어와 픽토그램을 조합한 「쉬운 이용안내서」 책자와 e-book을 제작하였고, 이어서 복지관 프로그램실마다 직관적인 쉬운 공간안내서를 제작·설치했습니다.',
    result: '발달장애인 이용인의 자립적 복지관 이용 편의가 증대되었으며, 종이책과 디지털 e-book의 옴니채널 제공으로 정보접근성이 획기적으로 개선되었습니다.',
    imageUrl: easyGuideKoreanImg,
    imageCaption: '안내데스크 쉬운 이용안내서 소개 및 정보제공 모습'
  }
];

export const INITIAL_MOMENTS: Moment[] = [
  {
    id: 'video-1',
    title: '2024~2026 직원위원회 3개년 활동 성과 하이라이트 영상',
    year: 2026,
    committee: 'growth',
    description: '조직성장, ESG, 발달장애인지원 3대 분과가 함께 일군 혁신 과정과 3년간의 성과를 집약한 공식 다큐멘터리 영상입니다.',
    mediaType: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: smartworkKoreanImg,
    status: 'published',
    order: 0
  },
  {
    id: 'video-2',
    title: '직원이 말하는 변화의 스위치 (스마트워크 & 상호존중 현장 인터뷰)',
    year: 2026,
    committee: 'esg',
    description: '위원회 활동에 직접 참여한 직원들의 생생한 소감과 이용인과 함께 만든 상호존중 문화 인터뷰 영상입니다.',
    mediaType: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: esgKoreanImg,
    status: 'published',
    order: 1
  },
  {
    id: 'moment-1',
    title: '2024 직원위원회 킥오프 및 운영방향 정립 워크숍',
    year: 2024,
    committee: 'growth',
    description: '3대 직원위원회 출범 및 3개년 로드맵 설정을 위한 위원장 및 위원 합동 워크숍 현장',
    mediaType: 'photo',
    url: smartworkKoreanImg,
    status: 'published',
    order: 2
  },
  {
    id: 'moment-2',
    title: '2025 지구를 위한 하루, 텀블러 데이 실천',
    year: 2025,
    committee: 'esg',
    description: '전 직원이 일회용 컵 대신 개인 텀블러를 지참하고 구내 카페를 이용하는 친환경 실천의 날',
    mediaType: 'photo',
    url: esgKoreanImg,
    status: 'published',
    order: 2
  },
  {
    id: 'moment-3',
    title: '2025 발달장애인 쉬운 이용안내서 발간 기념 감수회',
    year: 2025,
    committee: 'developmental',
    description: '이용인과 함께 읽으며 단어와 픽토그램의 난이도를 직접 검증한 감수 회의',
    mediaType: 'photo',
    url: easyGuideKoreanImg,
    status: 'published',
    order: 3
  },
  {
    id: 'moment-4',
    title: '2026 스마트워크 스터디 & 업무개선 웹앱 시연',
    year: 2026,
    committee: 'growth',
    description: '직원들이 직접 기획하고 개발한 업무 보조 웹앱의 첫 시연 및 피드백 청취 시간',
    mediaType: 'photo',
    url: smartworkVisualImg,
    status: 'published',
    order: 4
  },
  {
    id: 'moment-5',
    title: '2026 인사·감사·칭찬 릴레이 캠페인 포스터 & 칭찬함',
    year: 2026,
    committee: 'esg',
    description: '복지관 로비에 마련된 칭찬 카드 게시판과 서로에게 따뜻한 응원을 건네는 임직원들',
    mediaType: 'photo',
    url: esgCampaignVisualImg,
    status: 'published',
    order: 5
  },
  {
    id: 'moment-6',
    title: '2026 프로그램실별 쉬운 공간안내 부착 점검',
    year: 2026,
    committee: 'developmental',
    description: '발달장애인 눈높이에 맞춘 픽토그램 안내판이 실제 시설 입구에 부착된 모습',
    mediaType: 'photo',
    url: easyGuideCoverImg,
    status: 'published',
    order: 6
  }
];

export const INITIAL_VOICES: Voice[] = [
  {
    id: 'voice-1',
    name: '조직성장위원회 참여 직원',
    committee: 'growth',
    title: '"칸막이를 넘어 동료의 일을 깊이 이해하게 되었습니다"',
    content: '늘 우리 부서 일만 보느라 바빴는데, 교류 활동과 스터디를 함께하면서 서로의 고충을 공감하게 되었습니다. 나아가 우리가 겪는 반복 작업을 직접 웹앱으로 해결해 보면서 조직의 변화가 먼 이야기가 아님을 느꼈습니다.',
    status: 'published',
    order: 1
  },
  {
    id: 'voice-2',
    name: 'ESG위원회 위원',
    committee: 'esg',
    title: '"작은 텀블러 한 잔이 만든 큰 자부심"',
    content: '처음엔 텀블러를 씻고 챙기는 게 번거로울 거라 생각했지만, 함께 실천하다 보니 텀블러 사용이 80% 이상 늘었습니다. 식당 잔반도 눈에 띄게 줄었고, 이제는 서로 웃으며 먼저 인사하는 따뜻한 분위기가 자리 잡았습니다.',
    status: 'published',
    order: 2
  },
  {
    id: 'voice-3',
    name: '발달장애인지원위원회 위원',
    committee: 'developmental',
    title: '"쉬운 안내서는 이용인을 향한 우리의 존중입니다"',
    content: '어려운 행정 용어 대신 쉬운 글과 그림으로 안내서를 만들고, 이용인들이 환하게 웃으며 안내서를 혼자 넘겨보는 모습을 보았을 때 가장 큰 보람을 느꼈습니다. 공간 안내까지 이어지며 복지관이 한층 더 친절해졌습니다.',
    status: 'published',
    order: 3
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  id: 'main',
  heroTitle: 'POWER ON',
  heroSubTitle: '변화의 스위치를 켜다.',
  heroDescription: '직원이 제안하고 함께 바꾸는 참여형 ESG 경영',
  heroMessage: '우리의 참여가 조직의 변화가 되고, 더 나은 서비스로 이어집니다.',
  heroBgUrl: heroBgImg
};
