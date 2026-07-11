import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function FarmTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#f5ebe0] p-2 font-sans">
      <div className="border-4 border-[#8b4513]/20 p-2" style={{ boxShadow: "inset 0 0 0 2px #d4a76a" }}>
        <div className="bg-[#fdf8f0] p-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #8b4513 40px, #8b4513 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #8b4513 40px, #8b4513 41px)", backgroundSize: "41px 41px", backgroundPosition: "-1px -1px" }}>
          <div className="bg-white/95 p-8 border border-[#d4a76a]/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4 text-[#6b3a1f]">
                <span className="text-xl">&#127806;</span>
                <span className="text-xl">&#127803;</span>
                <span className="text-xl">&#127812;</span>
              </div>
              <h1 className="text-4xl font-bold text-[#4a2810] leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                {title}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="block w-8 h-px bg-[#8b4513]/30" />
                <span className="text-[10px] text-[#8b4513]/60 uppercase tracking-[0.25em] font-medium">
                  Farm Fresh
                </span>
                <span className="block w-8 h-px bg-[#8b4513]/30" />
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(grouped).map(([category, menuItems]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b3a1f]">
                      {category}
                    </h2>
                    <span className="flex-1 h-px bg-[#d4a76a]/40" />
                  </div>
                  <div className="space-y-1">
                    {menuItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 py-2 px-2 border-b border-[#d4a76a]/15 last:border-0 hover:bg-[#d4a76a]/[0.04] transition-colors">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {item.image && (
                            <img src={item.image} alt="" className="w-10 h-10 rounded object-cover shrink-0 border border-[#d4a76a]/30" />
                          )}
                          <span className="text-sm font-medium text-[#4a2810] truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#6b3a1f] tabular-nums whitespace-nowrap">
                          Rp{Intl.NumberFormat("id-ID").format(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#d4a76a]/30 text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="text-[#8b4513]/30 text-xs">&#10022;</span>
                <p className="text-[9px] text-[#8b4513]/50 uppercase tracking-[0.3em] font-medium">
                  Homegrown with love
                </p>
                <span className="text-[#8b4513]/30 text-xs">&#10022;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
