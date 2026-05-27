interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ badge, title, titleAccent, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} mb-12`}>
      {badge && (
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
          style={{
            background: light ? "rgba(255,255,255,0.12)" : "#f0fdf4",
            color: light ? "white" : "#0A4D2E",
            border: `1px solid ${light ? "rgba(255,255,255,0.2)" : "#bbf7d0"}`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: light ? "#86efac" : "#16a34a" }} />
          {badge}
        </div>
      )}
      <h2
        className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
        style={{ color: light ? "white" : "#0A4D2E" }}
      >
        {title}{" "}
        {titleAccent && (
          <span
            style={
              light
                ? { background: "linear-gradient(135deg, #C9963A, #E0AE52, #C9963A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                : { background: "linear-gradient(135deg, #0A4D2E, #16a34a, #4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
            }
          >
            {titleAccent}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed" style={{ color: light ? "rgba(167,243,208,0.8)" : "#6b7280" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
