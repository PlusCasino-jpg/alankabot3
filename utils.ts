import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "العنكبوت — souq",
  alternates: { canonical: "https://alankabot.com/souq" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-[#F5F5F7] py-10 px-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1F1F1F]">صفحة souq</h1>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-6 py-10">
          <p className="text-gray-500">المحتوى قيد الإنشاء...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
