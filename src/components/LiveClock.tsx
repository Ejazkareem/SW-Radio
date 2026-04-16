import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pakistan Standard Time is UTC+5
  const pktTime = new Date(time.getTime() + (time.getTimezoneOffset() + 300) * 60000);

  return (
    <div className="bg-card border border-border rounded-xl shadow-2xl p-6 flex flex-row items-center justify-between gap-6 overflow-hidden group">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">
          Pakistan Standard Time
        </div>
        <div className="text-5xl font-mono font-bold text-primary tabular-nums drop-shadow-[0_0_15px_rgba(74,222,128,0.3)] whitespace-nowrap">
          {format(pktTime, 'HH:mm:ss')}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="text-lg font-medium text-foreground">
            {format(pktTime, 'EEEE')}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(pktTime, 'MMMM do, yyyy')}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70">Live Signal</span>
        </div>
      </div>
      
      <div className="hidden sm:block w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-colors shrink-0">
        <img 
          src="https://picsum.photos/seed/radio-shelf/600/600" 
          alt="Radio Collection Shelf" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      </div>
    </div>
  );
};
