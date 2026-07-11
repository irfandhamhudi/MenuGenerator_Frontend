import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function TropicalTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-gradient-to-br from-[#ff9a56] via-[#ff6f69] to-[#b83b5e] p-2 font-sans">
      <div className="bg-white/90 backdrop-blur-sm border-2 border-[#ffd93d]/30 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">&#127796;</span>
            <span className="text-2xl">&#127754;</span>
            <span className="text-2xl">&#127796;</span>
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6f69] via-[#ffd93d] to-[#00b4d8] leading-none tracking-tight">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="block w-8 h-px bg-[#ff6f69]/40" />
            <span className="text-[10px] text-[#ff6f69] uppercase tracking-[0.25em] font-semibold">
              Paradise Awaits
            </span>
            <span className="block w-8 h-px bg-[#ff6f69]/40" />
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([category, menuItems]) => (
            <div key={category}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-sm">&#127754;</span>
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#b83b5e]">
                  {category}
                </h2>
              </div>
              <div className="space-y-2">
                {menuItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-white border border-[#ffd93d]/20 shadow-sm hover:shadow-md transition-shadow border-b border-[#ffd93d]/20 last:border-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.image && (
                        <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 ring-2 ring-[#ffd93d]/30" />
                      )}
                      <span className="text-sm font-semibold text-[#2b2b2b] truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#ff6f69] tabular-nums whitespace-nowrap">
                      Rp{Intl.NumberFormat("id-ID").format(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-5 border-t border-[#ffd93d]/30 text-center">
          <div className="flex items-center justify-center gap-3">
            <span>&#127796;</span>
            <p className="text-[9px] text-[#b83b5e] font-semibold uppercase tracking-[0.25em]">
              Aloha &middot; Enjoy the flavors
            </p>
            <span>&#127796;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
