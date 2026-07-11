import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function PlayfulTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] font-sans">
      <div className="bg-white/80 backdrop-blur-sm border-2 border-[#ffcc02]/30 p-8 shadow-lg shadow-[#ff6b6b]/10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">&#127881;</span>
            <span className="text-2xl">&#127803;</span>
            <span className="text-2xl">&#127775;</span>
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] via-[#ffd93d] to-[#6bcb77] leading-none tracking-tight">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="block w-2 h-2 rounded-full bg-[#ff6b6b]" />
            <span className="block w-2 h-2 rounded-full bg-[#ffd93d]" />
            <span className="block w-2 h-2 rounded-full bg-[#6bcb77]" />
            <span className="block w-2 h-2 rounded-full bg-[#4d96ff]" />
            <span className="block w-2 h-2 rounded-full bg-[#ff8e53]" />
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([category, menuItems], ci) => {
            const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8e53", "#a66cff"];
            const c = colors[ci % colors.length];
            return (
              <div key={category}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 font-bold text-sm uppercase tracking-wider"
                  style={{ backgroundColor: c + "20", color: c, border: "2px solid " + c + "40" }}
                >
                  <span>{category}</span>
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#ffcc02]/40 transition-colors shadow-sm hover:shadow-md border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 ring-2 ring-[#ffcc02]/20" />
                        )}
                        <span className="text-sm font-bold text-gray-800 truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-black text-gray-800 tabular-nums whitespace-nowrap bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t-2 border-[#ffcc02]/20 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
            &#127775; Good times start here! &#127775;
          </p>
        </div>
      </div>
    </div>
  );
}
