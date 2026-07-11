import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function FiestaTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#1a1a1a] p-2 font-sans">
      <div className="bg-[#f5e6ca] border-4 border-[#e63946] p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #e63946 0px, #e63946 2px, transparent 2px, transparent 8px)" }} />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">&#127790;</span>
              <span className="text-2xl">&#127803;</span>
              <span className="text-2xl">&#127790;</span>
            </div>
            <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tight leading-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              {title}
            </h1>
            <div className="flex items-center justify-center gap-1 mt-4">
              <span className="block w-6 h-1.5 bg-[#e63946]" />
              <span className="block w-6 h-1.5 bg-[#ffd60a]" />
              <span className="block w-6 h-1.5 bg-[#2a9d8f]" />
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="inline-block bg-[#ffd60a] border-2 border-[#e63946] px-4 py-1 mb-4 font-black text-sm uppercase tracking-wider text-[#1a1a1a]">
                  {category}
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-[#e63946]/15 last:border-0 bg-white/50 px-3 hover:bg-white/80 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded object-cover shrink-0 border-2 border-[#ffd60a]" />
                        )}
                        <span className="text-sm font-bold text-[#1a1a1a] truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-black text-[#e63946] tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t-2 border-[#e63946]/20 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-lg">&#127790;</span>
              <p className="text-[10px] font-bold text-[#e63946] uppercase tracking-[0.25em]">
                &iexcl;Buen provecho!
              </p>
              <span className="text-lg">&#127790;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
