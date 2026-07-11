import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function CyberpunkTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#0a0a0f] p-2 font-mono">
      <div className="border border-[#00ff88]/20 p-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent animate-pulse" />
        <div className="bg-[#0d0d15] p-8 border border-[#00ff88]/10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="block w-3 h-3" style={{ backgroundColor: ["#00ff88", "#ff00ff", "#00ccff", "#ff6600", "#ffff00"][i], boxShadow: "0 0 6px currentColor" }} />
              ))}
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00ccff] to-[#ff00ff] leading-none uppercase">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="block h-px w-12 bg-gradient-to-r from-transparent to-[#ff00ff]/50" />
              <span className="text-[9px] text-[#00ff88]/70 uppercase tracking-[0.4em] font-bold">
                SYSTEM.READY
              </span>
              <span className="block h-px w-12 bg-gradient-to-l from-transparent to-[#ff00ff]/50" />
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(grouped).map(([category, menuItems]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-3" style={{ borderLeft: "2px solid #00ff88", paddingLeft: "10px" }}>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#00ccff] uppercase">
                    &gt;&gt; {category}
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-[#00ff88]/30 to-transparent" />
                </div>
                <div className="space-y-1">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 px-3 border-b border-[#00ff88]/5 last:border-0 hover:bg-[#00ff88]/[0.03] transition-colors group">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded object-cover shrink-0 ring-1 ring-[#ff00ff]/30 group-hover:ring-[#00ff88] transition-all" style={{ filter: "hue-rotate(60deg)" }} />
                        )}
                        <span className="text-sm text-gray-400 font-semibold tracking-wider uppercase truncate group-hover:text-[#00ff88] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#ff00ff] tabular-nums whitespace-nowrap" style={{ textShadow: "0 0 8px rgba(255,0,255,0.5)" }}>
                        Rp{Intl.NumberFormat("id-ID").format(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-[#00ff88]/10 text-center">
            <p className="text-[9px] text-[#00ff88]/40 font-bold tracking-[0.4em] uppercase">
              &gt;&gt; CONNECTION TERMINATED &lt;&lt;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
