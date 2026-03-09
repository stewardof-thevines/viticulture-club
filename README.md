# 🍷 VitiCulture: The Web3 Native Wine Club

VitiCulture is a "Phygital" (Physical + Digital) wine club prototype. It leverages **Privy** for seamless "Email-to-Wallet" onboarding and **Vercel** for high-performance cloud hosting.

## 🍇 Project Vision
To bridge the gap between luxury agriculture and blockchain provenance. Every bottle in the club is tracked as a "Digital Twin" on-chain, ensuring authenticity and allowing members to trade allocations instantly.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Identity/Auth:** [Privy](https://privy.io) (Embedded MPC Wallets)
- **Deployment:** Vercel
- **Chains:** Base (Ethereum L2) for Provenance & Solana for High-Speed Trading
- **Styling:** Tailwind CSS (Luxury Minimalist Theme)

## 🏗 Project Structure
- `/app`: The "Tasting Room" (Frontend UI and Routes)
- `/components`: Reusable UI elements (Wine cards, Cellar stats)
- `/lib`: The "Sommelier Logic" (Web3 helper functions)
- `/providers`: The "Cellar Foundation" (Privy & Blockchain configuration)

## 🚀 Getting Started
1. **Clone & Open:** Open this repo in GitHub Codespaces.
2. **Environment:** Create a `.env.local` file and add:
   `NEXT_PUBLIC_PRIVY_APP_ID=your_app_id_here`
3. **Install:** Run `npm install` in the terminal.
4. **Develop:** Run `npm run dev` to launch the dashboard.

## 📜 Roadmap
- [ ] Phase 1: Member Cellar Dashboard (In Progress)
- [ ] Phase 2: "Digital Cork" Minting Logic
- [ ] Phase 3: Cross-chain Bridge (Base <-> Solana)
