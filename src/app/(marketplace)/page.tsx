import dynamic from "next/dynamic";
const MarketplaceHomeClient = dynamic(() => import("@/components/marketplace/MarketplaceHomeClient"), { ssr: false });

export default function MarketplaceHome() {
  return <MarketplaceHomeClient />;
}
