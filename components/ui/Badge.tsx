export default function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full ${className}`}>
      {children}
    </span>
  );
}