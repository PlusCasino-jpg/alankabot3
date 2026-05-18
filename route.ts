import Link from "next/link";

const footerLinks = {
  الأقسام: [
    { label: "الألعاب", href: "/games" },
    { label: "الشروحات", href: "/tutorials" },
    { label: "التحميلات", href: "/downloads" },
    { label: "المنتدى", href: "/forum" },
    { label: "سوق العنكبوت", href: "/souq" },
  ],
  المجتمع: [
    { label: "إنشاء حساب", href: "/auth/register" },
    { label: "تسجيل الدخول", href: "/auth/login" },
    { label: "أعضاء المنصة", href: "/members" },
    { label: "المقالات", href: "/articles" },
    { label: "الأخبار", href: "/news" },
  ],
  الدعم: [
    { label: "مركز المساعدة", href: "/help" },
    { label: "تواصل معنا", href: "/contact" },
    { label: "الإبلاغ عن مشكلة", href: "/report" },
    { label: "اقتراحات", href: "/feedback" },
  ],
  قانوني: [
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "شروط الاستخدام", href: "/terms" },
    { label: "سياسة الإعلانات", href: "/ads-policy" },
    { label: "سياسة الكوكيز", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#0067B8] rounded flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="3" fill="white" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1={10 + 4 * Math.cos(rad)}
                        y1={10 + 4 * Math.sin(rad)}
                        x2={10 + 8.5 * Math.cos(rad)}
                        y2={10 + 8.5 * Math.sin(rad)}
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
              </div>
              <span className="font-semibold text-[15px]">العنكبوت للمعلومات</span>
            </div>
            <p className="text-[12px] text-white/50 leading-relaxed mb-4">
              منصة عربية متكاملة تجمع الألعاب والشروحات والتحميلات والمنتدى وسوق البيع في مكان واحد احترافي.
            </p>
            <p className="text-[11px] text-white/30">alankabot.com</p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-medium text-white/60 uppercase tracking-wider mb-3">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} العنكبوت للمعلومات — جميع الحقوق محفوظة
          </p>
          <div className="flex gap-3">
            {[
              { label: "تويتر", href: "https://twitter.com" },
              { label: "يوتيوب", href: "https://youtube.com" },
              { label: "ديسكورد", href: "https://discord.com" },
              { label: "إنستغرام", href: "https://instagram.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[10px] text-white/50 hover:text-white transition-all"
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
