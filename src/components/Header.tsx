import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { user, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '철학', href: '#philosophy' },
    { label: '성과', href: '#impact' },
    { label: '여정', href: '#journey' },
    { label: '3대 위원회', href: '#committees' },
    { label: '대표 사례', href: '#highlights' },
    { label: '아카이브', href: '#moments' },
    { label: '참여 수기', href: '#voices' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#102138]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-gradient-to-b from-[#102138]/90 via-[#102138]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A875] rounded whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#C4A875] text-[#102138] flex items-center justify-center font-bold text-xs tracking-wider font-display">
              PO
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-[#C4A875] transition-colors leading-tight">
                POWER ON
              </span>
              <span className="text-[11px] text-stone-300 font-normal tracking-wide">
                수원시장애인종합복지관
              </span>
            </div>
          </a>

          {/* Zone 2: 4-7 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-200">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="hover:text-[#C4A875] transition-colors whitespace-nowrap shrink-0 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A875] rounded"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action / Admin Portal Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A875] ${
                isAdmin
                  ? 'bg-[#C4A875] text-[#102138] font-semibold hover:bg-[#d6bc8b]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
              title={isAdmin ? '관리자 모드 활성화됨' : '관리자 로그인'}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#102138]" />
                  <span>관리자 모드</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-stone-300" />
                  <span>관리자</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A875] rounded"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Depth Progress Bar */}
        <div
          className="h-[2px] bg-[#C4A875] absolute bottom-0 left-0 transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#102138]/98 backdrop-blur-lg lg:hidden pt-24 px-8 pb-10 flex flex-col justify-between">
          <nav className="flex flex-col gap-6 text-lg font-medium text-stone-200">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left py-2 border-b border-white/10 hover:text-[#C4A875] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </nav>
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <div className="text-xs text-stone-400">
              수원시장애인종합복지관 2024~2026 직원위원회
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 bg-[#C4A875] text-[#102138] rounded text-sm font-semibold text-center"
            >
              {isAdmin ? '관리자 대시보드 열기' : '관리자 로그인'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
