import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio } from 'lucide-react';

const LOGS = [
  { freq: '6.165 MHz', station: 'Radio Netherlands', time: '18:30 UTC', date: '1992-05-12' },
  { freq: '9.410 MHz', station: 'BBC World Service', time: '20:00 UTC', date: '1995-11-20' },
  { freq: '11.780 MHz', station: 'Voice of America', time: '14:15 UTC', date: '1998-03-05' },
  { freq: '15.120 MHz', station: 'Radio France Int.', time: '12:00 UTC', date: '2005-08-15' },
  { freq: '17.850 MHz', station: 'Deutsche Welle', time: '16:45 UTC', date: '2010-12-01' },
];

export const RadioLog: React.FC = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <Radio className="w-4 h-4 text-primary" />
          Historical Radio Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {LOGS.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors group">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-primary group-hover:text-primary/80">{log.freq}</span>
                <span className="text-sm font-bold text-foreground">{log.station}</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-muted-foreground uppercase">{log.time}</div>
                <div className="text-[10px] font-mono text-muted-foreground/60">{log.date}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
