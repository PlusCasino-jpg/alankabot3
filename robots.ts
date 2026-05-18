import Link from "next/link";
import { Heart, ShoppingCart, Plus } from "lucide-react";

const items = [
  { emoji: "🎮", name: "PlayStation 5 — مع دراعين", price: "٢,٢٠٠", currency: "ريال", seller: "سعد_الرياض", condition: "جديد", bg: "bg-indigo-50", href: "/souq/ps5-bundle" },
  { emoji: "💻", name: "MacBook Pro M3 — 16 بوصة", price: "٧,٥٠٠", currency: "ريال", seller: "tech_store", condition: "مستعمل", bg: "bg-orange-50", href: "/souq/macbook-m3" },
  { emoji: "🛠️", name: "خدمة: تصميم موقع احترافي", price: "٨٠٠", currency: "ريال", seller: "dev_amr", condition: "خدمة", bg: "bg-emerald-50", href: "/souq/web-design-service" },
  { emoji: "🎧", name: "Sony WH-1000XM5 — سماعات", price: "١,١٠٠", currency: "ريال", seller: "Ali_KW", condition: "جديد", bg: "bg-purple-50", href: "/souq/sony-headphones" },
];

const conditionColors: Record<string, string> = {
  جديد: "text-emerald-600 bg-emerald-50",
  مستعمل: "text-amber-600 bg-amber-50",
  خدمة: "text-blue-600 bg-blue-50",
};

export default function SouqSection() {
  return (
    <section className="py-12 px-6 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#1F1F1F]">
            🛒 سوق <span className="text-[#0067B8]">العنكبوت</span>
          </h2>
          <div className="flex items-center gap-3">
            <Link
              href="/souq/new"
              className="flex items-center gap-1 text-[12px] px-4 py-1.5 border border-[#0067B8] text-[#0067B8] rounded-lg hover:bg-[#E6F1FB] transition-colors"
            >
              <Plus size={13} />
              أضف إعلاناً
            </Link>
            <Link href="/souq" className="text-[13px] text-[#0067B8] hover:underline">
              عرض الكل ←
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.href} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#0067B8] transition-colors">
              <div className={`h-24 ${item.bg} flex items-center justify-center text-4xl`}>
                {item.emoji}
              </div>
              <div className="p-4">
                <h3 className="text-[13px] font-medium text-gray-900 mb-2 leading-snug group-hover:text-[#0067B8] transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl font-bold text-[#0067B8]">{item.price}</span>
                  <span className="text-[12px] text-gray-400">{item.currency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{item.seller}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${conditionColors[item.condition] || "bg-gray-100 text-gray-500"}`}>
                    {item.condition}
                  </span>
                </div>
              </div>
              <div className="px-4 pb-4 flex gap-2">
                <Link
                  href={item.href}
                  className="flex-1 flex items-center justify-center gap-1 bg-[#0067B8] text-white text-[12px] py-2 rounded-lg hover:bg-[#005a9e] transition-colors"
                >
                  <ShoppingCart size={13} />
                  {item.condition === "خدمة" ? "احجز الآن" : "اشترِ الآن"}
                </Link>
                <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors">
                  <Heart size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
