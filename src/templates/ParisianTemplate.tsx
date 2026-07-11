import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function ParisianTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#fdf6f0] p-2 font-sans">
      <div className="bg-white border border-[#f5c6d0]/40 shadow-lg shadow-[#f5c6d0]/20 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#f5c6d0] via-[#f8e5e8] to-[#f5c6d0]" />
        <div className="px-10 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="block w-8 h-8 rounded-full bg-[#f5c6d0]/30 flex items-center justify-center text-[#d48a99] text-sm">&#9829;</span>
              <span className="block w-8 h-8 rounded-full bg-[#f5c6d0]/30 flex items-center justify-center text-[#d48a99] text-sm">&#9829;</span>
              <span className="block w-8 h-8 rounded-full bg-[#f5c6d0]/30 flex items-center justify-center text-[#d48a99] text-sm">&#9829;</span>
            </div>
            <h1 className="text-4xl font-bold text-[#3d2b2f] leading-tight tracking-tight" style={{ fontFamily: "'Georgia', 'serif'" }}>
              {title}
            </h1>
            <p className="text-[9px] text-[#d48a99] uppercase tracking-[0.35em] mt-2 font-semibold" style={{ fontFamily: "'Georgia', serif" }}>
              ~ Une exp&eacute;rience parisienne ~
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#f5c6d0] to-transparent mx-auto mt-3" />
          </div>

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d48a99]">
                    {category}
                  </h2>
                  <span className="flex-1 h-px bg-gradient-to-r from-[#f5c6d0]/40 to-transparent" />
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-[#f5c6d0]/10 last:border-0 hover:bg-[#fdf6f0] transition-colors px-2 -mx-2 rounded">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-[#f5c6d0]/20" />
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm font-medium text-[#3d2b2f] truncate">
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#d48a99] tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-[#f5c6d0]/20 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#f5c6d0] text-sm">&#9829;</span>
              <p className="text-[9px] text-[#d48a99] uppercase tracking-[0.3em] font-medium">
                Merci &agrave; vous &middot; Joyeux app&eacute;tit
              </p>
              <span className="text-[#f5c6d0] text-sm">&#9829;</span>
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-gradient-to-r from-[#f5c6d0] via-[#f8e5e8] to-[#f5c6d0]" />
      </div>
    </div>
  );
}
