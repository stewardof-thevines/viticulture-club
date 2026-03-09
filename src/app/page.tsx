// src/app/page.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";

// --- SVG Decorative Elements ---
const VineDecor = () => (
  <svg viewBox="0 0 200 40" className="w-full opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20 Q50 5 100 20 Q150 35 200 20" stroke="#7D2027" strokeWidth="1.5" fill="none"/>
    <circle cx="50" cy="12" r="3" fill="#7D2027"/>
    <circle cx="150" cy="28" r="3" fill="#7D2027"/>
    <circle cx="100" cy="20" r="2" fill="#274133"/>
  </svg>
);

const WaxSeal = ({ char }: { char: string }) => (
  <div className="relative flex items-center justify-center w-16 h-16">
    <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full" fill="none">
      <polygon points="32,2 38,20 56,20 42,32 48,50 32,38 16,50 22,32 8,20 26,20" fill="#7D2027" opacity="0.9"/>
    </svg>
    <span className="relative z-10 text-[#EDDDC5] font-serif text-lg font-bold">{char}</span>
  </div>
);

// --- LANDING PAGE ---
const LandingPage = ({ login }: { login: () => void }) => (
  <div
    className="min-h-screen flex flex-col"
    style={{
      background: "#EDDDC5",
      fontFamily: "Georgia, 'Times New Roman', serif",
    }}
  >
    {/* Noise texture overlay */}
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />

    {/* Header */}
    <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: "rgba(125,32,39,0.2)" }}>
      <div className="flex items-center gap-3">
        <WaxSeal char="V" />
        <div>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#274133", fontFamily: "sans-serif" }}>Estate</p>
          <p className="text-xl font-bold italic" style={{ color: "#7D2027" }}>Viticulture</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase" style={{ fontFamily: "sans-serif", color: "#274133" }}>
        <span className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity">Provenance</span>
        <span className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity">Collection</span>
        <span className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity">Cellar</span>
      </div>
      <button
        onClick={login}
        className="text-sm tracking-widest uppercase px-5 py-2 border transition-all duration-300 hover:shadow-md"
        style={{
          fontFamily: "sans-serif",
          borderColor: "#7D2027",
          color: "#7D2027",
          background: "transparent",
        }}
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.background = "#7D2027";
          (e.target as HTMLButtonElement).style.color = "#EDDDC5";
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.background = "transparent";
          (e.target as HTMLButtonElement).style.color = "#7D2027";
        }}
      >
        Member Login
      </button>
    </header>

    {/* Hero */}
    <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
      <p className="text-xs tracking-[0.5em] uppercase mb-6" style={{ color: "#274133", fontFamily: "sans-serif" }}>
        — Est. 2024 · On-Chain Provenance —
      </p>

      <div className="mb-4 w-48">
        <VineDecor />
      </div>

      <h1 className="text-6xl md:text-8xl font-bold italic leading-none mb-4" style={{ color: "#7D2027" }}>
        The Cellar
      </h1>
      <h2 className="text-2xl md:text-4xl font-light tracking-widest mb-8" style={{ color: "#274133" }}>
        Digital Wine Vault
      </h2>

      <div className="mb-12 w-48">
        <VineDecor />
      </div>

      <p className="max-w-lg text-base leading-relaxed mb-12 opacity-70" style={{ color: "#274133", fontFamily: "sans-serif" }}>
        Each bottle is a living asset. Provenance recorded on-chain. Ownership transferred by signature.
        Your collection, authenticated for eternity.
      </p>

      <button
        onClick={login}
        className="group relative px-12 py-4 text-base tracking-widest uppercase transition-all duration-500"
        style={{
          fontFamily: "sans-serif",
          background: "#7D2027",
          color: "#EDDDC5",
          letterSpacing: "0.25em",
        }}
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.background = "#274133";
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.background = "#7D2027";
        }}
      >
        Enter the Cellar
        <span className="ml-3 opacity-60">→</span>
      </button>

      <p className="mt-6 text-xs opacity-40" style={{ fontFamily: "sans-serif", color: "#274133" }}>
        No wallet required · Email onboarding via Privy
      </p>
    </main>

    {/* Footer strip */}
    <footer className="relative z-10 px-8 py-4 flex items-center justify-between text-xs opacity-40" style={{ fontFamily: "sans-serif", color: "#274133", borderTop: "1px solid rgba(125,32,39,0.15)" }}>
      <span>© 2024 Viticulture Estate</span>
      <span className="tracking-widest uppercase">Powered by Base Network</span>
    </footer>
  </div>
);

