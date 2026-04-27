import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

export function Section({ className, children }: SectionProps) {
  return (
    <section className={cn("py-20 md:py-32", className)}>
      {children}
    </section>
  );
}
