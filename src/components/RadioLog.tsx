import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio, ExternalLink, Play } from 'lucide-react';

const LOGS = [
  { 
    freq: '6.165 MHz', 
    station: 'Radio Netherlands', 
    time: '18:30 UTC', 
    date: '1992-05-12', 
    url: 'https://www.rnw.org/' 
  },
  { 
    freq: '9.410 MHz', 
    station: 'BBC World Service', 
    time: '20:00 UTC', 
    date: '1995-11-20', 
    url: 'https://www.bbc.co.uk/sounds/play/live:bbc_world_service' 
  },
  { 
    freq: '11.780 MHz', 
    station: 'Voice of America', 
    time: '14:15 UTC', 
    date: '1998-03-05', 
    url: 'https://www.voanews.com/live/audio/48' 
  },
  { 
    freq: '15.120 MHz', 
    station: 'Radio France Int.', 
    time: '12:00 UTC', 
    date: '2005-08-15', 
    url: 'https://www.rfi.fr/en/live-radio' 
  },
  { 
    freq: '17.850 MHz', 
    station: 'Deutsche Welle', 
    time: '16:45 UTC', 
    date: '2010-12-01', 
    url: 'https://www.dw.com/en/radio/s-32771' 
  },
];

export const RadioLog: React.FC = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary" />
            Historical Radio Log
          </div>
          <Badge variant="outline" className="text-[8px] font-mono border-primary/20 text-primary uppercase">Click to Listen</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {LOGS.map((log, i) => (
            <a 
              key={i} 
              href={log.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group relative overflow-hidden block"
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-3 h-3 text-primary fill-primary/20" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-primary group-hover:text-primary/80">{log.freq}</span>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{log.station}</span>
                </div>
              </div>
              <div className="text-right relative z-10">
                <div className="text-[10px] font-mono text-muted-foreground uppercase flex items-center justify-end gap-1">
                  {log.time}
                  <ExternalLink className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/60">{log.date}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:animate-shimmer" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
