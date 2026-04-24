import type { ReactNode } from "react";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora-study",
});

export default function FontOptimizationStudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`min-h-screen ${lora.className} ${lora.variable}`}>
      {children}
    </div>
  );
}
