import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function DarkTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] border border-white bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-14 font-sans">
      
      <div className="text-center mb-12">
        
        <h1 className="text-5xl font-bold tracking-tight text-white leading-none">
          
          {title}
        </h1>
        <div className="flex items-center justify-center gap-3 mt-6">
          
          <span className="block w-6 h-px bg-amber-500/60" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-amber-500" />
          <span className="block w-6 h-px bg-amber-500/60" />
        </div>
      </div>
      <div className="space-y-8">
        
        {Object.entries(grouped).map(([category, menuItems]) => (
          <div key={category}>
            
            <div className="flex items-center gap-4 mb-5">
              
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-amber-400/90">
                
                {category}
              </h2>
              <span className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
            </div>
            <div className="space-y-3">
              
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-0"
                >
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 rounded object-cover ring-1 ring-white/10"
                      />
                    )}
                    <span className="text-gray-200 truncate text-sm"> {item.name} </span>
                  </div>
                  <span className="text-amber-400 font-semibold tabular-nums whitespace-nowrap text-sm">
                    
                    Rp{Intl.NumberFormat("id-ID").format(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 text-center border-t border-white/5">
        
        <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
          
          Enjoy your evening
        </p>
      </div>
    </div>
  );
}
