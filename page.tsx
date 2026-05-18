import Link from "next/link";

const tutorials = [
  { emoji: "💻", tag: "برمجة", title: "تعلم Python من الصفر", lessons: "١٢ درس", level: "مبتدئ", bg: "bg-indigo-50", href: "/tutorials/python-basics" },
  { emoji: "🎮", tag: "ألعاب", title: "شرح مود GTA V للمبتدئين", lessons: "٥ دروس", level: "مبتدئ", bg: "bg-orange-50", href: "/tutorials/gta-mods" },
  { emoji: "🌐", tag: "تقنية", title: "إنشاء موقع بـ Next.js 15", lessons: "٨ دروس", level: "متقدم", bg: "bg-emerald-50", href: "/tutorials/nextjs-15" },
  { emoji: "🤖", tag: "ذكاء اصطناعي", title: "أساسيات الذكاء الاصطناعي بالعربي", lessons: "١٠ دروس", level: "للجميع", bg: "bg-purple-50", href: "/tutorials/ai-basics" },
];

export default function TutorialsSection() {
  return (
    <section className="py-12 px-6 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#1F1F1F]">
            📖 العنكبوت <span className="text-[#0067B8]">للشروحات</span>
          </h2>
          <Link href="/tutorials" className="text-[13px] text-[#0067B8] hover:underline">
            عرض الكل ←
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tutorials.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#0067B8] transition-colors"
            >
              <div className={`h-20 ${t.bg} flex items-center justify-center text-3xl`}>
                {t.emoji}
              </div>
              <div className="p-4">
                <span className="inline-block text-[10px] font-medium bg-[#E6F1FB] text-[#0067B8] px-2 py-0.5 rounded mb-2">
                  {t.tag}
                </span>
                <h3 className="text-[14px] font-medium text-gray-900 leading-snug mb-2 group-hover:text-[#0067B8] transition-colors">
                  {t.title}
                </h3>
                <p className="text-[12px] text-gray-400">
                  {t.lessons} — {t.level}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
