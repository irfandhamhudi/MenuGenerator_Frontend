import { useRef, useState, useEffect, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AutoScale({ children, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current || !contentRef.current) return;
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;
      const iw = contentRef.current.scrollWidth;
      const ih = contentRef.current.scrollHeight;
      if (iw === 0 || ih === 0) return;
      setScale(Math.min(cw / iw, ch / ih, 1));
    });

    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden flex items-center justify-center ${className}`}
    >
      <div
        ref={contentRef}
        style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        className="shrink-0"
      >
        {children}
      </div>
    </div>
  );
}
