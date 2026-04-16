import React, { useState, useEffect } from 'react';
import { Radio, RadioTower, Globe, Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { LiveClock } from './components/LiveClock';
import { WorldMap } from './components/WorldMap';
import { ContactSection } from './components/ContactSection';
import { VisitorStats } from './components/VisitorStats';
import { Comments } from './components/Comments';
import { RadioLog } from './components/RadioLog';
import { RadioWaves } from './components/RadioWaves';
import { Toaster } from '@/components/ui/sonner';
import { usePersistence } from './hooks/usePersistence';

export default function App() {
  const [visitorCountry, setVisitorCountry] = useState<string>('');
  const [totalVisitors, setTotalVisitors] = usePersistence('total_visitors', 1248);
  const [visitorCountries, setVisitorCountries] = usePersistence('visitor_countries', [
    { country: 'Pakistan', count: 450 },
    { country: 'United States', count: 120 },
    { country: 'United Kingdom', count: 85 },
    { country: 'Germany', count: 64 },
    { country: 'Japan', count: 42 },
  ]);

  useEffect(() => {
    // Increment visitor count on load (once per session ideally, but for demo every load)
    setTotalVisitors(prev => prev + 1);

    // Detect visitor country
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_name) {
          setVisitorCountry(data.country_name);
          
          // Update country stats
          setVisitorCountries(prev => {
            const existing = prev.find(c => c.country === data.country_name);
            if (existing) {
              return prev.map(c => c.country === data.country_name ? { ...c, count: c.count + 1 } : c);
            } else {
              return [...prev, { country: data.country_name, count: 1 }].sort((a, b) => b.count - a.count);
            }
          });
        }
      })
      .catch(err => console.error('Error detecting country:', err));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      <Toaster position="top-right" theme="dark" />
      
      <div className="max-w-[1400px] mx-auto p-5 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] grid-rows-[auto_1fr_auto] gap-4 min-h-screen">
        {/* Header */}
        <header className="lg:col-span-3 bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-wider uppercase text-foreground">Mr. Ejaz Kareem</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">SW Radio Enthusiast Since 1990</p>
          </div>
          <div className="flex items-center gap-3 text-primary text-sm font-medium">
            <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--primary)] animate-pulse" />
            <span className="tracking-widest uppercase">Signal Strength: Optimal</span>
          </div>
        </header>

        {/* Sidebar Left */}
        <aside className="flex flex-col gap-4">
          <LiveClock />
          <VisitorStats totalVisitors={totalVisitors} visitorCountries={visitorCountries} />
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Connect</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase mb-1">Email Address</div>
                <p className="text-sm font-mono break-all">ejazkareem52@gmail.com</p>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase mb-1">Phone Number</div>
                <p className="text-sm font-mono">+92 300 4102081</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6 overflow-hidden">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary rounded text-[10px] font-bold text-primary uppercase tracking-widest">
              DX Specialist
            </div>
            <h2 className="text-3xl font-light text-foreground leading-tight">Broadcasting Passion Across the Waves</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dedicated to the art of Shortwave (SW) listening since 1990. Monitoring international frequencies, maintaining communication logs, and celebrating the golden age of radio transmission from Pakistan to the world.
            </p>
          </div>
          
          <div className="flex-1 min-h-[400px]">
            <WorldMap highlightedCountry={visitorCountry} />
          </div>

          {/* Decorative Frequency Bar */}
          <div className="h-10 bg-background/50 border border-border rounded flex items-center overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  <span>9.420 MHz</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>11.780 MHz</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>15.120 MHz</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>21.500 MHz</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar Right */}
        <aside className="flex flex-col gap-4">
          <Comments />
          <RadioLog />
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Radio Equipment</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">HF Band:</span>
                <span className="text-primary font-bold">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">VHF Band:</span>
                <span className="text-primary font-bold">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">UHF Band:</span>
                <span className="text-muted-foreground">Standby</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Footer */}
        <footer className="lg:col-span-3 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Pakistan
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              Est. 1990
            </div>
          </div>
          <div className="text-zinc-700">
            © 2024 • Premium Radio Portfolio • Built for Mr. Ejaz Kareem
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
}
