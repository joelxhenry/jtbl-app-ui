interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center"
      onAnimationEnd={onComplete}
    >
      {/* Logo / Brand */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">
          Pathway
        </h1>
        <p className="text-primary-foreground/70 text-center text-sm mt-2">
          Jamaica Trade Board
        </p>
      </div>

      {/* Loading indicator */}
      <div className="mt-12">
        <div className="w-8 h-8 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-primary-foreground/50">
          Developed by Jamaica Trade Board Limited
        </p>
      </div>
    </div>
  );
}
