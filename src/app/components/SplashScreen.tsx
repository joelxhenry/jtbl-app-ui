import GovBranding from "./GovBranding";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({}: SplashScreenProps) {
  return (
    <div className="absolute inset-0 z-[100] gradient-primary flex flex-col items-center justify-center px-6">
      {/* Government Logos - Top */}
      <div className="absolute top-12 animate-fade-in">
        <GovBranding variant="light" size="md" />
      </div>

      {/* Logo / Brand */}
      <div className="animate-fade-in text-center">
        <img src={`${import.meta.env.BASE_URL}logos/logo.svg`} alt="Pathway" className="h-16 mx-auto brightness-0 invert" />
      </div>

      {/* Loading indicator */}
      <div className="mt-12">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-white/80 mb-2">
          An official application of the Government of Jamaica
        </p>
        <p className="text-[10px] text-white/60">
          Ministry of Industry, Investment and Commerce
        </p>
      </div>
    </div>
  );
}
