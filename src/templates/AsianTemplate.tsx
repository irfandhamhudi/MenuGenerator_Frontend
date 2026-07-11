import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function AsianTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#fffaeb] font-sans">
      <div className="border-2 border-[#d4a821] p-10 relative">
        <div className="absolute top-0 right-0 text-[120px] leading-none text-[#f0e8d8] font-bold select-none">
          食
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-xs text-[#c0392b] uppercase tracking-[0.3em] mt-2 font-semibold">
                Authentic Asian Cuisine
              </p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 rounded-full bg-[#c0392b] flex items-center justify-center">
                <span className="text-white text-xl font-bold">&#19968;</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#e0d8cc] mb-8" />

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-1 h-5 bg-[#c0392b] rounded-full" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#888]">
                    {category}
                  </h2>
                </div>
                <div className="space-y-1">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-[#f0e8d8]/50 last:border-0">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />
                        )}
                        <span className="text-sm font-medium text-[#1a1a1a] truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#c0392b] tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-[#e0d8cc] text-center">
            <p className="text-[10px] text-[#aaa] uppercase tracking-[0.2em]">
              ありがとうございます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
