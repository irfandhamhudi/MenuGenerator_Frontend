import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";
import DarkTemplate from "./DarkTemplate";
import BistroTemplate from "./BistroTemplate";
import ElegantTemplate from "./ElegantTemplate";
import VintageTemplate from "./VintageTemplate";
import NeobrutalismTemplate from "./NeobrutalismTemplate";
import NatureTemplate from "./NatureTemplate";
import AsianTemplate from "./AsianTemplate";
import MonochromeTemplate from "./MonochromeTemplate";
import PlayfulTemplate from "./PlayfulTemplate";
import LuxuryTemplate from "./LuxuryTemplate";
import FiestaTemplate from "./FiestaTemplate";
import MediterraneanTemplate from "./MediterraneanTemplate";
import FarmTemplate from "./FarmTemplate";
import CyberpunkTemplate from "./CyberpunkTemplate";
import ParisianTemplate from "./ParisianTemplate";
import TropicalTemplate from "./TropicalTemplate";
import KoreanTemplate from "./KoreanTemplate";

export const templates = {
  modern: { name: "Modern", component: ModernTemplate },
  classic: { name: "Classic", component: ClassicTemplate },
  minimal: { name: "Minimal", component: MinimalTemplate },
  dark: { name: "Dark", component: DarkTemplate },
  bistro: { name: "Bistro", component: BistroTemplate },
  elegant: { name: "Elegant", component: ElegantTemplate },
  vintage: { name: "Vintage", component: VintageTemplate },
  neobrutalism: { name: "Neobrutalism", component: NeobrutalismTemplate },
  nature: { name: "Nature", component: NatureTemplate },
  asian: { name: "Asian", component: AsianTemplate },
  monochrome: { name: "Monochrome", component: MonochromeTemplate },
  playful: { name: "Playful", component: PlayfulTemplate },
  luxury: { name: "Luxury", component: LuxuryTemplate },
  fiesta: { name: "Fiesta", component: FiestaTemplate },
  mediterranean: { name: "Mediterranean", component: MediterraneanTemplate },
  farm: { name: "Farm", component: FarmTemplate },
  cyberpunk: { name: "Cyberpunk", component: CyberpunkTemplate },
  parisian: { name: "Parisian", component: ParisianTemplate },
  tropical: { name: "Tropical", component: TropicalTemplate },
  korean: { name: "Korean", component: KoreanTemplate },
} as const;
