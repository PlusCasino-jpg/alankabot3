import Link from "next/link";

const stats = [
  { num: "١٢٠,٠٠٠", label: "عضو مسجّل" },
  { num: "٤٥,٠٠٠", label: "موضوع في المنتدى" },
  { num: "٨,٥٠٠", label: "ملف للتحميل" },
  { num: "٣٢٠", label: "إعلان نشط في السوق" },
];

export default function HeroSection() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#F5F5F7] py-14 md:py-20 px-6">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-[12px] font-medium text-[#0067B8] bg-[#E6F1FB] px-3 py-1 rounded-full mb-4">
              المنصة الرقمية العربية الأولى
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] leading-tight mb-4">
              منصتك العربية
              <br />
              للمحتوى{" "}
              <span className="text-[#0067B8]">الرقمي</span>
            </h1>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-8 max-w-md">
              ألعاب، شروحات، تحميلات، منتدى، وسوق إلكتروني — كل ما تحتاجه في مكان واحد. انضم إلى أكبر مجتمع عربي رقمي.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/register"
                className="px-6 py-2.5 bg-[#0067B8] text-white rounded-lg text-[14px] font-medium hover:bg-[#005a9e] transition-colors"
              >
                ابدأ الآن مجاناً
              </Link>
              <Link
                href="/games"
                className="px-6 py-2.5 border-2 border-[#0067B8] text-[#0067B8] rounded-lg text-[14px] font-medium hover:bg-[#E6F1FB] transition-colors"
              >
                استعرض المحتوى
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="bg-[#0067B8] rounded-xl p-4 mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-white/70 mb-1">المحتوى المميز اليوم</p>
                <p className="text-[14px] font-semibold text-white">مراجعة: GTA VI — تحفة الجيل الجديد</p>
              </div>
              <span className="text-3xl">🎮</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "١٢٠K", label: "عضو نشط", color: "text-[#0067B8]" },
                { num: "٨٫٥K", label: "شرح وتحميل", color: "text-[#0067B8]" },
                { num: "٣٢٠", label: "إعلان في السوق", color: "text-emerald-600" },
                { num: "٤٫٩ ⭐", label: "تقييم المستخدمين", color: "text-amber-600" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3.5">
                  <div className={`text-xl font-bold ${s.color}`}>{s.num}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#0067B8]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-5 px-4 ${i !== 0 ? "border-r border-white/20" : ""}`}
            >
              <div className="text-2xl font-bold text-white">{s.num}</div>
              <div className="text-[12px] text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
