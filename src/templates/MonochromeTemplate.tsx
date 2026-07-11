import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function MonochromeTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#f0f0f0] font-sans">
      <div className="border border-black/10 p-1">
        <div className="border border-black/5 p-10">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-black/20 flex items-center justify-center" style={{ filter: "grayscale(100%)" }}>
              <span className="text-black/40 text-2xl font-thin">&#9670;</span>
            </div>
            <h1 className="text-4xl font-extralight text-black tracking-[0.15em] uppercase leading-none">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="block w-12 h-px bg-black/20" />
              <span className="block w-1 h-1 bg-black/40" />
              <span className="block w-12 h-px bg-black/20" />
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[10px] text-black/30 uppercase tracking-[0.25em] font-light">
                    {category}
                  </span>
                  <span className="flex-1 h-px bg-black/5" />
                </div>
                <div className="space-y-3">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-black/5 last:border-0 group">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="w-10 h-10 rounded object-cover shrink-0 opacity-80 grayscale group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        <span className="text-sm text-black font-light tracking-wide truncate group-hover:text-black transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm text-black/50 font-light tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-black/5 text-center">
            <p className="text-[9px] text-black/20 uppercase tracking-[0.3em] font-light">
              Black &amp; White
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
