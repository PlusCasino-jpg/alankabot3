"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "الألعاب", href: "/games", sub: ["أحدث الألعاب", "المراجعات", "أخبار الألعاب"] },
  { label: "الشروحات", href: "/tutorials", sub: ["شروحات تقنية", "شروحات ألعاب", "شروحات برمجة"] },
  { label: "التحميلات", href: "/downloads", sub: ["برامج", "أدوات", "ملفات"] },
  { label: "المنتدى", href: "/forum", sub: null },
  { label: "سوق العنكبوت", href: "/souq", sub: ["إلكترونيات", "ألعاب", "خدمات"] },
  { label: "المقالات", href: "/articles", sub: null },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Main header row */}
      <div className="flex items-center justify-between h-12 px-4 md:px-8 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-[#0067B8] rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" fill="white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 10 + 4 * Math.cos(rad);
                const y1 = 10 + 4 * Math.sin(rad);
                const x2 = 10 + 8.5 * Math.cos(rad);
                const y2 = 10 + 8.5 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          </div>
          <span className="font-semibold text-[15px] text-gray-900 hidden sm:block">
            العنكبوت للمعلومات
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative group"
              onMouseEnter={() => setActiveNav(item.href)}
              onMouseLeave={() => setActiveNav(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-[13px] text-gray-600 hover:text-[#0067B8] transition-colors rounded",
                  activeNav === item.href && "text-[#0067B8]"
                )}
              >
                {item.label}
                {item.sub && <ChevronDown size={12} className="opacity-60" />}
              </Link>
              {item.sub && activeNav === item.href && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] z-50">
                  {item.sub.map((s) => (
                    <Link
                      key={s}
                      href={`${item.href}`}
                      className="block px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-[#0067B8] transition-colors"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form
              className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) window.location.href = `/search?q=${searchQuery}`;
              }}
            >
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المنصة..."
                className="bg-transparent text-[13px] outline-none w-48 text-right"
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <X size={14} className="text-gray-400" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-500 transition-colors"
            >
              <Search size={13} />
              <span className="hidden md:block">بحث...</span>
            </button>
          )}

          <Link
            href="/auth/login"
            className="hidden md:block text-[12px] px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/auth/register"
            className="text-[12px] px-3 py-1.5 bg-[#0067B8] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
          >
            <span className="hidden md:block">إنشاء حساب</span>
            <User size={14} className="md:hidden" />
          </Link>

          <button
            className="lg:hidden p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center py-2.5 text-[14px] text-gray-700 border-b border-gray-100 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
            <Link href="/auth/login" className="flex-1 text-center text-[13px] py-2 border border-gray-300 rounded-lg">
              تسجيل الدخول
            </Link>
            <Link href="/auth/register" className="flex-1 text-center text-[13px] py-2 bg-[#0067B8] text-white rounded-lg">
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
