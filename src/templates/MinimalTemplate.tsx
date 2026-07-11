import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function MinimalTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-white p-14 border border-gray-300">
      
      <div className="text-center mb-14">
        
        <h1 className="text-3xl font-light tracking-[0.25em] uppercase text-gray-900">
          
          {title}
        </h1>
        <div className="w-full h-px bg-gray-200 mt-8" />
      </div>
      <div className="space-y-12">
        
        {Object.entries(grouped).map(([category, menuItems]) => (
          <div key={category}>
            
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6">
              
              {category}
            </h2>
            <div className="space-y-5">
              
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex items-baseline justify-between gap-6 pb-4 border-b border-gray-200/50 last:border-0">
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-8 h-8 rounded object-cover opacity-60"
                      />
                    )}
                    <span className="text-sm text-gray-700 truncate"> {item.name} </span>
                  </div>
                  <span className="text-sm text-gray-500 tabular-nums whitespace-nowrap">
                    
                    Rp{Intl.NumberFormat("id-ID").format(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 pt-6">
        
        <div className="w-12 h-px bg-gray-200 mx-auto" />
      </div>
    </div>
  );
}
