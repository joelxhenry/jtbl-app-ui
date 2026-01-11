interface GovBrandingProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

export default function GovBranding({
  variant = "dark",
  size = "md",
  showLabels = false,
}: GovBrandingProps) {
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const mutedColor = variant === "light" ? "text-white/60" : "text-muted-foreground";
  const borderColor = variant === "light" ? "border-white/20" : "border-border";

  const logoSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Government of Jamaica */}
      <div className="flex flex-col items-center">
        <div
          className={`${logoSizes[size]} rounded-full bg-white/10 border ${borderColor} flex items-center justify-center`}
        >
          <span className={`${textSizes[size]} font-bold ${textColor}`}>GOJ</span>
        </div>
        {showLabels && (
          <span className={`${textSizes[size]} ${mutedColor} mt-1 text-center`}>
            Govt. of Jamaica
          </span>
        )}
      </div>

      {/* Ministry of Industry, Investment and Commerce */}
      <div className="flex flex-col items-center">
        <div
          className={`${logoSizes[size]} rounded-full bg-white/10 border ${borderColor} flex items-center justify-center`}
        >
          <span className={`${textSizes[size]} font-bold ${textColor}`}>MIIC</span>
        </div>
        {showLabels && (
          <span className={`${textSizes[size]} ${mutedColor} mt-1 text-center max-w-16 leading-tight`}>
            Min. of Industry
          </span>
        )}
      </div>

      {/* Jamaica Trade Board Limited */}
      <div className="flex flex-col items-center">
        <div
          className={`${logoSizes[size]} rounded-full bg-white/10 border ${borderColor} flex items-center justify-center`}
        >
          <span className={`${textSizes[size]} font-bold ${textColor}`}>JTBL</span>
        </div>
        {showLabels && (
          <span className={`${textSizes[size]} ${mutedColor} mt-1 text-center`}>
            Trade Board
          </span>
        )}
      </div>
    </div>
  );
}
