import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function MediterraneanTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#f0f7fa] p-2 font-sans" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20l10-10M0 20l10-10m20 20l10-10M20 40l10-10' stroke='%232181c0' stroke-width='0.5' fill='none' opacity='0.04' /%3E%3C/svg%3E\")" }}>
      <div className="bg-white border-2 border-[#2181c0]/20  overflow-hidden ">
        <div className="h-2 bg-gradient-to-r from-[#2181c0] via-[#43b4e0] to-[#2181c0]" />
        <div className="px-10 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="block w-8 h-8 rounded-full bg-[#2181c0]/10 flex items-center justify-center text-[#2181c0] text-lg">&#9733;</span>
              <span className="block w-8 h-8 rounded-full bg-[#43b4e0]/10 flex items-center justify-center text-[#43b4e0] text-lg">&#9733;</span>
              <span className="block w-8 h-8 rounded-full bg-[#2181c0]/10 flex items-center justify-center text-[#2181c0] text-lg">&#9733;</span>
            </div>
            <h1 className="text-4xl font-bold text-[#0d3b66] tracking-tight leading-tight">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="block w-8 h-px bg-[#2181c0]/30" />
              <span className="text-[10px] text-[#2181c0] uppercase tracking-[0.25em] font-medium">
                Kαλωσήρθατε
              </span>
              <span className="block w-8 h-px bg-[#2181c0]/30" />
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2181c0]" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d3b66]">
                    {category}
                  </h2>
                  <span className="flex-1 h-px bg-gradient-to-r from-[#2181c0]/20 to-transparent" />
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-[#2181c0]/8 last:border-0 hover:bg-[#2181c0]/[0.02] transition-colors px-2 -mx-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-[#2181c0]/15" />
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#0d3b66] truncate">
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#2181c0] tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-[#2181c0]/15 text-center">
            <p className="text-[9px] text-[#2181c0]/40 uppercase tracking-[0.3em] font-medium">
              Kαλή όρεξη &middot; Enjoy your meal
            </p>
          </div>
        </div>
        <div className="h-2 bg-gradient-to-r from-[#2181c0] via-[#43b4e0] to-[#2181c0]" />
      </div>
    </div>
  );
}
