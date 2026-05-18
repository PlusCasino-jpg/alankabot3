import Link from "next/link";

const games = [
  {
    emoji: "🎮",
    tag: "RPG",
    title: "Elden Ring — توسعة Shadow of the Erdtree",
    desc: "مراجعة شاملة للتوسعة الجديدة",
    rating: "4.9",
    date: "منذ يومين",
    bg: "bg-indigo-50",
    href: "/games/elden-ring-dlc",
  },
  {
    emoji: "🏎️",
    tag: "سباق",
    title: "Need for Speed Unbound — الموسم الجديد",
    desc: "كل ما تحتاج معرفته عن التحديث",
    rating: "4.2",
    date: "منذ أسبوع",
    bg: "bg-orange-50",
    href: "/games/nfs-unbound",
  },
  {
    emoji: "⚽",
    tag: "رياضة",
    title: "EA FC 25 — أفضل اللاعبين في الموسم",
    desc: "قائمة اللاعبين الأعلى تقييماً",
    rating: "4.5",
    date: "منذ ٣ أيام",
    bg: "bg-green-50",
    href: "/games/ea-fc-25",
  },
];

export default function GamesSection() {
  return (
    <section className="py-12 px-6 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#1F1F1F]">
            🎮 العنكبوت <span className="text-[#0067B8]">للألعاب</span>
          </h2>
          <Link href="/games" className="text-[13px] text-[#0067B8] hover:underline">
            عرض الكل ←
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {["أحدث الألعاب", "المراجعات", "أخبار الألعاب"].map((tab, i) => (
            <button
              key={tab}
              className={`text-[12px] px-4 py-1.5 rounded-full border transition-colors ${
                i === 0
                  ? "bg-[#0067B8] text-white border-[#0067B8]"
                  : "bg-transparent text-gray-500 border-gray-200 hover:border-[#0067B8] hover:text-[#0067B8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#0067B8] transition-colors"
            >
              <div className={`h-24 ${game.bg} flex items-center justify-center text-4xl`}>
                {game.emoji}
              </div>
              <div className="p-4">
                <span className="inline-block text-[10px] font-medium bg-[#E6F1FB] text-[#0067B8] px-2 py-0.5 rounded mb-2">
                  {game.tag}
                </span>
                <h3 className="text-[14px] font-medium text-gray-900 mb-1 leading-snug group-hover:text-[#0067B8] transition-colors">
                  {game.title}
                </h3>
                <p className="text-[12px] text-gray-500">{game.desc}</p>
              </div>
              <div className="px-4 pb-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <span className="text-amber-400">★★★★★</span>
                  <span>{game.rating}</span>
                </div>
                <span className="text-[11px] text-gray-400">{game.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
