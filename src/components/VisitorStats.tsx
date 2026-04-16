import React from 'react';
import { Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VisitorStatsProps {
  totalVisitors: number;
  visitorCountries: { country: string; count: number }[];
}

export const VisitorStats: React.FC<VisitorStatsProps> = ({ totalVisitors, visitorCountries }) => {
  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Global Visitors
        </CardTitle>
        <Users className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground mb-6 drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]">
          {totalVisitors.toLocaleString()}
        </div>
        
        <div className="space-y-4">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-3 h-3" />
            Recent Origins
          </div>
          <div className="flex flex-wrap gap-2">
            {visitorCountries.map((v, i) => (
              <Badge key={i} variant="outline" className="bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors">
                {v.country} <span className="ml-1 text-zinc-600">({v.count})</span>
              </Badge>
            ))}
            {visitorCountries.length === 0 && (
              <div className="text-xs text-zinc-600 italic">Waiting for signals...</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
