import Link from "next/link";
import { MessageSquare, Eye } from "lucide-react";

const topics = [
  { title: "ما هو أفضل لابتوب للبرمجة في 2025؟", author: "أحمد_كودر", time: "منذ ساعتين", category: "تقنية", replies: 42, views: 870, href: "/forum/best-laptop-2025" },
  { title: "مشكلة في تثبيت درايفرات RTX 4090 على Windows 11", author: "gamer_pro", time: "منذ ٥ ساعات", category: "مساعدة", replies: 18, views: 340, href: "/forum/rtx-4090-driver" },
  { title: "شارك معنا أفضل لعبة لعبتها في 2025", author: "عنكبوت_جيمر", time: "منذ يوم", category: "نقاشات", replies: 117, views: 2400, href: "/forum/best-game-2025" },
  { title: "دليل شامل: كيف تبدأ تعلم البرمجة من الصفر", author: "dev_guide", time: "منذ ٣ أيام", category: "برمجة", replies: 63, views: 5200, href: "/forum/learn-programming" },
];

const categoryColors: Record<string, string> = {
  تقنية: "bg-blue-50 text-blue-600",
  مساعدة: "bg-amber-50 text-amber-600",
  نقاشات: "bg-purple-50 text-purple-600",
  برمجة: "bg-green-50 text-green-600",
};

export default function ForumSection() {
  return (
    <section className="py-12 px-6 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#1F1F1F]">
            💬 العنكبوت <span className="text-[#0067B8]">للمنتدى</span>
          </h2>
          <div className="flex items-center gap-3">
            <Link href="/forum/new" className="text-[12px] px-4 py-1.5 bg-[#0067B8] text-white rounded-lg hover:bg-[#005a9e] transition-colors">
              + موضوع جديد
            </Link>
            <Link href="/forum" className="text-[13px] text-[#0067B8] hover:underline">
              عرض الكل ←
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-[#0067B8] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-medium text-gray-900 mb-2 group-hover:text-[#0067B8] transition-colors leading-snug">
                    {t.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[12px] text-gray-400">
                    <span>{t.author}</span>
                    <span>·</span>
                    <span>{t.time}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        categoryColors[t.category] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-[12px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <MessageSquare size={13} />
                    <span className="font-medium text-[#0067B8]">{t.replies}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1">
                    <Eye size={13} />
                    <span>{t.views.toLocaleString("ar-SA")}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
