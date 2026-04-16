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
    <div className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl shadow-2xl">
      <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">
        Pakistan Standard Time
      </div>
      <div className="text-5xl md:text-6xl font-mono font-bold text-primary tabular-nums drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
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
  );
};
