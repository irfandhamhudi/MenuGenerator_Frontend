import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ElegantTemplate from "./ElegantTemplate";
import NeobrutalismTemplate from "./NeobrutalismTemplate";
import NatureTemplate from "./NatureTemplate";
import FarmTemplate from "./FarmTemplate";
import RimberioTemplate from "./RimberioTemplate";

export const templates = {
  modern: { name: "Modern", component: ModernTemplate },
  classic: { name: "Classic", component: ClassicTemplate },
  elegant: { name: "Elegant", component: ElegantTemplate },
  neobrutalism: { name: "Neobrutalism", component: NeobrutalismTemplate },
  nature: { name: "Nature", component: NatureTemplate },
  farm: { name: "Farm", component: FarmTemplate },
  rimberio: { name: "Rimberio", component: RimberioTemplate },
} as const;
