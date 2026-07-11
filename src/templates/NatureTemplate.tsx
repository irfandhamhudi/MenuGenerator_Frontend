import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function NatureTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] font-sans">
      <div className=" bg-white border-2 border-[#c8dcc0] p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#e8f3e0] rounded-bl-[100px] -z-0" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#e8f3e0] rounded-tr-[80px] -z-0" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#2d5a27] tracking-tight leading-tight">
              {title}
            </h1>
            <div className="w-48 h-1 bg-[#8fc97b] rounded-full mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#8fc97b]" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6b9e5a]">
                    {category}
                  </h2>
                  <span className="flex-1 h-px bg-[#c8dcc0]" />
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2.5 px-3 rounded-xl hover:bg-[#f5f9f0] transition-colors border-b border-[#c8dcc0]/50 last:border-0">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#c8dcc0]" />
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#2d5a27] truncate">
                            {item.name}
                          </span>
                          {/* <span className="text-[10px] text-[#8fb88a]">&#10003; fresh ingredients</span> */}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#2d5a27] tabular-nums whitespace-nowrap">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 text-center border-t border-[#c8dcc0]">
            <p className="text-[10px] text-[#8fb88a] uppercase tracking-[0.2em] font-medium">
              From our kitchen to your table
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
