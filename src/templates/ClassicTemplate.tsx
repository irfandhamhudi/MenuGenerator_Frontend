import type { MenuItem } from "../types";
interface Props {
  title: string;
  items: MenuItem[];
}
export default function ClassicTemplate({ title, items }: Props) {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  return (
    <div className="w-[800px] min-h-[600px] bg-[#faf7f2] dark:bg-[#ffe3b9]/70">
      
      <div className="border-2 border-[#c4a97d] dark:border-[#e8c86a] p-10">
        
        <div className="text-center mb-10">
          
          <h1
            className="text-5xl text-[#2c1810] dark:text-[#1a0f08] tracking-wide leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            
            {title}
          </h1>
          <div className="w-20 h-0.5 bg-[#c4a97d] dark:bg-[#e8c86a] mx-auto mt-5 mb-3" />
          <p className="text-xs text-[#8b7355] dark:text-[#7a6040] uppercase tracking-[0.2em]"> Fine Dining </p>
        </div>
        {Object.entries(grouped).map(([category, menuItems]) => (
          <div key={category} className="mb-8 last:mb-0">
            
            <div className="text-center mb-5">
              
              <h2
                className="text-lg text-[#2c1810] dark:text-[#1a0f08] italic"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                
                {category}
              </h2>
              <div className="w-12 h-px bg-[#c4a97d] dark:bg-[#e8c86a] mx-auto mt-2" />
            </div>
            <div className="space-y-3">
              
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-3 border-b border-[#c4a97d]/20 dark:border-[#e8c86a]/40 last:border-0">
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 rounded object-cover border border-[#c4a97d]/30 dark:border-[#e8c86a]/40"
                      />
                    )}
                    <span className="text-[#2c1810] dark:text-[#1a0f08] truncate"> {item.name} </span>
                  </div>
                  <span
                    className="text-[#2c1810] dark:text-[#1a0f08] font-semibold tabular-nums whitespace-nowrap"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    
                    Rp{Intl.NumberFormat("id-ID").format(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-10 pt-5 text-center border-t border-[#c4a97d]/40 dark:border-[#e8c86a]/40">
          
          <p className="text-[10px] text-[#8b7355] dark:text-[#7a6040] uppercase tracking-[0.25em]">
            
            Bon Appetit
          </p>
        </div>
      </div>
    </div>
  );
}
