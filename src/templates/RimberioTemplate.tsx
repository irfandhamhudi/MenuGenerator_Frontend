import type { MenuItem } from "../types";

interface Props {
  title: string;
  items: MenuItem[];
}

// Organic hand-drawn leaf outline SVG
const LeafOutline = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Stem */}
    <path d="M70 380 C 80 280 120 120 100 20" />

    {/* Leaf 1 left */}
    <path d="M82 300 C 40 280 30 240 75 220 C 78 245 80 275 82 300 Z" />
    <path d="M82 300 C 65 270 60 250 75 220" />

    {/* Leaf 1 right */}
    <path d="M86 280 C 120 260 135 220 95 200 C 93 225 90 255 86 280 Z" />
    <path d="M86 280 C 105 250 110 230 95 200" />

    {/* Leaf 2 left */}
    <path d="M92 210 C 50 190 45 150 85 130 C 88 155 90 185 92 210 Z" />
    <path d="M92 210 C 75 180 70 160 85 130" />

    {/* Leaf 2 right */}
    <path d="M96 190 C 130 170 140 130 105 110 C 103 135 100 165 96 190 Z" />
    <path d="M96 190 C 115 160 120 140 105 110" />

    {/* Leaf 3 left */}
    <path d="M98 120 C 65 100 60 70 92 50 C 94 70 96 95 98 120 Z" />
    <path d="M98 120 C 85 95 80 80 92 50" />

    {/* Leaf 3 right */}
    <path d="M100 100 C 130 80 135 50 108 30 C 106 50 103 75 100 100 Z" />
    <path d="M100 100 C 118 75 120 60 108 30" />

    {/* Top leaf */}
    <path d="M100 20 C 110 -5 95 -15 95 10 C 95 10 96 15 100 20 Z" />
  </svg>
);

// Fork & Knife SVG path
const ForkKnifeIcon = () => (
  <svg
    className="w-4 h-4 text-[#062D24]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 1 6 8c0 2.2 1.8 4 4 4v7a2 2 0 0 0 4 0v-7c2.2 0 4-1.8 4-4z" />
    <path d="M12 2v10" />
    <path d="M9 2v4" />
    <path d="M15 2v4" />
  </svg>
);

// Drink glass SVG path
const GlassIcon = () => (
  <svg
    className="w-4 h-4 text-[#062D24]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 22H7" />
    <path d="M12 11v11" />
    <path d="M19 3v4L12 11L5 7V3h14z" />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
  </svg>
);

// Globe SVG path
const GlobeIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-[#062D24]/60"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

// Formats prices to 'k' notation (e.g. 12000 -> 12k, 12500 -> 12.5k)
const formatRimberioPrice = (price: number): string => {
  if (price >= 1000) {
    const kValue = price / 1000;
    return `${Number(kValue.toFixed(1))}k`;
  }
  return price.toString();
};

export default function RimberioTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="w-[800px] min-h-[1020px] bg-[#FAF9F5] text-[#062D24] relative overflow-hidden flex font-sans select-none border border-[#062D24]/10 shadow-md">
      {/* Left Sidebar */}
      <div className="w-[180px] shrink-0 border-r border-[#062D24]/10 relative flex flex-col justify-center items-center overflow-hidden bg-[#FAF9F5]">
        {/* Background Leaves in Sidebar */}
        <LeafOutline className="absolute text-[#e2e7d5] w-[260px] h-[520px] left-[-30px] top-[8%] rotate-12 pointer-events-none" />
        <LeafOutline className="absolute text-[#e2e7d5] w-[220px] h-[440px] right-[-40px] bottom-[5%] rotate-[-45deg] opacity-75 pointer-events-none" />

        {/* Huge vertical text */}
        <div
          className="-translate-x-16 rotate-[-90deg] font-black text-[150px]  text-[#062D24] whitespace-nowrap z-10 leading-none select-none"
          style={{ fontFamily: '"Outfit Variable", sans-serif' }}
        >
          OUR MENU
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-12 pr-16 flex flex-col justify-between relative z-10 bg-transparent">
        {/* Background Leaf in Bottom Right */}
        <LeafOutline className="absolute text-[#e2e7d5] w-[340px] h-[680px] right-[-60px] bottom-[-60px] rotate-[-25deg] pointer-events-none" />

        {/* Title Header */}
        <div className="text-right mb-12 relative z-10">
          <h1
            className="text-6xl font-black text-[#5C1616] tracking-tight uppercase leading-none"
            style={{ fontFamily: '"Outfit Variable", sans-serif' }}
          >
            {title}
          </h1>
          <p className="text-xs font-bold text-[#062D24]/80 tracking-[0.1em] mt-3">
            Cafe Gen-Z Terlangka di Bumi!
          </p>
        </div>

        {/* Categories Section */}
        <div className="flex-1 space-y-12 relative z-10">
          {Object.entries(grouped).map(([category, menuItems]) => {
            const isMinuman = category.toLowerCase().includes("minum");
            const Icon = isMinuman ? GlassIcon : ForkKnifeIcon;

            return (
              <div key={category} className="flex gap-6 items-start">
                {/* Vertical Category Label */}
                <div className="flex flex-col items-center justify-end w-10 shrink-0 self-stretch pb-1">
                  <div className="flex-1 flex items-center justify-center">
                    <span
                      style={{ writingMode: "vertical-lr" }}
                      className="rotate-180 uppercase font-black text-[#062D24] text-xs tracking-[0.25em] whitespace-nowrap"
                    >
                      {category}
                    </span>
                  </div>
                  <div className="mt-4 p-2 rounded-full border border-[#062D24]/10 bg-[#FAF9F5] shadow-xs">
                    <Icon />
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 space-y-4 pt-1">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 group">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#062D24]/15 shadow-xs"
                          />
                        )}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {/* Dot Bullet */}
                          <span className="w-1.5 h-1.5 rounded-full bg-[#062D24] shrink-0" />
                          <span className="text-base font-semibold text-[#062D24]/90 truncate">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      {/* Dotted line spacer (leader) */}
                      <div className="flex-1 border-b border-dotted border-[#062D24]/30 h-1.5 min-w-[30px] self-center" />

                      {/* Price */}
                      <span className="text-base font-black text-[#062D24] tabular-nums whitespace-nowrap">
                        {formatRimberioPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-[#062D24]/10 flex items-center justify-center gap-2 text-xs font-bold text-[#062D24]/60 tracking-wider relative z-10">
          <GlobeIcon />
          <span>reallygreatsite.com</span>
        </div>
      </div>
    </div>
  );
}
