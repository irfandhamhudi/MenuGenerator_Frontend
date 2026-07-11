import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function KoreanTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#fafafa] p-2 font-sans">
      <div className="bg-white border border-gray-100 p-8 shadow-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-1 mb-4 bg-[#fce4ec] rounded-full px-4 py-1">
            <span className="text-[11px] text-[#e91e63] font-medium tracking-wide">&#9830; CUTE &#9830;</span>
          </div>
          <h1 className="text-4xl font-black text-[#2d2d2d] tracking-tight leading-tight">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="block w-6 h-0.5 rounded-full bg-[#f48fb1]" />
            <span className="block w-6 h-0.5 rounded-full bg-[#a5d6a7]" />
            <span className="block w-6 h-0.5 rounded-full bg-[#90caf9]" />
          </div>
        </div>

        <div className="space-y-5">
          {Object.entries(grouped).map(([category, menuItems]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f48fb1] to-[#fce4ec] flex items-center justify-center text-[9px] text-white font-bold">
                  #
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#888]">
                  {category}
                </h2>
                <span className="flex-1 h-px bg-gradient-to-r from-[#f48fb1]/20 to-transparent" />
              </div>
              <div className="space-y-1">
                {menuItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 py-2.5 px-3 rounded-xl hover:bg-[#fafafa] transition-colors border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.image && (
                        <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-gray-100" />
                      )}
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-[#2d2d2d] truncate">
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#e91e63] tabular-nums whitespace-nowrap">
                      Rp{Intl.NumberFormat("id-ID").format(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-5 border-t border-gray-100 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[9px] text-[#f48fb1]">&#9829;</span>
            <p className="text-[9px] text-gray-300 uppercase tracking-[0.25em] font-medium">
              Thank you &middot; 감사합니다
            </p>
            <span className="text-[9px] text-[#a5d6a7]">&#9829;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
