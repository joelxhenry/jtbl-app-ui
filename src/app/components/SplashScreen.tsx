import GovBranding from "./GovBranding";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({}: SplashScreenProps) {
  return (
    <div className="absolute inset-0 z-[100] bg-primary flex flex-col items-center justify-center px-6">
      {/* Government Logos - Top */}
      <div className="absolute top-12 animate-fade-in">
        <GovBranding variant="light" size="md" />
      </div>

      {/* Logo / Brand */}
      <div className="animate-fade-in text-center">
        <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">
          Pathway
        </h1>
        <p className="text-primary-foreground/70 text-center text-sm mt-2">
          The Jamaica Trade Board
        </p>
      </div>

      {/* Loading indicator */}
      <div className="mt-12">
        <div className="w-8 h-8 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-primary-foreground/50 mb-2">
          An official application of the Government of Jamaica
        </p>
        <p className="text-[10px] text-primary-foreground/40">
          Ministry of Industry, Investment and Commerce
        </p>
      </div>
    </div>
  );
}
