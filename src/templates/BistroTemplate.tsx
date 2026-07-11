import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function BistroTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] border border-white bg-[#1c1917] p-14 relative overflow-hidden">
      
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative">
        
        <div className="text-center mb-10">
          
          <div className="inline-flex items-center gap-2 text-amber-600/60 text-xs uppercase tracking-[0.25em] mb-3">
            
            <span className="w-6 h-px bg-amber-600/30" /> Bistro
            <span className="w-6 h-px bg-amber-600/30" />
          </div>
          <h1
            className="text-5xl text-amber-50 tracking-wide leading-tight"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            
            {title}
          </h1>
        </div>
        <div className="border-t border-dashed border-amber-900/40 mb-8" />
        {Object.entries(grouped).map(([category, menuItems]) => (
          <div key={category} className="mb-7 last:mb-0">
            
            <h2 className="text-amber-400/80 text-sm uppercase tracking-[0.2em] mb-4 font-medium">
              
              {category}
            </h2>
            <div className="space-y-3">
              
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-1.5 border-b border-amber-800/20 last:border-0">
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover border border-amber-800/30"
                      />
                    )}
                    <span className="text-amber-100/90 truncate text-sm"> {item.name} </span>
                  </div>
                  <span className="text-amber-400 font-medium tabular-nums whitespace-nowrap text-sm">
                    
                    Rp{Intl.NumberFormat("id-ID").format(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="border-t border-dashed border-amber-900/40 mt-8 pt-5 text-center">
          
          <p className="text-amber-600/50 text-xs italic">
            
            Fresh ingredients, house-made recipes
          </p>
        </div>
      </div>
    </div>
  );
}