// --- BENTO CARD ---
interface WineCardProps {
  vintage: string;
  varietal: string;
  region: string;
  tokenId: string;
  status: "Verified" | "Pending" | "Cellar-Locked";
  large?: boolean;
}

const WineCard = ({ vintage, varietal, region, tokenId, status, large = false }: WineCardProps) => {
  const statusColors: Record<WineCardProps["status"], string> = {
    "Verified": "#274133",
    "Pending": "#7D6020",
    "Cellar-Locked": "#7D2027",
  };

  return (
    <div
      className={`relative overflow-hidden border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl cursor-pointer group ${large ? "md:col-span-2 min-h-64" : "min-h-52"}`}
      style={{
        background: "rgba(255,255,255,0.35)",
        borderColor: "rgba(125,32,39,0.2)",
        backdropFilter: "blur(4px)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.55)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(125,32,39,0.5)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.35)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(125,32,39,0.2)";
      }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 opacity-10" style={{ background: "#7D2027", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "sans-serif", color: "#274133", opacity: 0.6 }}>
              {region}
            </p>
            <h3 className="text-2xl font-bold italic" style={{ color: "#7D2027", fontFamily: "Georgia, serif" }}>
              {varietal}
            </h3>
            <p className="text-4xl font-light tracking-widest mt-1" style={{ color: "#274133", fontFamily: "Georgia, serif" }}>
              {vintage}
            </p>
          </div>
          <WaxSeal char={varietal[0]} />
        </div>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs opacity-40 mb-1" style={{ fontFamily: "sans-serif", color: "#274133" }}>Token ID</p>
          <p className="text-xs font-mono tracking-wider" style={{ color: "#274133" }}>{tokenId}</p>
        </div>
        <div
          className="px-3 py-1 text-xs tracking-widest uppercase"
          style={{
            fontFamily: "sans-serif",
            background: statusColors[status],
            color: "#EDDDC5",
            letterSpacing: "0.1em",
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

// --- MEMBER DASHBOARD ---
const MemberDashboard = ({ user, logout }: { user: any; logout: () => void }) => {
  const email = user?.email?.address ?? user?.google?.email ?? "Member";
  const walletAddress = user?.wallet?.address ?? null;
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}···${walletAddress.slice(-4)}`
    : "Generating wallet…";

  const collection = [
    { vintage: "2024", varietal: "Nebbiolo", region: "Barolo · Piedmont", tokenId: "#VIT-0042", status: "Verified" as const, large: true },
    { vintage: "2022", varietal: "Sangiovese", region: "Tuscany · DOCG", tokenId: "#VIT-0019", status: "Cellar-Locked" as const },
    { vintage: "2023", varietal: "Grenache", region: "Priorat · Spain", tokenId: "#VIT-0031", status: "Pending" as const },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#EDDDC5", fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Dashboard Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: "rgba(125,32,39,0.2)" }}>
        <div className="flex items-center gap-3">
          <WaxSeal char="V" />
          <div>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#274133", fontFamily: "sans-serif" }}>Member Vault</p>
            <p className="text-xl font-bold italic" style={{ color: "#7D2027" }}>Viticulture</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-xs opacity-50" style={{ fontFamily: "sans-serif", color: "#274133" }}>Signed in as</p>
            <p className="text-sm font-medium" style={{ fontFamily: "sans-serif", color: "#274133" }}>{email}</p>
          </div>
          <button
            onClick={logout}
            className="text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200"
            style={{ fontFamily: "sans-serif", borderColor: "rgba(125,32,39,0.4)", color: "#7D2027", background: "transparent" }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#7D2027"; (e.target as HTMLButtonElement).style.color = "#EDDDC5"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; (e.target as HTMLButtonElement).style.color = "#7D2027"; }}
          >
            Exit Cellar
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* Identity Banner */}
        <div
          className="mb-10 p-8 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: "rgba(39,65,51,0.06)", borderColor: "rgba(39,65,51,0.2)" }}
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "sans-serif", color: "#274133", opacity: 0.6 }}>
              — Your Digital Twin —
            </p>
            <h2 className="text-3xl font-bold italic mb-1" style={{ color: "#7D2027" }}>Welcome, Cellar Member</h2>
            <p className="text-sm opacity-60" style={{ fontFamily: "sans-serif", color: "#274133" }}>{email}</p>
          </div>

          {/* Wallet display */}
          <div
            className="px-6 py-4 border flex flex-col gap-1 min-w-64"
            style={{ background: "rgba(255,255,255,0.5)", borderColor: "rgba(125,32,39,0.2)" }}
          >
            <p className="text-xs tracking-[0.3em] uppercase opacity-50" style={{ fontFamily: "sans-serif", color: "#274133" }}>
              Embedded Wallet · Base Network
            </p>
            <p className="font-mono text-sm tracking-wider" style={{ color: "#274133" }}>
              {shortAddress}
            </p>
            {walletAddress && (
              <button
                className="text-xs opacity-40 hover:opacity-80 text-left transition-opacity mt-1"
                style={{ fontFamily: "sans-serif", color: "#7D2027" }}
                onClick={() => navigator.clipboard.writeText(walletAddress)}
              >
                Copy full address ↗
              </button>
            )}
          </div>
        </div>

        {/* Section Label */}
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xl font-bold italic" style={{ color: "#274133" }}>2024 Collection</h3>
          <div className="flex-1 h-px" style={{ background: "rgba(125,32,39,0.2)" }} />
          <p className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "sans-serif", color: "#274133" }}>
            3 Bottles · On-Chain
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {collection.map((wine, i) => (
            <WineCard key={i} {...wine} />
          ))}
        </div>

        {/* Bottom Info Bar */}
        <div
          className="p-6 border flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(125,32,39,0.15)", background: "rgba(125,32,39,0.04)" }}
        >
          <div>
            <p className="text-xs tracking-widest uppercase opacity-50 mb-1" style={{ fontFamily: "sans-serif", color: "#274133" }}>
              Vault Status
            </p>
            <p className="text-sm" style={{ fontFamily: "sans-serif", color: "#274133" }}>
              All bottles insured · Provenance verified on Base
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-200"
              style={{ fontFamily: "sans-serif", borderColor: "#274133", color: "#274133", background: "transparent" }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#274133"; (e.target as HTMLButtonElement).style.color = "#EDDDC5"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; (e.target as HTMLButtonElement).style.color = "#274133"; }}
            >
              Add Bottle
            </button>
            <button
              className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
              style={{ fontFamily: "sans-serif", background: "#7D2027", color: "#EDDDC5" }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#5a161b"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#7D2027"; }}
            >
              Transfer Ownership
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- ROOT PAGE ---
export default function Page() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Loading state — Privy is initializing
  if (!ready) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#EDDDC5" }}
      >
        <div className="text-center">
          <WaxSeal char="V" />
          <p className="mt-4 text-xs tracking-[0.4em] uppercase opacity-40" style={{ fontFamily: "sans-serif", color: "#274133" }}>
            Unlocking the Cellar…
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <LandingPage login={login} />;
  }

  return <MemberDashboard user={user} logout={logout} />;
}
