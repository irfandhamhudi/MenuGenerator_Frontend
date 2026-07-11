import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function VintageTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-white font-sans" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c5a9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
      <div className="border-2 border-[#8b6914]/30 rounded-sm p-1">
        <div className="border border-[#8b6914]/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#5c4a2a] tracking-wide leading-tight mt-2" style={{ fontFamily: "Georgia, serif" }}>
              {title}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="block w-6 h-px bg-[#8b6914]/40" />
              <span className="text-[10px] text-[#8b6914] uppercase tracking-[0.3em] font-medium">Est. 2024</span>
              <span className="block w-6 h-px bg-[#8b6914]/40" />
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="block w-4 h-px bg-[#8b6914]/30" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6914]">
                    {category}
                  </h2>
                  <span className="block flex-1 h-px bg-[#8b6914]/30" />
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 py-1.5 border-b border-[#8b6914]/10 last:border-0">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-9 h-9 rounded object-cover border border-[#8b6914]/20 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm font-medium text-[#5c4a2a] truncate">
                            {item.name}
                          </span>

                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#5c4a2a] tabular-nums whitespace-nowrap mt-0.5">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 text-center border-t border-[#8b6914]/20">
            <p className="text-[9px] text-[#8b6914] uppercase tracking-[0.35em] font-medium">
              Terima Kasih &middot; Thank You &middot; Merci
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
