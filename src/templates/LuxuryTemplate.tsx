import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function LuxuryTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#0d0c0a] p-2 font-serif">
      <div className="border border-[#c9a84c]/30 p-1">
        <div className="border border-[#c9a84c]/10 p-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="block w-10 h-px bg-[#c9a84c]/40" />
              <span className="block w-2 h-2 border border-[#c9a84c] rotate-45" />
              <span className="block w-10 h-px bg-[#c9a84c]/40" />
            </div>
            <h1 className="text-4xl font-bold text-[#c9a84c] tracking-wide leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              {title}
            </h1>
            <p className="text-[10px] text-[#c9a84c]/50 uppercase tracking-[0.35em] mt-3 font-light">
              Fine dining experience
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mx-auto mt-5" />
          </div>

          <div className="space-y-8">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-4 mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
                    {category}
                  </h2>
                  <span className="flex-1 h-px bg-gradient-to-r from-[#c9a84c]/20 to-transparent" />
                </div>
                <div className="space-y-3">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-3 border-b border-[#c9a84c]/5 last:border-0 group hover:bg-[#c9a84c]/[0.02] transition-colors px-2 -mx-2">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-[#c9a84c]/20" />
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#e8d5a3] truncate group-hover:text-[#c9a84c] transition-colors">
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#c9a84c] tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#c9a84c]/10 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="block w-6 h-px bg-[#c9a84c]/20" />
              <span className="text-[9px] text-[#c9a84c]/40 uppercase tracking-[0.35em] font-light">
                Bon App&eacute;tit
              </span>
              <span className="block w-6 h-px bg-[#c9a84c]/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
