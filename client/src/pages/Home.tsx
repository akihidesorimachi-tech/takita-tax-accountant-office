import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Claude Code 移管版: 画像は client/public/assets/ に同梱。
const IMAGES = {
  heroBg: "/assets/hero-bg.jpg",
  portrait: "/assets/takita-portrait.webp",
  serviceInheritance: "/assets/service-inheritance.jpg",
  serviceDoctor: "/assets/service-doctor.jpg",
  serviceTax: "/assets/service-tax.jpg",
};

// ===== Scroll animation hook =====
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ===== SVG Icons =====
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

// ===== Section: Hero =====
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ minHeight: "100svh", display: "flex", alignItems: "flex-start" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${IMAGES.heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(160deg, rgba(2,6,23,.92) 0%, rgba(2,6,23,.85) 40%, rgba(15,23,42,.65) 70%, rgba(15,23,42,.35) 100%)",
        }}
      />
      {/* Content */}
      <div className="container relative z-[2] w-full pt-8 pb-10 md:py-16 flex flex-col">
        {/* Portrait — mobile only, shown after buttons */}
        <div className="flex justify-center md:hidden order-last mt-6">
          <div
            className="rounded-2xl p-4 w-full max-w-xs"
            style={{
              background: "rgba(255,255,255,.10)",
              border: "1px solid rgba(255,255,255,.16)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "3/4", background: "#1e293b" }}>
              <img src={IMAGES.portrait} alt="瀧田潤 税理士" className="w-full h-full object-cover object-top" />
            </div>
            <div className="mt-3 text-slate-50">
              <div className="text-xl font-black">瀧田 潤</div>
              <div className="text-xs text-slate-400 mt-0.5">税理士（登録番号: 105091）</div>
              <div
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sky-300 text-xs font-bold"
                style={{ background: "rgba(14,165,233,.18)", border: "1px solid rgba(14,165,233,.3)" }}
              >
                <CheckIcon /> 東京税理士会 会員
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: 2-column layout */}
        <div className="flex flex-col md:grid md:gap-12 md:items-center" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
          {/* Copy */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-sm text-slate-200"
              style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.20)" }}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
              渋谷区恵比寿の税務・会計パートナー
            </div>
            {/* Title */}
            <h1
              className="font-black leading-tight"
              style={{ fontSize: "clamp(26px, 5vw, 52px)", letterSpacing: ".01em" }}
            >
              <span className="text-sky-400">日本一相談しやすい</span><br />
              税理士をモットーに<br />
              経営と資産の課題を、<br />
              解決していく。
            </h1>
            <p className="mt-5 text-slate-300 leading-relaxed text-sm md:text-base" style={{ maxWidth: "520px" }}>
              相続・事業承継、法人税務顧問、個人確定申告、医業支援など幅広く対応。<br />
              複雑な税務課題にも丁寧に向き合い、わかりやすくご案内いたします。
            </p>

          </div>

          {/* Portrait — desktop only */}
          <div className="hidden md:block justify-self-end" style={{ maxWidth: "380px", width: "100%" }}>
            <div
              className="rounded-3xl p-5"
              style={{
                background: "rgba(255,255,255,.10)",
                border: "1px solid rgba(255,255,255,.16)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 20px 60px rgba(2,6,23,.20)",
              }}
            >
              <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4", background: "#1e293b" }}>
                <img src={IMAGES.portrait} alt="瀧田潤 税理士" className="w-full h-full object-cover object-top" />
              </div>
              <div className="mt-4 text-slate-50">
                <div className="text-2xl font-black">瀧田 潤</div>
                <div className="text-sm text-slate-400 mt-1">税理士（登録番号: 105091）</div>
                <div
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-sky-300 text-xs font-bold"
                  style={{ background: "rgba(14,165,233,.18)", border: "1px solid rgba(14,165,233,.3)" }}
                >
                  <CheckIcon /> 東京税理士会 会員
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Section: Info Strip =====
function InfoStrip() {
  return (
    <section style={{ background: "oklch(0.98 0.003 255)", borderBottom: "1px solid oklch(0.91 0.005 255)" }}>
      <div className="container">
        <div className="flex flex-col md:grid md:grid-cols-3" style={{ gap: "1px", background: "oklch(0.91 0.005 255)" }}>
          {[
            { label: "主要対応領域", value: "相続・事業承継 / 法人税務顧問 / 個人確定申告 / 医業支援" },
            { label: "所在地", value: "東京都渋谷区恵比寿4-8-3\nURABANKARAビル301" },
            { label: "ご連絡先", value: null },
          ].map((item, i) => (
            <div key={i} className="bg-white px-6 py-6 md:px-8 md:py-7">
              <div className="text-xs font-bold tracking-widest uppercase mb-2.5" style={{ color: "oklch(0.50 0.18 230)" }}>
                {item.label}
              </div>
              {item.value ? (
                <div className="font-bold text-sm leading-relaxed whitespace-pre-line">{item.value}</div>
              ) : (
                <div className="font-bold text-sm leading-relaxed">
                  TEL <a href="tel:0364563995" className="underline" style={{ color: "oklch(0.50 0.18 230)" }}>03-6456-3995</a>
                  <br />
                  <span className="text-xs text-slate-400 font-normal">E-mail</span><br />
                  <a href="mailto:takita@trust-ac.co.jp" className="underline" style={{ color: "oklch(0.50 0.18 230)" }}>takita@trust-ac.co.jp</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Services =====
function ServicesSection() {
  const ref = useFadeUp();
  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "相続・事業承継",
      desc: "相続税や資産承継、事業承継に関する論点を整理し、将来を見据えた税務対応を支援します。年間100件以上の相談実績を持ち、複雑なケースにも対応可能です。",
      img: IMAGES.serviceInheritance,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "法人税務顧問",
      desc: "日常の税務相談から会計体制の整備まで、継続的な業務効率化を支援します。経営判断に役立つ財務情報の提供も行い、法人の健全な成長をサポートします。",
      img: "/assets/service-corporate.jpg",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="#0f172a" strokeWidth="1.8"/>
          <path d="M8 9h8M8 13h8M8 17h4" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      title: "個人確定申告",
      desc: "個人事業主や不動産所得、医師の申告など、状況に応じた適切な確定申告対応を行います。漏れのない節税対策も合わせてご提案します。",
      img: IMAGES.serviceTax,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v16M5 12h14" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="8" stroke="#0f172a" strokeWidth="1.8"/>
        </svg>
      ),
      title: "医業支援",
      desc: "クリニック開業時の事業計画、会計体制、税務設計など、医療分野特有の課題を踏まえて支援します。開業前から開業後まで一貫してサポートします。",
      img: IMAGES.serviceDoctor,
    },
  ];

  return (
    <section className="py-16 md:py-24" id="services">
      <div className="container">
        <div ref={ref} className="fade-up mb-10 md:mb-12">
          <div className="text-xs font-bold tracking-widest uppercase mb-2.5" style={{ color: "oklch(0.50 0.18 230)" }}>SERVICES</div>
          <h2 className="text-3xl md:text-4xl font-black">業務内容</h2>
          <p className="mt-3 text-slate-500 leading-relaxed text-sm md:text-base">
            相続・事業承継から法人税務顧問、個人確定申告、医業支援まで、幅広い税務サービスを提供しています。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((s, i) => {
            const cardRef = useFadeUp();
            return (
              <div
                key={i}
                ref={cardRef}
                className="fade-up bg-white rounded-2xl p-6 md:p-8 flex gap-5 items-start transition-all hover:-translate-y-1"
                style={{ border: "1px solid oklch(0.91 0.005 255)", boxShadow: "0 4px 24px rgba(15,23,42,.07)" }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl grid place-items-center"
                  style={{ background: "linear-gradient(135deg,#e0f2fe,#f0f9ff)", border: "1px solid #bae6fd" }}
                >
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  {s.img && (
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full mt-4 rounded-xl object-cover"
                      style={{ height: "180px" }}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Strengths =====
function StrengthsSection() {
  const ref = useFadeUp();
  const strengths = [
    { no: "01", title: "豊富な相談実績", desc: "年間100件以上の相続相談に対応。複雑なケースにも経験豊富な視点で最適な解決策をご提案します。" },
    { no: "02", title: "わかりやすい説明", desc: "「日本一相談しやすい税理士」をモットーに、専門用語を使わずお客様の立場に立ったわかりやすい説明を心がけています。" },
    { no: "03", title: "幅広い専門分野への対応力", desc: "相続・事業承継、法人税務顧問、個人確定申告、医業支援など、各分野に特化した深い知識と実務経験で、お客様の多様なニーズに対応します。" },
  ];
  return (
    <section className="py-16 md:py-24" style={{ background: "oklch(0.13 0.02 255)", color: "#fff" }}>
      <div className="container">
        <div ref={ref} className="fade-up mb-10 md:mb-12">
          <div className="text-xs font-bold tracking-widest uppercase mb-2.5 text-sky-400">WHY CHOOSE US</div>
          <h2 className="text-3xl md:text-4xl font-black text-white">選ばれる3つの理由</h2>
          <p className="mt-3 text-slate-400 leading-relaxed text-sm md:text-base">瀧田潤税理士事務所が多くのお客様に選ばれる理由をご紹介します。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {strengths.map((s, i) => {
            const cardRef = useFadeUp();
            return (
              <div
                key={i}
                ref={cardRef}
                className="fade-up rounded-2xl p-6 md:p-7"
                style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.10)" }}
              >
                <div className="text-xs font-bold tracking-widest text-sky-400 mb-3">{s.no}</div>
                <h3 className="text-base md:text-lg font-bold text-slate-50 mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Career =====
function CareerSection() {
  const ref = useFadeUp();
  return (
    <section className="py-16 md:py-24" id="career" style={{ background: "oklch(0.98 0.003 255)" }}>
      <div className="container">
        <div ref={ref} className="fade-up mb-8 md:mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-2.5" style={{ color: "oklch(0.50 0.18 230)" }}>CAREER</div>
          <h2 className="text-3xl md:text-4xl font-black">経歴</h2>
        </div>
        <div
          className="fade-up bg-white rounded-2xl p-6 md:p-10"
          style={{ border: "1px solid oklch(0.91 0.005 255)", boxShadow: "0 4px 24px rgba(15,23,42,.07)" }}
          ref={useFadeUp()}
        >
          {/* Mobile: portrait first, then text */}
          <div className="flex flex-col-reverse md:grid md:gap-10 md:items-center" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              {[
                "大学卒業後、2005年に税理士試験に合格。",
                "都内の会計事務所および税理士法人にて勤務。",
                "相続・事業承継分野の責任者として多くの案件に携わり、実務経験を重ねる。",
                "2017年に独立開業。",
                "現在は、相続・事業承継、法人税務顧問、個人確定申告、医業支援を中心に、幅広い税務サービスを提供している。特に相続に関する相談実績は豊富で、年間を通じて100件以上の相談に対応している。",
              ].map((text, i) => (
                <p key={i} className="text-slate-500 leading-relaxed mb-3 last:mb-0 text-sm md:text-base">{text}</p>
              ))}
              {/* Stats */}
              <div
                className="mt-6 rounded-2xl p-5 md:p-6 grid grid-cols-2 gap-4 md:gap-5"
                style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe)", border: "1px solid #bae6fd" }}
              >
                <div>
                  <div className="font-black leading-none" style={{ fontSize: "clamp(32px,6vw,42px)", color: "oklch(0.50 0.18 230)" }}>
                    100<span className="text-xl md:text-2xl">件+</span>
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 mt-1">年間相続相談件数</div>
                </div>
                <div>
                  <div className="font-black leading-none" style={{ fontSize: "clamp(32px,6vw,42px)", color: "oklch(0.50 0.18 230)" }}>
                    20<span className="text-xl md:text-2xl">年+</span>
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 mt-1">税務実務経験</div>
                </div>
              </div>
            </div>
            {/* Portrait */}
            <div className="overflow-hidden rounded-2xl mb-6 md:mb-0" style={{ boxShadow: "0 20px 60px rgba(2,6,23,.14)" }}>
              <img
                src={IMAGES.portrait}
                alt="瀧田潤 税理士"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4", objectPosition: "center top" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Section: Profile =====
function ProfileSection() {
  const ref = useFadeUp();
  const tableRef = useFadeUp();
  const rows = [
    { label: "事務所名", value: "瀧田潤税理士事務所" },
    { label: "代表税理士", value: "瀧田 潤" },
    { label: "登録番号", value: "105091" },
    { label: "住所", value: "〒150-0013\n東京都渋谷区恵比寿4-8-3\nURABANKARAビル301" },
    { label: "電話番号", value: null, phone: true },
    { label: "E-mail", value: null, email: true },
    { label: "対応分野", value: "相続・事業承継 / 法人税務顧問 / 個人確定申告 / 医業支援" },
  ];
  return (
    <section className="py-16 md:py-24" id="profile">
      <div className="container">
        <div className="flex flex-col md:grid md:gap-12 md:items-start" style={{ gridTemplateColumns: ".85fr 1.15fr" }}>
          <div ref={ref} className="fade-up mb-8 md:mb-0">
            <div className="text-xs font-bold tracking-widest uppercase mb-2.5" style={{ color: "oklch(0.50 0.18 230)" }}>OFFICE PROFILE</div>
            <h2 className="text-3xl md:text-4xl font-black">事務所概要</h2>
            <p className="mt-3 text-slate-500 leading-relaxed text-sm md:text-base">渋谷区恵比寿にて、地域の皆様の税務・会計をサポートしています。</p>
          </div>
          <div
            ref={tableRef}
            className="fade-up overflow-hidden rounded-2xl"
            style={{ border: "1px solid oklch(0.91 0.005 255)", boxShadow: "0 4px 24px rgba(15,23,42,.07)" }}
          >
            {rows.map((row, i) => (
              <div
                key={i}
                className="flex flex-col sm:grid px-5 md:px-7 py-4 md:py-5 gap-1 sm:gap-5"
                style={{
                  gridTemplateColumns: "140px 1fr",
                  borderTop: i === 0 ? "none" : "1px solid oklch(0.91 0.005 255)",
                }}
              >
                <div className="text-xs md:text-sm font-bold text-slate-400">{row.label}</div>
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {row.phone ? (
                    <a href="tel:0364563995" className="underline" style={{ color: "oklch(0.50 0.18 230)" }}>03-6456-3995</a>
                  ) : row.email ? (
                    <a href="mailto:takita@trust-ac.co.jp" className="underline" style={{ color: "oklch(0.50 0.18 230)" }}>takita@trust-ac.co.jp</a>
                  ) : row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Section: Flow =====
function FlowSection() {
  const ref = useFadeUp();
  const steps = [
    { n: 1, title: "お問い合わせ", desc: "お電話またはメールにてご相談内容の概要をご連絡ください。" },
    { n: 2, title: "初回ヒアリング（無料）", desc: "現状の課題やご希望を確認し、必要なサポート範囲を整理します。" },
    { n: 3, title: "ご提案・お見積り", desc: "業務内容と費用感を明確にご案内します。" },
    { n: 4, title: "支援開始", desc: "契約後、税務・会計支援を順次開始します。" },
  ];
  return (
    <section className="py-16 md:py-24" style={{ background: "oklch(0.98 0.003 255)" }}>
      <div className="container">
        <div ref={ref} className="fade-up mb-10 md:mb-12">
          <div className="text-xs font-bold tracking-widest uppercase mb-2.5" style={{ color: "oklch(0.50 0.18 230)" }}>FLOW</div>
          <h2 className="text-3xl md:text-4xl font-black">ご相談の流れ</h2>
          <p className="mt-3 text-slate-500 leading-relaxed text-sm md:text-base">初めてのご相談も安心してお問い合わせください。</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {steps.map((s, i) => {
            const cardRef = useFadeUp();
            return (
              <div
                key={i}
                ref={cardRef}
                className="fade-up bg-white rounded-2xl p-5 md:p-7 text-center"
                style={{ border: "1px solid oklch(0.91 0.005 255)", boxShadow: "0 4px 24px rgba(15,23,42,.07)" }}
              >
                <div
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-white font-black text-sm md:text-base"
                  style={{ background: "oklch(0.55 0.18 230)", boxShadow: "0 4px 16px rgba(14,165,233,.3)" }}
                >
                  {s.n}
                </div>
                <h3 className="text-sm md:text-base font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Contact =====
function ContactSection() {
  const ref = useFadeUp();
  return (
    <section className="py-16 md:py-24" id="contact" style={{ background: "oklch(0.13 0.02 255)", color: "#fff" }}>
      <div className="container">
        <div ref={ref} className="fade-up mb-10 md:mb-12">
          <div className="text-xs font-bold tracking-widest uppercase mb-2.5 text-sky-400">CONTACT</div>
          <h2 className="text-3xl md:text-4xl font-black text-white">お問い合わせ</h2>
          <p className="mt-3 text-slate-400 leading-relaxed text-sm md:text-base">相続・事業承継、法人税務顧問、個人確定申告、医業支援など、お気軽にご相談ください。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Info */}
          <div
            className="fade-up rounded-2xl md:rounded-3xl p-7 md:p-9"
            style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}
            ref={useFadeUp()}
          >
            <div className="text-xs font-bold tracking-widest uppercase text-sky-400 mb-2">TEL</div>
            <div className="font-black leading-tight" style={{ fontSize: "clamp(28px,6vw,40px)" }}>
              <a href="tel:0364563995" className="text-white hover:text-sky-300 transition-colors">03-6456-3995</a>
            </div>
            <div className="mt-5">
              <div className="text-xs font-bold tracking-widest uppercase text-sky-400 mb-1.5">E-MAIL</div>
              <a href="mailto:takita@trust-ac.co.jp" className="text-sky-300 underline text-sm md:text-base break-all">takita@trust-ac.co.jp</a>
            </div>
            <div className="mt-5 text-slate-400 text-sm leading-relaxed">
              〒150-0013<br />東京都渋谷区恵比寿4-8-3<br />URABANKARAビル301
            </div>
          </div>
          {/* Hours */}
          <div
            className="fade-up rounded-2xl md:rounded-3xl p-7 md:p-9"
            style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}
            ref={useFadeUp()}
          >
            <h3 className="text-base md:text-lg font-bold text-slate-50 mb-5">営業時間・アクセス</h3>
            {[
              { label: "平日", val: "9:00 〜 18:00" },
              { label: "土曜", val: "要予約" },
              { label: "日曜・祝日", val: "休業" },
              { label: "最寄り駅", val: "JR恵比寿駅 徒歩約7分" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex justify-between py-3 text-sm text-slate-300"
                style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
              >
                <span className="text-slate-400">{r.label}</span>
                <span>{r.val}</span>
              </div>
            ))}
            <div className="mt-6">
              <a
                href="https://maps.google.com/?q=東京都渋谷区恵比寿4-8-3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky-400 text-sm font-bold underline"
              >
                <MapPinIcon /> Google マップで見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Privacy Modal =====
function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl md:rounded-3xl p-6 md:p-10">
        <DialogHeader className="mb-6 pb-6 border-b">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "oklch(0.50 0.18 230)" }}>PRIVACY POLICY</div>
          <DialogTitle className="text-2xl md:text-3xl font-black">プライバシーポリシー</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          {[
            { title: "１．個人情報の管理", body: "弊事務所は、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・職員教育の徹底等の必要な措置を講じ、安全対策を実施し、個人情報の厳重な管理を行ないます。" },
            { title: "２．個人情報の利用目的", body: "お客様からお預かりした個人情報は、弊事務所からのご連絡やご質問に対する回答のご送付のために利用いたします。" },
            { title: "３．個人情報の第三者への開示・提供の禁止", body: "弊事務所は、お客様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。\n・お客様の同意がある場合\n・お客様が希望されるサービスを行なうために弊事務所が業務を委託する業者に対して開示する場合\n・法令に基づき開示することが必要である場合" },
            { title: "４．個人情報の安全対策", body: "弊事務所は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。" },
            { title: "５．個人情報の訂正等について", body: "お客様がご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。" },
            { title: "６．法令、規範の遵守と見直し", body: "弊事務所は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。" },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="whitespace-pre-line">{item.body}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ===== Section: Privacy =====
function PrivacySection({ onOpen }: { onOpen: () => void }) {
  const ref = useFadeUp();
  return (
    <section className="py-16 md:py-24" style={{ background: "oklch(0.98 0.003 255)", borderTop: "1px solid oklch(0.91 0.005 255)" }}>
      <div className="container">
        <div
          ref={ref}
          className="fade-up bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 text-center"
          style={{ border: "1px solid oklch(0.91 0.005 255)", boxShadow: "0 4px 24px rgba(15,23,42,.07)" }}
        >
          <div className="text-xs font-bold tracking-widest uppercase mb-2.5 text-slate-400">PRIVACY POLICY</div>
          <h2 className="text-2xl md:text-3xl font-black mt-2">プライバシーポリシー</h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base">個人情報の取り扱いについては、下記よりご確認ください。</p>
          <button
            onClick={onOpen}
            className="mt-5 font-bold underline transition-colors text-sm md:text-base"
            style={{ color: "oklch(0.50 0.18 230)" }}
          >
            プライバシーポリシーを見る →
          </button>
        </div>
      </div>
    </section>
  );
}

// ===== Header =====
function Header({ onPrivacyOpen }: { onPrivacyOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/95"
        style={{
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.91 0.005 255)",
          boxShadow: scrolled ? "0 4px 24px rgba(15,23,42,.08)" : "none",
          transition: "box-shadow .3s",
        }}
      >
        <div className="container flex items-center justify-between" style={{ minHeight: "64px" }}>
          <a href="#" className="flex flex-col gap-0.5">
            <div className="text-[10px] md:text-xs tracking-widest text-slate-400 font-medium leading-tight">TAKITA JUN TAX ACCOUNTANT OFFICE</div>
            <div className="text-base md:text-xl font-black" style={{ color: "oklch(0.13 0.02 255)" }}>瀧田潤税理士事務所</div>
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {[["#services", "業務内容"], ["#career", "経歴"], ["#profile", "事務所概要"]].map(([href, label]) => (
              <a key={href} href={href} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{label}</a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "oklch(0.13 0.02 255)" }}
            >
              お問い合わせ
            </a>
          </nav>
          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMobileOpen(true)}
            aria-label="メニューを開く"
          >
            <span className="block w-6 h-0.5 bg-slate-800 rounded" />
            <span className="block w-6 h-0.5 bg-slate-800 rounded" />
            <span className="block w-6 h-0.5 bg-slate-800 rounded" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(2,6,23,.97)" }}
        >
          <button
            className="absolute top-5 right-5 text-white font-bold px-4 py-2 rounded-xl text-sm"
            style={{ background: "rgba(255,255,255,.1)" }}
            onClick={() => setMobileOpen(false)}
          >
            閉じる ✕
          </button>
          {[["#services", "業務内容"], ["#career", "経歴"], ["#profile", "事務所概要"], ["#contact", "お問い合わせ"]].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-white text-2xl font-bold"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="mt-4 text-center">
            <a href="tel:0364563995" className="text-sky-400 font-bold text-lg">03-6456-3995</a>
          </div>
        </div>
      )}
    </>
  );
}

// ===== Footer =====
function Footer({ onPrivacyOpen }: { onPrivacyOpen: () => void }) {
  return (
    <footer style={{ background: "oklch(0.13 0.02 255)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div className="container py-8 md:py-10">
        <div className="flex flex-col md:grid md:items-center gap-4 md:gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
          <div>
            <div className="text-base md:text-lg font-black text-white mb-2">瀧田潤税理士事務所</div>
            <div className="text-xs md:text-sm text-slate-400 leading-relaxed">
              〒150-0013 東京都渋谷区恵比寿4-8-3 URABANKARAビル301<br />
              TEL <a href="tel:0364563995" className="text-sky-400 underline">03-6456-3995</a>
              {" "}/{" "}
              E-mail <a href="mailto:takita@trust-ac.co.jp" className="text-sky-400 underline break-all">takita@trust-ac.co.jp</a>
            </div>
          </div>
          <div className="md:text-right">
            <button onClick={onPrivacyOpen} className="text-sky-400 underline text-sm font-medium">プライバシーポリシー</button>
            <div className="text-slate-500 text-xs mt-1.5">© 2026 瀧田潤税理士事務所</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== Main Page =====
export default function Home() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onPrivacyOpen={() => setPrivacyOpen(true)} />
      <HeroSection />
      <InfoStrip />
      <ServicesSection />
      <StrengthsSection />
      <CareerSection />
      <ProfileSection />
      <FlowSection />
      <ContactSection />
      <PrivacySection onOpen={() => setPrivacyOpen(true)} />
      <Footer onPrivacyOpen={() => setPrivacyOpen(true)} />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  );
}
