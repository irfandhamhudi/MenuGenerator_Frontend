import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function NeobrutalismTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] font-sans">
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black uppercase tracking-[-0.02em] text-black leading-none">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="block h-2 w-2 bg-[#ff6b6b] rotate-45" />
            <span className="block h-2 w-2 bg-[#ffd93d] rotate-45" />
            <span className="block h-2 w-2 bg-[#6bcb77] rotate-45" />
            <span className="block h-2 w-2 bg-[#4d96ff] rotate-45" />
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, menuItems], ci) => {
            const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8e53"];
            const color = colors[ci % colors.length];
            return (
              <div key={category}>
                <div
                  className="inline-block px-4 py-1.5 mb-4 border-2 border-black font-bold text-sm uppercase tracking-wider"
                  style={{ backgroundColor: color, color: "#000" }}
                >
                  {category}
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 p-3 border-2 border-black bg-white"
                      style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded object-cover border-2 border-black" />
                        )}
                        <span className="text-sm font-bold text-black truncate">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold bg-black text-white px-2 py-0.5">
                          Rp
                        </span>
                        <span className="text-sm font-black text-black tabular-nums">
                          {Intl.NumberFormat("id-ID").format(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t-[3px] border-black text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
            Enjoy your meal!
          </p>
        </div>
      </div>
    </div>
  );
}
