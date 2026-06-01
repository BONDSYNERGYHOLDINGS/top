export default function SectionTitle({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}