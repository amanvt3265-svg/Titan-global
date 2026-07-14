import {
  Container,
  Anchor,
  Ship,
  Truck,
  ArrowLeftRight,
  Boxes,
  Weight,
  Building2,
  Timer,
  Radar,
  ShieldCheck,
  MapPinned,
  Factory,
  Network,
  HardHat,
  ShoppingBag,
  Wheat,
  Tractor,
  Warehouse,
  Award,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

// Maps string identifiers (from config) to Lucide icon components.
const icons: Record<string, LucideIcon> = {
  // service icons (kebab keys from Service.icon)
  container: Container,
  anchor: Anchor,
  ship: Ship,
  truck: Truck,
  "arrow-left-right": ArrowLeftRight,
  boxes: Boxes,
  weight: Weight,
  "building-2": Building2,
  // PascalCase keys used in content lists
  Container,
  Anchor,
  Ship,
  Truck,
  Boxes,
  Weight,
  Building2,
  Timer,
  Radar,
  ShieldCheck,
  MapPinned,
  Factory,
  Network,
  HardHat,
  ShoppingBag,
  Wheat,
  Tractor,
  Warehouse,
  Award,
  UserCheck,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = icons[name] ?? Container;
  return <Cmp className={className} aria-hidden="true" />;
}
