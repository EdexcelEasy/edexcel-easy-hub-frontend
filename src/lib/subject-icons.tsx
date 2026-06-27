import {
  Atom,
  BookOpen,
  Calculator,
  Code,
  Dna,
  FlaskConical,
  GraduationCap,
  Heart,
  Landmark,
  Monitor,
  PenTool,
  Pi,
} from "lucide-react";

export function SubjectIcon({ name, className }: { name: string; className?: string }) {
  const normalized = name.toLowerCase();

  if (normalized.includes("chem")) return <FlaskConical className={className} />;
  if (normalized.includes("phys")) return <Atom className={className} />;
  if (normalized.includes("bio") && normalized.includes("human")) return <Heart className={className} />;
  if (normalized.includes("bio")) return <Dna className={className} />;
  if (normalized.includes("math") || normalized.includes("calculator")) return <Calculator className={className} />;
  if (normalized.includes("pure")) return <Pi className={className} />;
  if (normalized.includes("ict") || normalized.includes("information technology")) return <Monitor className={className} />;
  if (normalized.includes("computer") || normalized.includes("coding") || normalized.includes("program")) {
    return <Code className={className} />;
  }
  if (normalized.includes("english") || normalized.includes("language")) return <PenTool className={className} />;
  if (normalized.includes("account") || normalized.includes("business") || normalized.includes("econ")) {
    return <Landmark className={className} />;
  }
  if (normalized.includes("university")) return <GraduationCap className={className} />;

  return <BookOpen className={className} />;
}
