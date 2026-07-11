import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function ModernTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-white border border-gray-300 p-14 font-sans">
      
      <div className="text-center mb-12">
        
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-none">
          
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2 mt-5">
          
          <span className="block w-8 h-px bg-gray-300" />
          <span className="block w-2 h-2 rounded-full bg-gray-400" />
          <span className="block w-8 h-px bg-gray-300" />
        </div>
      </div>
      <div className="space-y-10">
        
        {Object.entries(grouped).map(([category, menuItems]) => (
          <div key={category}>
            
            <h2 className="text-base font-semibold uppercase tracking-[0.15em] text-gray-500 mb-5">
              
              {category}
            </h2>
            <div className="space-y-4">
              
              {menuItems.map((item, idx) => (
                <div key={idx} className="group flex items-start justify-between gap-6 pb-4 border-b border-gray-200/50 last:border-0">
                  
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover shrink-0 mt-0.5"
                      />
                    )}
                    <div className="min-w-0">
                      
                      <span className="block text-base font-medium text-gray-900 truncate">
                        
                        {item.name}
                      </span>

                    </div>
                  </div>
                  <span className="text-base font-semibold text-gray-900 tabular-nums whitespace-nowrap">
                    
                    Rp{Intl.NumberFormat("id-ID").format(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-gray-100 text-center">
        
        <p className="text-xs text-gray-400 tracking-[0.1em] uppercase">
          
          Thank you for dining with us
        </p>
      </div>
    </div>
  );
}
