interface StatItem { value: string; label: string; suffix?: string; }
interface StatsBarProps { stats: StatItem[]; dark?: boolean; }

export default function StatsBar({ stats, dark = false }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="font-display font-bold text-3xl md:text-4xl mb-1" style={{ color: dark ? "white" : "#0A4D2E" }}>
            {stat.value}
            {stat.suffix && <span style={{ color: dark ? "#86efac" : "#16a34a" }}>{stat.suffix}</span>}
          </div>
          <div className="text-sm" style={{ color: dark ? "rgba(167,243,208,0.7)" : "#6b7280" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
