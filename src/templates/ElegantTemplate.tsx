import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function ElegantTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] border border-[#e9c46a]/30 bg-white font-sans">
      <div className="h-2 bg-gradient-to-r from-[#d4a373] via-[#e9c46a] to-[#d4a373]" />
      <div className="px-14 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="block w-8 h-px bg-[#d4a373]" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
            <span className="block w-8 h-px bg-[#d4a373]" />
          </div>
          <h1 className="text-4xl font-bold text-[#264653] tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xs text-[#d4a373] uppercase tracking-[0.2em] mt-2 font-medium">
            Discover our selection
          </p>
          <div className="w-16 h-0.5 bg-[#e9c46a] mx-auto mt-4" />
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, menuItems]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#2a9d8f]">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-[#e9c46a]/40" />
              </div>
              <div className="space-y-3">
                {menuItems.map((item, idx) => (
                  <div key={idx} className="group flex items-start justify-between gap-6 py-2 border-b border-[#e9c46a]/20 last:border-0">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-[#e9c46a]/30"
                        />
                      )}
                      <div className="min-w-0">
                        <span className="block text-[15px] font-semibold text-[#264653] truncate">
                          {item.name}
                        </span>

                      </div>
                    </div>
                    <span className="text-[15px] font-bold text-[#264653] tabular-nums whitespace-nowrap mt-0.5">
                      Rp{Intl.NumberFormat("id-ID").format(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#e9c46a]/30 text-center">
          <div className="inline-flex items-center gap-3">
            <span className="block w-8 h-px bg-[#d4a373]" />
            <span className="text-[10px] text-[#d4a373] uppercase tracking-[0.25em] font-medium">
              Enjoy your meal
            </span>
            <span className="block w-8 h-px bg-[#d4a373]" />
          </div>
        </div>
      </div>
      <div className="h-2 bg-gradient-to-r from-[#d4a373] via-[#e9c46a] to-[#d4a373]" />
    </div>
  );
}
