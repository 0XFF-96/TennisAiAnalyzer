import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import UploadSection from "@/components/upload-section";
import FeatureSection from "@/components/feature-section";

export default function Home() {
  // Update document title
  useEffect(() => {
    document.title = "TennisAI - Advanced Tennis Action Analysis";
  }, []);

  return (
    <div>
      <HeroSection />
      <UploadSection />
      <FeatureSection />
    </div>
  );
}
